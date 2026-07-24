// Dashboard layout — wraps all role-based dashboard pages.
// Sidebar is rendered by each dashboard sub-layout for role-specific nav.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f0f4e8] flex">
      {children}
    </div>
  );
}
