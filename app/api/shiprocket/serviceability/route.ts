import { NextRequest, NextResponse } from 'next/server';
import { checkServiceability } from '@/lib/shiprocket';

/**
 * GET /api/shiprocket/serviceability?pincode=400001&weight=0.5
 * 
 * Checks if Shiprocket can deliver to a given pincode from Akotro's warehouse.
 * Used in checkout to validate delivery before payment.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const deliveryPincode = searchParams.get('pincode');
    const weight = parseFloat(searchParams.get('weight') || '0.5');

    if (!deliveryPincode) {
      return NextResponse.json({ success: false, error: 'pincode is required' }, { status: 400 });
    }

    // Akotro's pickup pincode — update this to your warehouse pincode
    const PICKUP_PINCODE = process.env.SHIPROCKET_PICKUP_PINCODE || '400001';

    const data = await checkServiceability(PICKUP_PINCODE, deliveryPincode, weight);

    const available = data?.data?.available_courier_companies?.length > 0;

    return NextResponse.json({
      success: true,
      available,
      couriers: data?.data?.available_courier_companies || [],
    });
  } catch (error: any) {
    console.error('Serviceability check error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
