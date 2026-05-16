import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { encrypt, decrypt } from '@/lib/crypto';
import { RowDataPacket } from 'mysql2';



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
      'SELECT time_slot, console_id, station_id FROM reservations WHERE booking_date = ?',
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
      station_id: string;
      players: number;
    };
    try {
      body = decrypt(envelope.d);
    } catch {
      return encryptedJson({ error: 'Invalid or tampered request payload' }, 400);
    }

    const { customer_name, phone_number, booking_date, time_slots, console_id, station_id, players } = body;

    // ── Validate name ──
    const nameTrimmed = customer_name?.trim() ?? "";
    if (!nameTrimmed || nameTrimmed.length < 2) {
      return encryptedJson({ error: 'Please enter a valid name (min 2 characters).' }, 400);
    }
    if (!/^[a-zA-Z\s.]{2,50}$/.test(nameTrimmed)) {
      return encryptedJson({ error: 'Name should contain only letters and spaces.' }, 400);
    }

    // ── Validate Indian phone number ──
    const phoneTrimmed = phone_number?.trim().replace(/\s/g, '') ?? "";
    if (!/^[6-9]\d{9}$/.test(phoneTrimmed)) {
      return encryptedJson({ error: 'Enter a valid 10-digit Indian mobile number (starts with 6-9).' }, 400);
    }

    // ── Validate other required fields ──
    if (
      !booking_date ||
      !time_slots || !Array.isArray(time_slots) ||
      time_slots.length === 0 || !console_id || !station_id
    ) {
      return encryptedJson({ error: 'All fields are required' }, 400);
    }

    // Check if any of the selected slots are already taken for THIS specific station
    const [existingRows] = await pool.query<RowDataPacket[]>(
      `SELECT time_slot, COUNT(*) as cnt
       FROM reservations
       WHERE booking_date = ? AND console_id = ? AND station_id = ? AND time_slot IN (?)
       GROUP BY time_slot`,
      [booking_date, console_id, station_id, time_slots]
    );

    const fullyBooked = existingRows.map((r) => r.time_slot);

    if (fullyBooked.length > 0) {
      return encryptedJson(
        { error: `Slots already booked: ${fullyBooked.join(', ')}` },
        409
      );
    }

    // Insert all slots — each slot row stores players count too
    const values = time_slots.map((slot: string) => [
      customer_name, phone_number, booking_date, slot, console_id, station_id, players ?? 1
    ]);

    await pool.query(
      'INSERT INTO reservations (customer_name, phone_number, booking_date, time_slot, console_id, station_id, players) VALUES ?',
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
