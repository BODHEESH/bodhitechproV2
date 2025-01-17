import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string };
    const userId = new ObjectId(decoded.userId);

    const {
      name,
      email,
      phoneNumber,
      currentPassword,
      newPassword,
      bio,
      preferences,
      avatar
    } = await request.json();

    const client = await clientPromise;
    const db = client.db('bodhitech');
    const usersCollection = db.collection('users');

    // Get current user
    const user = await usersCollection.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required' },
          { status: 400 }
        );
      }

      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    // Update user data
    const updateData: any = {
      updatedAt: new Date()
    };

    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (bio) updateData.bio = bio;
    if (preferences) updateData.preferences = preferences;
    if (avatar) updateData.avatar = avatar;
    if (newPassword) updateData.password = user.password;

    await usersCollection.updateOne(
      { _id: userId },
      { $set: updateData }
    );

    return NextResponse.json({
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
