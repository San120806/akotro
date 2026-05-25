import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, organization, productType, quantity, message } = body;

    if (!name || !email || !phone || !productType || !quantity) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
    }

    const entry = {
      name,
      email,
      phone,
      organization: organization || '',
      productType,
      quantity: String(quantity),
      message: message || '',
      submittedAt: new Date().toISOString(),
      status: 'New',
    };

    // 1. Save locally as a JSON log (always works, no external dependency)
    const logDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    const logFile = path.join(logDir, 'bulk-orders.json');
    const existing = fs.existsSync(logFile) ? JSON.parse(fs.readFileSync(logFile, 'utf-8')) : [];
    existing.push(entry);
    fs.writeFileSync(logFile, JSON.stringify(existing, null, 2));
    console.log(' Bulk order saved locally:', entry.name, entry.email);

    // 2. Also try to push to Wix CMS via REST API
    try {
      const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID!;

      // Get visitor token
      const tokenRes = await fetch('https://www.wixapis.com/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          grantType: 'anonymous',
        }),
      });
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      if (accessToken) {
        const cmsRes = await fetch('https://www.wixapis.com/wix-data/v2/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
          body: JSON.stringify({
            dataCollectionId: 'BulkOrders',
            dataItem: { data: entry },
          }),
        });
        const cmsData = await cmsRes.json();
        if (cmsRes.ok) {
          console.log(' Also saved to Wix CMS:', cmsData);
        } else {
          console.warn('⚠ Wix CMS save failed (non-critical):', JSON.stringify(cmsData));
        }
      }
    } catch (wixErr: any) {
      console.warn('⚠ Wix CMS push failed (non-critical, data saved locally):', wixErr.message);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(' Bulk order error:', error.message || error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to submit.' }, { status: 500 });
  }
}
