import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Question from '../../models/Question';

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB successfully');

    // Parse request data
    const data = await request.json();
    console.log('Received question data:', data);

    // Create new question
    const newQuestion = new Question(data);
    console.log('Created question model');

    // Save to database
    const savedQuestion = await newQuestion.save();
    console.log('Saved question successfully:', savedQuestion);

    return NextResponse.json({ 
      message: 'Question added successfully',
      question: savedQuestion 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/questions:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json({ 
        error: 'Validation Error', 
        details: Object.values(error.errors).map((err: any) => err.message)
      }, { status: 400 });
    }

    // Handle connection errors
    if (error.name === 'MongoServerSelectionError') {
      return NextResponse.json({ 
        error: 'Database Connection Error',
        message: 'Could not connect to database. Please try again later.'
      }, { status: 503 });
    }

    // Handle other errors
    return NextResponse.json({ 
      error: 'Internal Server Error',
      message: error.message || 'Something went wrong'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    console.log('Connected to MongoDB successfully');

    const questions = await Question.find({}).sort({ createdAt: -1 });
    console.log(`Found ${questions.length} questions`);

    return NextResponse.json(questions);
  } catch (error: any) {
    console.error('Error in GET /api/questions:', error);

    if (error.name === 'MongoServerSelectionError') {
      return NextResponse.json({ 
        error: 'Database Connection Error',
        message: 'Could not connect to database. Please try again later.'
      }, { status: 503 });
    }

    return NextResponse.json({ 
      error: 'Internal Server Error',
      message: error.message || 'Something went wrong'
    }, { status: 500 });
  }
}
