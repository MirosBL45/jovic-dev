// react/next stuff
import { NextResponse } from "next/server";

// stuff for data
import connectToDB from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request) => {
    //fetch
    try {
        await connectToDB();

        const posts = await Post.find();

        return new NextResponse(JSON.stringify(posts), { status: 200 });

    } catch (error) {
        return new NextResponse('Database Error', { status: 500 });
    }
}