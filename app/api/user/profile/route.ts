import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string };
    const userId = new ObjectId(decoded.userId);

    const client = await clientPromise;
    const db = client.db('bodhitech');
    
    // Get user data
    const user = await db.collection('users').findOne(
      { _id: userId },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's questions using both userId and created_user
    const questions = await db.collection('questions')
      .find({
        $or: [
          { userId: userId.toString() },
          { created_user: userId.toString() }
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      user,
      questions
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
