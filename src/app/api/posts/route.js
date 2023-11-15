// react/next stuff
import { NextResponse } from "next/server";

// stuff for data
import connectToDB from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request) => {
    // to get posts from user which is logged in
    const url = new URL(request.url);
    const username = url.searchParams.get('username');

    //fetch
    try {
        await connectToDB();

        const posts = await Post.find(username && { username });

        return new NextResponse(JSON.stringify(posts), { status: 200 });

    } catch (error) {
        return new NextResponse('Database Error', { status: 500 });
    }
}