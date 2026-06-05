import { useState } from "react";
import { PageHeader, Badge, Button, Card } from "@/components/ui";
import { profilesApi } from "@/features/profiles";
import { UserRole } from "@/features/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  emailVerified: boolean;
  createdAt: string;
}

export default function UsuariosPendentes() {
  const queryClient = useQueryClient();
  const [actionId, setActionId] = useState<string | null>(null);

  const { data: users = [] as PendingUser[], isLoading: loading, isError } = useQuery({
    queryKey: ['usuarios-pendentes'],
    queryFn: profilesApi.getPendingUsers,
  });

  const approveMutation = useMutation({
    mutationFn: profilesApi.approveUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usuarios-pendentes'] }),
  });

  const rejectMutation = useMutation({
    mutationFn: profilesApi.rejectUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usuarios-pendentes'] }),
  });

  const error = isError ? "Não foi possível carregar os usuários pendentes." : 
                (approveMutation.isError ? "Erro ao aprovar usuário." : 
                (rejectMutation.isError ? "Erro ao rejeitar usuário." : ""));

  function handleApprove(id: string) {
    setActionId(id);
    approveMutation.mutate(id, { onSettled: () => setActionId(null) });
  }

  function handleReject(id: string) {
    setActionId(id);
    rejectMutation.mutate(id, { onSettled: () => setActionId(null) });
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Usuários pendentes" subtitle="Aprovação de novas contas aguardando liberação." />

      {error && (
        <p className="rounded-lg px-3 py-2 text-xs bg-red-50 text-red-600 border border-red-100">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-slate-400">Carregando...</p>
      ) : users.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-slate-400 text-sm">Nenhum usuário pendente no momento.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {users.map((u: any) => (
            <div key={u.id} className="bg-white border border-slate-200 rounded-xl shadow-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-slate-900 truncate">{u.name}</span>
                  <Badge variant={u.role === UserRole.ADMIN ? "warning" : "success"}>
                    {u.role === UserRole.ADMIN ? "Admin" : "Recurso"}
                  </Badge>
                  {!u.emailVerified && (
                    <Badge variant="alert">E-mail não verificado</Badge>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{u.email}</p>
                <p className="text-xs text-slate-300 mt-0.5">
                  Cadastrado em {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="flex gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleApprove(u.id)}
                  disabled={actionId === u.id}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  Aprovar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleReject(u.id)}
                  disabled={actionId === u.id}
                >
                  Rejeitar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
