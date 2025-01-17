import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Get a specific question
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('bodhitech');

    const question = await db.collection('questions').findOne({
      _id: new ObjectId(params.id)
    });

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error('Get question error:', error);
    return NextResponse.json(
      { error: 'Failed to get question' },
      { status: 500 }
    );
  }
}

// Update a question
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token and get userId
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const client = await clientPromise;
    const db = client.db('bodhitech');

    // Check if question exists and belongs to user
    const existingQuestion = await db.collection('questions').findOne({
      _id: new ObjectId(params.id),
      userId
    });

    if (!existingQuestion) {
      return NextResponse.json(
        { error: 'Question not found or unauthorized' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { title, difficulty, language, description } = body;

    // Update question
    const result = await db.collection('questions').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...(title && { title }),
          ...(difficulty && { difficulty }),
          ...(language && { language }),
          ...(description && { description }),
          updatedAt: new Date()
        }
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'No changes made to question' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Question updated successfully' });
  } catch (error) {
    console.error('Update question error:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// Delete a question
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token and get userId
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const client = await clientPromise;
    const db = client.db('bodhitech');

    // Check if question exists and belongs to user
    const existingQuestion = await db.collection('questions').findOne({
      _id: new ObjectId(params.id),
      userId
    });

    if (!existingQuestion) {
      return NextResponse.json(
        { error: 'Question not found or unauthorized' },
        { status: 404 }
      );
    }

    // Delete question
    const result = await db.collection('questions').deleteOne({
      _id: new ObjectId(params.id),
      userId
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Failed to delete question' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Delete question error:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
