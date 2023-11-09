// react/next stuff
import { NextResponse } from "next/server";

// stuff for data
import connectToDB from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
    const { slug } = params;

    //fetch
    try {
        await connectToDB();

        const post = await Post.findOne({ slug });

        return new NextResponse(JSON.stringify(post), { status: 200 });

    } catch (error) {
        return new NextResponse('Database Error', { status: 500 });
    }
}