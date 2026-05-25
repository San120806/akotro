import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const logFile = path.join(process.cwd(), 'data', 'bulk-orders.json');
    if (!fs.existsSync(logFile)) {
      return NextResponse.json({ orders: [], total: 0 });
    }
    const orders = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
    // Return newest first
    return NextResponse.json({ orders: orders.reverse(), total: orders.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
