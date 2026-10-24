import AdminSidebar from "@/components/admin/AdminSidebar";
import { getSession } from "@/lib/auth/session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-svh bg-neutral-50 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <AdminSidebar email={session.email} />
      <div className="min-w-0 px-5 py-8 sm:px-8 sm:py-10">{children}</div>
    </div>
  );
}
