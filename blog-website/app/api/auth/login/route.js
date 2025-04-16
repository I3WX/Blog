// In your route.js (or similar auth route file)
import { UserModel } from '../lib/models/userModel';
import { NextResponse } from 'next/server'; // Assuming Next.js

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        // Basic validation
        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        if (user.password !== password) {  // WARNING: NEVER store plain text password, use a secure hash
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Successful login - Issue a token, set a session, etc.
        // This is where you'd implement your authentication strategy
        // For a simple example (not recommended for production),
        //  you could set a session cookie.  However, use JWT or similar for better security
        //  example - but see example below
        // req.session.userId = user._id; // If you're using sessions.
        return NextResponse.json({ message: 'Login successful' }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}