const { NextResponse } = require("next/server");
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/blogModel";
import { writeFile } from "fs/promises";

const LoadDB = async () => {
    await ConnectDB();
};

LoadDB();

export async function GET(request) {
    return NextResponse.json({ msg: "api is working" });
}

export async function POST(request) {
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
}