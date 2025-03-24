const { NextResponse } = require("next/server");
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/blogModel";
import { writeFile } from "fs/promises";

const LoadDB = async () => {
  try {
    await ConnectDB();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

LoadDB();

// API Endpoint to get all blogs
export async function GET(request) {
  try {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Error fetching blogs' }, { status: 500 });
  }
}

// API Endpoint for uploading a blog
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}.png`;
    await writeFile(path, buffer);
    const imageURL = `/${timestamp}_${image.name}.png`;

    const blogData = {
      title: `${formData.get("title")}`,
      description: `${formData.get("description")}`,
      category: `${formData.get("category")}`,
      author: `${formData.get("author")}`,
      image: `${imageURL}`,
      authorImg: `${formData.get("authorImg")}`,
    };

    await BlogModel.create(blogData);
    return NextResponse.json({ success: true, msg: "blog added" });
  } catch (error) {
    console.error('Error adding blog:', error);
    return NextResponse.json({ error: 'Error adding blog' }, { status: 500 });
  }
}
