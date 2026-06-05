import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vagasApi, VagaCard, VagaModal, type Vaga, type StatusVaga as Status } from "@/features/vagas";
import { PageHeader, Button } from "@/components/ui";

const STATUS_FILTERS: Array<Status | "Todas"> = ["Todas", "Aberta", "Em andamento", "Fechada", "Cancelada"];
const EMPTY: Omit<Vaga, "id"> = { titulo: "", senioridade: "MID_LEVEL", time: "", solicitante: "", tempoContratacao: "", area: "", skills: [], descricao: "", status: "Aberta", prioridade: "Média", dataAbertura: new Date().toISOString().slice(0, 10) };

export default function Vagas() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<(Omit<Vaga, "id"> & { id?: string }) | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | "Todas">("Todas");
  const [search, setSearch] = useState("");

  const { data: vagas = [], isLoading: loading, isError: isFetchError } = useQuery({
    queryKey: ['vagas'],
    queryFn: async () => {
      const data = await vagasApi.getVagas();
      return Array.isArray(data) ? data : [];
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: Omit<Vaga, "id"> & { id?: string }) => data.id ? vagasApi.updateVaga(data.id, data) : vagasApi.createVaga(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['vagas'] }); closeModal(); }
  });

  const deleteMutation = useMutation({
    mutationFn: vagasApi.deleteVaga,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vagas'] })
  });

  const filtered = vagas.filter((v: Vaga) => {
    const q = search.toLowerCase();
    return (statusFilter === "Todas" || v.status === statusFilter) &&
      (!q || v.titulo.toLowerCase().includes(q) || v.time.toLowerCase().includes(q) || v.area.toLowerCase().includes(q) || v.skills.some((s: string) => s.toLowerCase().includes(q)));
  });

  function openNew() { setEditing(EMPTY); setModalOpen(true); }
  function openEdit(v: Vaga) { setEditing(v); setModalOpen(true); }
  function closeModal() { setModalOpen(false); setEditing(null); }

  const handleDelete = useCallback((id: string) => { if (confirm("Remover esta vaga?")) deleteMutation.mutate(id); }, [deleteMutation]);

  const errorMessage = isFetchError ? "Não foi possível carregar as vagas." : saveMutation.isError ? "Erro ao salvar a vaga." : deleteMutation.isError ? "Erro ao remover a vaga." : "";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Vagas" subtitle="Gestão de vagas abertas e em andamento" actions={<Button variant="primary" size="sm" onClick={openNew}>+ Nova vaga</Button>} />
      {errorMessage && <p className="rounded-lg px-3 py-2 text-xs bg-red-50 text-red-600 border border-red-100">{errorMessage}</p>}

      <div className="bg-white border border-slate-200 rounded-xl shadow-card px-5 py-4 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1">
          {STATUS_FILTERS.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 rounded-full text-xs font-semibold ${statusFilter === s ? "bg-pink text-white" : "bg-slate-100 text-slate-600"}`}>{s}</button>
          ))}
        </div>
        <div className="flex-1"><input placeholder="Buscar por título, time..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full text-sm border border-slate-300 rounded-md px-3 py-1.5 outline-none" /></div>
      </div>

      {loading ? <p className="text-sm text-slate-400">Carregando...</p> : filtered.length === 0 ? (
        <div className="bg-white border rounded-xl py-16 text-center"><p className="text-slate-400 text-sm">Nenhuma vaga encontrada.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v: Vaga) => <VagaCard key={v.id} vaga={v} onEdit={openEdit} onDelete={handleDelete} />)}
        </div>
      )}

      {modalOpen && editing && <VagaModal initial={editing} saving={saveMutation.isPending} onSave={(data) => saveMutation.mutate(data)} onClose={closeModal} />}
    </div>
  );
}