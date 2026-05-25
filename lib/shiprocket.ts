/**
 * Shiprocket API Service
 * Handles authentication and shipment creation via Shiprocket REST API
 */

const SHIPROCKET_BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get a valid Shiprocket auth token (cached for 9 days, Shiprocket tokens last 10 days)
 */
export async function getShiprocketToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if still valid
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.token;
  }

  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password) {
    throw new Error('Shiprocket credentials not configured');
  }

  const response = await fetch(`${SHIPROCKET_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Shiprocket auth failed: ${error}`);
  }

  const data = await response.json();
  const token = data.token;

  // Cache for 9 days (token lasts 10 days)
  cachedToken = { token, expiresAt: now + 9 * 24 * 60 * 60 * 1000 };

  return token;
}

export interface ShiprocketOrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount?: number;
  tax?: string;
  hsn?: number;
}

export interface CreateShipmentPayload {
  orderId: string;          // Your internal order ID
  orderDate: string;        // ISO date string
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
  items: ShiprocketOrderItem[];
  subTotal: number;
  length?: number;          // cm
  breadth?: number;         // cm
  height?: number;          // cm
  weight?: number;          // kg
}

/**
 * Create a shipment order in Shiprocket
 */
export async function createShiprocketOrder(payload: CreateShipmentPayload) {
  const token = await getShiprocketToken();

  const orderDate = new Date(payload.orderDate).toISOString().split('T')[0];

  const body = {
    order_id: payload.orderId,
    order_date: orderDate,
    pickup_location: 'Primary',
    channel_id: process.env.SHIPROCKET_CHANNEL_ID || '',
    billing_customer_name: payload.customerName,
    billing_last_name: '',
    billing_address: payload.shippingAddress.street,
    billing_address_2: '',
    billing_city: payload.shippingAddress.city,
    billing_pincode: payload.shippingAddress.pincode,
    billing_state: payload.shippingAddress.state,
    billing_country: payload.shippingAddress.country || 'India',
    billing_email: payload.customerEmail,
    billing_phone: payload.customerPhone,
    shipping_is_billing: true,
    order_items: payload.items.map((item) => ({
      name: item.name,
      sku: item.sku,
      units: item.units,
      selling_price: item.selling_price,
      discount: item.discount || 0,
      tax: item.tax || '',
      hsn: item.hsn || 0,
    })),
    payment_method: 'Prepaid', // Razorpay = Prepaid
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: payload.subTotal,
    length: payload.length || 10,
    breadth: payload.breadth || 10,
    height: payload.height || 10,
    weight: payload.weight || 0.5,
  };

  const response = await fetch(`${SHIPROCKET_BASE_URL}/orders/create/adhoc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Shiprocket order creation failed: ${JSON.stringify(data)}`);
  }

  return data;
}

/**
 * Track a shipment by AWB code or Shiprocket order ID
 */
export async function trackShipment(shipmentId: string) {
  const token = await getShiprocketToken();

  const response = await fetch(
    `${SHIPROCKET_BASE_URL}/courier/track/shipment/${shipmentId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to track shipment');
  }

  return response.json();
}

/**
 * Get available courier serviceability for a pincode
 */
export async function checkServiceability(
  pickupPostcode: string,
  deliveryPostcode: string,
  weight: number = 0.5
) {
  const token = await getShiprocketToken();

  const params = new URLSearchParams({
    pickup_postcode: pickupPostcode,
    delivery_postcode: deliveryPostcode,
    weight: String(weight),
    cod: '0',
  });

  const response = await fetch(
    `${SHIPROCKET_BASE_URL}/courier/serviceability/?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to check serviceability');
  }

  return response.json();
}
