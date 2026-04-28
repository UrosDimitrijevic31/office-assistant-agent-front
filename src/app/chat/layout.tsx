import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <DashboardHeader />
      {children}
    </div>
  );
}
