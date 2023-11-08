// react/next stuff
import { NextResponse } from "next/server";

// stuff for data
import connectToDB from "@/utils/db";
import Postdb from "@/models/Postdb";

export const GET = async () => {
    //fetch
    try {
        await connectToDB();

        const postsdb = await Postdb.find();

        return new NextResponse(postsdb, { status: 200 });

    } catch (error) {
        return new NextResponse('Database Error', { status: 500 });
    }
}