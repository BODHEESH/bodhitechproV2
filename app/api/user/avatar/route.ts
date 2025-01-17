import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string };
    const userId = new ObjectId(decoded.userId);

    const formData = await request.formData();
    const avatar = formData.get('avatar') as string;

    if (!avatar) {
      return NextResponse.json({ error: 'No avatar provided' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('bodhitech');
    
    // Update user's avatar
    await db.collection('users').updateOne(
      { _id: userId },
      { $set: { avatar } }
    );

    return NextResponse.json({ message: 'Avatar updated successfully' });
  } catch (error) {
    console.error('Avatar update error:', error);
    return NextResponse.json(
      { error: 'Failed to update avatar' },
      { status: 500 }
    );
  }
}
