import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <DashboardHeader />
      {children}
    </div>
  );
}
