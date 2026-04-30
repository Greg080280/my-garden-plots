import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth, type Role } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
  allow: Role | Role[];
}

/**
 * Gate a route by role.
 * - Not logged in → redirect to /login (with `from` for return-after-login).
 * - Logged in with wrong role → redirect to / + toast.
 */
export const ProtectedRoute = ({ children, allow }: Props) => {
  const { user } = useAuth();
  const location = useLocation();
  const allowed = Array.isArray(allow) ? allow : [allow];
  const wrongRole = !!user && !allowed.includes(user.role);

  useEffect(() => {
    if (wrongRole) toast.error("Nu ai acces la această zonă a grădinii.");
  }, [wrongRole]);

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (wrongRole) return <Navigate to="/" replace />;
  return <>{children}</>;
};
