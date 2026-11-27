import { isAdmin } from "./ownerId";

// Owner id from the session, or null for a missing session or an old session without ownerId.
export function getOwnerId(session) {
  const ownerId = session?.user?.ownerId;
  return typeof ownerId === "string" && ownerId !== "" ? ownerId : null;
}

export function canCreatePost(session) {
  return getOwnerId(session) !== null;
}

export function canListOwnPosts(session) {
  return getOwnerId(session) !== null;
}

// The owner of the post or the admin may delete it.
export function canDeletePost(session, post, adminId) {
  const ownerId = getOwnerId(session);
  if (!ownerId || !post) {
    return false;
  }
  return post.ownerId === ownerId || isAdmin(ownerId, adminId);
}

// Only the admin may see the posts awaiting approval and approve them.
export function canApprovePosts(session, adminId) {
  return isAdmin(getOwnerId(session), adminId);
}

// The admin's posts are published at once, everyone else's wait for approval.
export function isApprovedOnCreate(session, adminId) {
  return canApprovePosts(session, adminId);
}
