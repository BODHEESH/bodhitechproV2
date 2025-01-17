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

    // Fetch questions with user information
    const questions = await collection.aggregate([
      { $match: query },
      {
        $addFields: {
          hasUserId: { 
            $cond: {
              if: '$created_user',
              then: true,
              else: { $ne: ['$userId', null] }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          let: { 
            userId: { 
              $cond: {
                if: '$created_user',
                then: { $toObjectId: '$created_user' },
                else: { 
                  $cond: {
                    if: '$hasUserId',
                    then: { $toObjectId: '$userId' },
                    else: null
                  }
                }
              }
            }
          },
          pipeline: [
            {
              $match: {
                $expr: { 
                  $cond: {
                    if: '$$userId',
                    then: { $eq: ['$_id', '$$userId'] },
                    else: false
                  }
                }
              }
            },
            {
              $project: {
                name: 1,
                email: 1
              }
            }
          ],
          as: 'userLookup'
        }
      },
      {
        $addFields: {
          userInfo: {
            $cond: {
              if: { $gt: [{ $size: '$userLookup' }, 0] },
              then: { $arrayElemAt: ['$userLookup', 0] },
              else: '$userInfo'
            }
          }
        }
      },
      {
        $project: {
          userLookup: 0,
          hasUserId: 0
        }
      }
    ]).toArray();

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
