import { ConnectDb } from "@/lib/config/db";
import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

// Ensure database connection on module load
ConnectDb();

// Handler for POST requests (Signup)
export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Basic validation
        if (!username || !password) {
            return NextResponse.json({ success: false, message: 'Username and password are required' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'Username already taken' }, { status: 409 }); // 409 Conflict
        }

        // Create and save the new user (no encryption as requested)
        const newUser = new UserModel({
            username,
            password, // Storing password directly (not recommended for production)
        });
        await newUser.save();

        return NextResponse.json({ success: true, message: 'User created successfully' }, { status: 201 }); // 201 Created

    } catch (error) {
        console.error("Error during signup:", error);
        return NextResponse.json({ success: false, message: 'An error occurred during signup' }, { status: 500 });
    }
}


// Login API
export async function GET(request) {
    const { username, password } = request.nextUrl.searchParams;
  
    try {
      const user = await UserModel.findOne({ username, password });
      if (user) {
        return NextResponse.json({ success: true, msg: "Login successful" });
      } else {
        return NextResponse.json({ success: false, msg: "Invalid credentials" });
      }
    } catch (error) {
      return NextResponse.json({ success: false, msg: "Error during login" });
    }
  }