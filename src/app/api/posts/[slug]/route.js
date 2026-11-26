// react/next stuff
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// stuff for data
import connectToDB from "@/utils/db";
import Post from "@/models/Post";
import { authOptions } from "@/utils/authOptions";
import { MESSAGES } from "@/utils/messages";
import { canDeletePost, getOwnerId } from "@/utils/postPermissions";

export const GET = async (request, { params }) => {
  const { slug } = await params;

  //fetch
  try {
    await connectToDB();

    const post = await Post.findOne({ slug }).select("-ownerId");

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("GET /api/posts/[slug] failed:", error);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = await params;

  const session = await getServerSession(authOptions);
  if (!getOwnerId(session)) {
    return NextResponse.json({ error: MESSAGES.SESSION_EXPIRED }, { status: 401 });
  }

  //fetch
  try {
    await connectToDB();

    const post = await Post.findOne({ slug }).select("ownerId").lean();
    if (!post) {
      return NextResponse.json({ error: MESSAGES.POST_NOT_FOUND }, { status: 404 });
    }
    if (!canDeletePost(session, post, process.env.ADMIN_ID)) {
      return NextResponse.json({ error: MESSAGES.DELETE_FORBIDDEN }, { status: 403 });
    }

    await Post.deleteOne({ _id: post._id });

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (error) {
    console.error("DELETE /api/posts/[slug] failed:", error);
    return NextResponse.json({ error: MESSAGES.POST_NOT_DELETED }, { status: 500 });
  }
};
