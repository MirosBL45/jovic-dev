// react/next stuff
import { getServerSession } from "next-auth";

// components
import DashboardClient from "./DashboardClient";
import DevOwnerId from "@/components/UIComponents/DevOwnerId/DevOwnerId";
import PendingPosts from "@/components/PageComponents/dashboard/PendingPosts/PendingPosts";
import { authOptions } from "@/utils/authOptions";
import { canApprovePosts } from "@/utils/postPermissions";

export const metadata = {
  title: "Dashboard for your blogs",
  robots: { index: false, follow: false },
};

async function DashboardPage() {
  // only in development, so the production page never shows the ownerId
  const isDevelopment = process.env.NODE_ENV === "development";
  const session = isDevelopment ? await getServerSession(authOptions) : null;

  // the section with posts awaiting approval is rendered only for the admin
  const adminSession = isDevelopment ? session : await getServerSession(authOptions);
  const showPendingPosts = canApprovePosts(adminSession, process.env.ADMIN_ID);

  return (
    <>
      {showPendingPosts && <PendingPosts />}
      <DashboardClient />
      {isDevelopment && <DevOwnerId ownerId={session?.user?.ownerId} />}
    </>
  );
}

export default DashboardPage;
