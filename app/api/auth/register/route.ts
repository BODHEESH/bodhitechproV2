import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name, phoneNumber } = await request.json();

    const client = await clientPromise;
    const db = client.db('bodhitech');
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [
        { email: email.toLowerCase() },
        ...(phoneNumber ? [{ phoneNumber }] : [])
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email or phone number' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await usersCollection.insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({
      message: 'User registered successfully',
      userId: user.insertedId
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
