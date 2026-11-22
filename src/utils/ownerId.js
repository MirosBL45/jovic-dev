// The owner of a post is the login account (provider + account id), never the name or the email.
export function deriveOwnerId(account, user) {
  if (account?.provider === "google" && account.providerAccountId) {
    return `google:${account.providerAccountId}`;
  }
  if (account?.provider === "credentials" && user?.id) {
    return `credentials:${user.id}`;
  }
  return null;
}

// An empty or missing ADMIN_ID never makes anyone an admin.
export function isAdmin(ownerId, adminId) {
  return Boolean(ownerId) && Boolean(adminId) && ownerId === adminId;
}
