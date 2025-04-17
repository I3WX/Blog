// In your route.js (or similar auth route file)
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server'; // Assuming Next.js
import { ConnectDB } from '@/lib/config/db';


const LoadDB = async () => {
  try {
    await ConnectDB();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

LoadDB();

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Basic validation
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // Create the user
    const newUser = new UserModel({ username, password }); // WARNING: NEVER store plain text password
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
