import { Badge, Tag } from "@/components/ui";
import { type Vaga, type Senioridade, type StatusVaga as Status, type Prioridade } from "../types";

const SENIORIDADE_BADGE: Record<Senioridade, "info" | "junior" | "pleno" | "senior" | "warning"> = { INTERN: "info", JUNIOR: "junior", MID_LEVEL: "pleno", SENIOR: "senior", SPECIALIST: "warning" };
const SENIORIDADE_LABEL: Record<Senioridade, string> = { INTERN: "Estagiário", JUNIOR: "Júnior", MID_LEVEL: "Pleno", SENIOR: "Sênior", SPECIALIST: "Especialista" };
const PRIORIDADE_COLOR: Record<Prioridade, string> = { Baixa: "bg-slate-100 text-slate-600", Média: "bg-status-info-bg text-status-info-text", Alta: "bg-status-warning-bg text-status-warning-text", Urgente: "bg-status-danger-bg text-status-danger-text" };
const STATUS_COLOR: Record<Status, string> = { "Aberta": "bg-status-success-bg text-status-success-text", "Em andamento": "bg-status-info-bg text-status-info-text", "Fechada": "bg-slate-100 text-slate-500", "Cancelada": "bg-red-50 text-red-500" };

export function VagaCard({ vaga, onEdit, onDelete }: { vaga: Vaga; onEdit: (v: Vaga) => void; onDelete: (id: string) => void; }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-card p-5 flex flex-col gap-4 transition-all hover:shadow-card-hover hover:-translate-y-px">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-base text-slate-900 truncate">{vaga.titulo}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{vaga.time} • {vaga.solicitante}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => onEdit(vaga)} className="text-xs text-slate-400 hover:text-slate-600 transition-colors p-1" title="Editar">✏️</button>
                    <button onClick={() => onDelete(vaga.id)} className="text-xs text-slate-300 hover:text-red-500 transition-colors p-1" title="Remover">🗑️</button>
                </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
                <Badge variant={SENIORIDADE_BADGE[vaga.senioridade]}>{SENIORIDADE_LABEL[vaga.senioridade]}</Badge>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_COLOR[vaga.status]}`}>{vaga.status}</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${PRIORIDADE_COLOR[vaga.prioridade]}`}>{vaga.prioridade}</span>
                {vaga.area && <Tag kind="area">{vaga.area}</Tag>}
            </div>
            {vaga.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {vaga.skills.slice(0, 5).map((s) => <Tag key={s} kind="skill">{s}</Tag>)}
                    {vaga.skills.length > 5 && <span className="text-xs text-slate-400 px-1">+{vaga.skills.length - 5}</span>}
                </div>
            )}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-400">
                <span>{vaga.tempoContratacao}</span>
                <span>{new Date(vaga.dataAbertura).toLocaleDateString("pt-BR")}</span>
            </div>
        </div>
    );
}