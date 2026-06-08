import { Outlet } from "react-router-dom";
import { RoleShell } from "@/components/dashboard/RoleShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const Dashboard = () => (
  <ProtectedRoute allow="client">
    <RoleShell role="client">
      <Outlet />
    </RoleShell>
  </ProtectedRoute>
);

export default Dashboard;
