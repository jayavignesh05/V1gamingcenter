import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT time_slot, console_id FROM reservations WHERE booking_date = ?',
      [date]
    );

    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_name, phone_number, booking_date, time_slots, console_id } = body;

    if (!customer_name || !phone_number || !booking_date || !time_slots || !Array.isArray(time_slots) || time_slots.length === 0 || !console_id) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if any of the slots are already booked
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT time_slot FROM reservations WHERE booking_date = ? AND console_id = ? AND time_slot IN (?)',
      [booking_date, console_id, time_slots]
    );

    if (existing.length > 0) {
      const booked = existing.map(r => r.time_slot).join(', ');
      return NextResponse.json({ error: `Slots already booked: ${booked}` }, { status: 409 });
    }

    // Insert all slots
    const values = time_slots.map(slot => [customer_name, phone_number, booking_date, slot, console_id]);
    
    await pool.query(
      'INSERT INTO reservations (customer_name, phone_number, booking_date, time_slot, console_id) VALUES ?',
      [values]
    );

    return NextResponse.json({ success: true, message: 'Reservations successful' }, { status: 201 });
  } catch (error: any) {
    console.error('Database insertion error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'One or more slots are already booked' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create reservations' }, { status: 500 });
  }
}
