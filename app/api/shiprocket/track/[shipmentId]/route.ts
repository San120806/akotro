import { NextRequest, NextResponse } from 'next/server';
import { trackShipment } from '@/lib/shiprocket';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shipmentId: string }> }
) {
  try {
    const { shipmentId } = await params;

    if (!shipmentId) {
      return NextResponse.json({ success: false, error: 'Shipment ID required' }, { status: 400 });
    }

    const trackingData = await trackShipment(shipmentId);

    return NextResponse.json({ success: true, data: trackingData });
  } catch (error: any) {
    console.error('Shiprocket tracking error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
