// Which posts each list shows. A post is public only when approved is exactly true.

export const PUBLIC_POSTS_FILTER = { approved: true };

// Everything that is not public is awaiting approval, so no post can get lost between the two lists.
export const PENDING_POSTS_FILTER = { approved: { $ne: true } };

export function ownPostsFilter(ownerId) {
  return { ownerId };
}

export function publicPostFilter(slug) {
  return { slug, approved: true };
}

// ?pending=1 wins over ?mine=1; without either it is the public list.
export function readListKind(searchParams) {
  if (searchParams.get("pending") === "1") {
    return "pending";
  }
  if (searchParams.get("mine") === "1") {
    return "mine";
  }
  return "public";
}

// The only accepted PATCH body is { approved: true }, nothing else may be changed this way.
export function isApprovalBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return false;
  }
  const keys = Object.keys(body);
  return keys.length === 1 && keys[0] === "approved" && body.approved === true;
}
