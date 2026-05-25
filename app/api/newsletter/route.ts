import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/newsletter
 * Body: { email: string }
 *
 * Saves the subscriber email to Wix CRM Contacts via REST API.
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    const apiKey = process.env.WIX_API_KEY;
    const siteId = process.env.WIX_SITE_ID;

    if (!apiKey || !siteId) {
      console.warn('[newsletter] ⚠  WIX_API_KEY / WIX_SITE_ID not set — skipping Wix save for:', email);
      return NextResponse.json({ success: true, saved: false });
    }

    const response = await fetch('https://www.wixapis.com/contacts/v4/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        'wix-site-id': siteId,
      },
      body: JSON.stringify({
        info: {
          emails: {
            items: [{ tag: 'MAIN', email }],
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // 409 = contact already exists — treat as success
      if (response.status === 409) {
        console.log('[newsletter] Contact already exists in Wix (OK):', email);
        return NextResponse.json({ success: true, saved: true });
      }

      const code = data?.details?.applicationError?.code || response.status;
      const msg = data?.details?.applicationError?.description || data?.message || 'Unknown error';
      console.error(`[newsletter]  Wix error — ${response.status} | code: ${code} | message: ${msg}`);
      return NextResponse.json({ success: true, saved: false });
    }

    // Wix returns "id" (not "_id") on the contact object
    const contactId = data?.contact?.id;
    console.log('[newsletter]  Saved to Wix:', email, '| Contact ID:', contactId);
    return NextResponse.json({ success: true, saved: true, contactId });

  } catch (error: any) {
    console.error('[newsletter]  Unexpected error:', error?.message || error);
    return NextResponse.json({ success: true, saved: false });
  }
}
