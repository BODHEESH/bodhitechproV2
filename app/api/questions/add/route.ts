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

    // Verify token and get userId
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const body = await request.json();
    const { title, difficulty, language, description, answer, tags, subQuestions } = body;

    if (!title || !difficulty || !language || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('bodhitech');

    // Get user info
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(userId) },
      { projection: { name: 1, email: 1 } }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Add question with userId and user info
    const result = await db.collection('questions').insertOne({
      title,
      difficulty,
      language,
      description,
      answer,
      tags,
      subQuestions,
      userId,
      created_user: userId,
      userInfo: {
        name: user.name,
        email: user.email
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({
      message: 'Question added successfully',
      questionId: result.insertedId
    });
  } catch (error) {
    console.error('Add question error:', error);
    return NextResponse.json(
      { error: 'Failed to add question' },
      { status: 500 }
    );
  }
}
