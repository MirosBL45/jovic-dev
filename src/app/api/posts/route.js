// react/next stuff
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// stuff for data
import connectToDB from "@/utils/db";
import Post from "@/models/Post";
import { authOptions } from "@/utils/authOptions";
import { MESSAGES } from "@/utils/messages";
import {
  canApprovePosts,
  canCreatePost,
  canListOwnPosts,
  getOwnerId,
  isApprovedOnCreate,
} from "@/utils/postPermissions";
import {
  PENDING_POSTS_FILTER,
  PUBLIC_POSTS_FILTER,
  ownPostsFilter,
  readListKind,
} from "@/utils/postApproval";
import { pickPostFields, validatePost } from "@/utils/postValidation";
import { escapeRegex, makeUniqueSlug, normalizeSlug } from "@/utils/slug";

const SLUG_ATTEMPTS = 3;

export const GET = async (request) => {
  // to get posts from user which is logged in
  const url = new URL(request.url);
  const listKind = readListKind(url.searchParams);
  let filter = PUBLIC_POSTS_FILTER;

  if (listKind !== "public") {
    const session = await getServerSession(authOptions);
    if (!canListOwnPosts(session)) {
      return NextResponse.json({ error: MESSAGES.SESSION_EXPIRED }, { status: 401 });
    }
    if (listKind === "pending" && !canApprovePosts(session, process.env.ADMIN_ID)) {
      return NextResponse.json({ error: MESSAGES.ADMIN_ONLY }, { status: 403 });
    }
    filter = listKind === "pending" ? PENDING_POSTS_FILTER : ownPostsFilter(getOwnerId(session));
  }

  //fetch
  try {
    await connectToDB();

    // ownerId is never sent to the browser
    const posts = await Post.find(filter).select("-ownerId");

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("GET /api/posts failed:", error);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};

// The unique index on slug decides in the end: if another post took the slug in the meantime, try again.
async function createPostWithFreeSlug(data) {
  const baseSlug = normalizeSlug(data.slug);

  for (let attempt = 0; attempt < SLUG_ATTEMPTS; attempt++) {
    const similar = await Post.find({ slug: { $regex: `^${escapeRegex(baseSlug)}` } })
      .select("slug")
      .lean();
    const slug = makeUniqueSlug(
      baseSlug,
      similar.map((post) => post.slug)
    );

    try {
      return await Post.create({ ...data, slug });
    } catch (error) {
      if (error?.code !== 11000) {
        throw error;
      }
    }
  }

  throw new Error("No free slug found");
}

export const POST = async (request) => {
  const session = await getServerSession(authOptions);
  if (!canCreatePost(session)) {
    return NextResponse.json({ error: MESSAGES.SESSION_EXPIRED }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: MESSAGES.POST_NOT_SAVED }, { status: 400 });
  }

  const fields = pickPostFields(body);
  const validationError = validatePost(fields);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  //fetch
  try {
    await connectToDB();

    const post = await createPostWithFreeSlug({
      ...fields,
      username: session.user.name,
      ownerId: getOwnerId(session),
      approved: isApprovedOnCreate(session, process.env.ADMIN_ID),
    });

    return NextResponse.json({ slug: post.slug, approved: post.approved }, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts failed:", error);
    return NextResponse.json({ error: MESSAGES.POST_NOT_SAVED }, { status: 500 });
  }
};
