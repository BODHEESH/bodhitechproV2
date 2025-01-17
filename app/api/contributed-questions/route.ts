import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const language = searchParams.get('language');
    const search = searchParams.get('search');
    const topic = searchParams.get('topic');

    const client = await clientPromise;
    const db = client.db('bodhitech');
    const collection = db.collection('questions');

    // Build the query
    const query: any = {};
    if (difficulty && difficulty !== 'all') query.difficulty = difficulty;
    if (language && language !== 'all') query.language = language;
    if (topic && topic !== 'all') query.topic = topic;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const questions = await collection.find(query).toArray();

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
