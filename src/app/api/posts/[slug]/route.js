// react/next stuff
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// stuff for data
import connectToDB from "@/utils/db";
import Post from "@/models/Post";
import { authOptions } from "@/utils/authOptions";
import { MESSAGES } from "@/utils/messages";
import { canApprovePosts, canDeletePost, getOwnerId } from "@/utils/postPermissions";
import { isApprovalBody, publicPostFilter } from "@/utils/postApproval";

export const GET = async (request, { params }) => {
  const { slug } = await params;

  //fetch
  try {
    await connectToDB();

    // a post that is not approved does not exist for the public blog
    const post = await Post.findOne(publicPostFilter(slug)).select("-ownerId");
    if (!post) {
      return NextResponse.json({ error: MESSAGES.POST_NOT_FOUND }, { status: 404 });
    }

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("GET /api/posts/[slug] failed:", error);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};

// Only the admin approves, and approving is the only change this handler accepts.
export const PATCH = async (request, { params }) => {
  const { slug } = await params;

  const session = await getServerSession(authOptions);
  if (!getOwnerId(session)) {
    return NextResponse.json({ error: MESSAGES.SESSION_EXPIRED }, { status: 401 });
  }
  if (!canApprovePosts(session, process.env.ADMIN_ID)) {
    return NextResponse.json({ error: MESSAGES.ADMIN_ONLY }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  if (!isApprovalBody(body)) {
    return NextResponse.json({ error: MESSAGES.APPROVE_INVALID }, { status: 400 });
  }

  try {
    await connectToDB();

    const post = await Post.findOneAndUpdate({ slug }, { $set: { approved: true } })
      .select("_id")
      .lean();
    if (!post) {
      return NextResponse.json({ error: MESSAGES.POST_NOT_FOUND }, { status: 404 });
    }

    return NextResponse.json({ slug, approved: true }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/posts/[slug] failed:", error);
    return NextResponse.json({ error: MESSAGES.POST_NOT_APPROVED }, { status: 500 });
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
