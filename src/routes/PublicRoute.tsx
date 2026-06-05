import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserRole } from "@/features/auth";

const FullScreenLoader = () => (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-400 font-medium">
        Carregando...
    </div>
);

export function PublicRoute() {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return <Navigate to={user.role === UserRole.ADMIN ? "/admin/dashboard" : "/meu-perfil"} replace />;
    }

    return (
        <Suspense fallback={<FullScreenLoader />}>
            <Outlet />
        </Suspense>
    );
}