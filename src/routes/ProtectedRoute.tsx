import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserRole } from "@/features/auth";

export function ProtectedRoute({ role }: { role?: UserRole }) {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;

    // Se a rota exige um perfil específico e o usuário é de outro perfil
    if (role && user.role !== role) {
        // Expulsa pro lugar correto dependendo de quem ele é
        return <Navigate to={user.role === UserRole.ADMIN ? "/admin/dashboard" : "/meu-perfil"} replace />;
    }

    return <Outlet />;
}