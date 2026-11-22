// react/next stuff
import { getServerSession } from "next-auth";

// components
import DashboardClient from "./DashboardClient";
import DevOwnerId from "@/components/UIComponents/DevOwnerId/DevOwnerId";
import { authOptions } from "@/utils/authOptions";

export const metadata = {
  title: "Dashboard for your blogs",
  robots: { index: false, follow: false },
};

async function DashboardPage() {
  // only in development, so the production page stays static and never shows the ownerId
  const isDevelopment = process.env.NODE_ENV === "development";
  const session = isDevelopment ? await getServerSession(authOptions) : null;

  return (
    <>
      <DashboardClient />
      {isDevelopment && <DevOwnerId ownerId={session?.user?.ownerId} />}
    </>
  );
}

export default DashboardPage;
