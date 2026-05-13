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
    const { customer_name, phone_number, booking_date, time_slot, console_id } = body;

    if (!customer_name || !phone_number || !booking_date || !time_slot || !console_id) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if slot is already booked (just to be safe, though UNIQUE constraint will also catch it)
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM reservations WHERE booking_date = ? AND time_slot = ? AND console_id = ?',
      [booking_date, time_slot, console_id]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: 'Slot is already booked' }, { status: 409 });
    }

    const [result] = await pool.query(
      'INSERT INTO reservations (customer_name, phone_number, booking_date, time_slot, console_id) VALUES (?, ?, ?, ?, ?)',
      [customer_name, phone_number, booking_date, time_slot, console_id]
    );

    return NextResponse.json({ success: true, message: 'Reservation successful' }, { status: 201 });
  } catch (error: any) {
    console.error('Database insertion error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Slot is already booked' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}
