import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { encrypt, decrypt } from '@/lib/crypto';
import { RowDataPacket } from 'mysql2';

/** Wrap any response payload in an encrypted envelope */
function encryptedJson(data: unknown, status = 200) {
  return NextResponse.json({ d: encrypt(data) }, { status });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return encryptedJson({ error: 'Date is required' }, 400);
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT time_slot, console_id FROM reservations WHERE booking_date = ?',
      [date]
    );

    return encryptedJson(rows);
  } catch (error: unknown) {
    console.error('Database error:', error);
    return encryptedJson({ error: 'Failed to fetch reservations' }, 500);
  }
}

export async function POST(request: Request) {
  try {
    const envelope = await request.json();

    // Decrypt the incoming payload
    let body: {
      customer_name: string;
      phone_number: string;
      booking_date: string;
      time_slots: string[];
      console_id: string;
      players: number;
    };
    try {
      body = decrypt(envelope.d);
    } catch {
      return encryptedJson({ error: 'Invalid or tampered request payload' }, 400);
    }

    const { customer_name, phone_number, booking_date, time_slots, console_id } = body;

    if (
      !customer_name || !phone_number || !booking_date ||
      !time_slots || !Array.isArray(time_slots) ||
      time_slots.length === 0 || !console_id
    ) {
      return encryptedJson({ error: 'All fields are required' }, 400);
    }

    // Check if any of the slots are already booked
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT time_slot FROM reservations WHERE booking_date = ? AND console_id = ? AND time_slot IN (?)',
      [booking_date, console_id, time_slots]
    );

    if (existing.length > 0) {
      const booked = existing.map(r => r.time_slot).join(', ');
      return encryptedJson({ error: `Slots already booked: ${booked}` }, 409);
    }

    // Insert all slots
    const values = time_slots.map((slot: string) => [customer_name, phone_number, booking_date, slot, console_id]);

    await pool.query(
      'INSERT INTO reservations (customer_name, phone_number, booking_date, time_slot, console_id) VALUES ?',
      [values]
    );

    return encryptedJson({ success: true, message: 'Reservations successful' }, 201);
  } catch (error: unknown) {
    console.error('Database insertion error:', error);
    const err = error as { code?: string };
    if (err.code === 'ER_DUP_ENTRY') {
      return encryptedJson({ error: 'One or more slots are already booked' }, 409);
    }
    return encryptedJson({ error: 'Failed to create reservations' }, 500);
  }
}
