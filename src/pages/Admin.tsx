import { Outlet } from "react-router-dom";
import { RoleShell } from "@/components/dashboard/RoleShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const Admin = () => (
  <ProtectedRoute allow="admin">
    <RoleShell role="admin">
      <Outlet />
    </RoleShell>
  </ProtectedRoute>
);

export default Admin;
