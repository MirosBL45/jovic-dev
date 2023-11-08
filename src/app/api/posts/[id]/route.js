// react/next stuff
import { NextResponse } from "next/server";

// stuff for data
import connectToDB from "@/utils/db";
import Post from "@/models/Post";

export const GET = async ({ params }) => {
    console.log('this is: ', params);
    const { id } = params;

    //fetch
    try {
        await connectToDB();

        const post = await Post.findById(id);

        return new NextResponse(JSON.stringify(post), { status: 200 });

    } catch (error) {
        return new NextResponse('Database Error', { status: 500 });
    }
}