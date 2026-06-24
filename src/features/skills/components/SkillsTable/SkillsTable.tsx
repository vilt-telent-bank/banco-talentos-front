import { Pencil, Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Table } from "@/components/ui/Table/Table";
import type { Skill } from "../../types/types";
import { getCategoryBadgeStyle, getSkillCategoryLabel } from "../../utils/skillDisplay";

interface Props {
    data: Skill[];
    deletingSkillId?: string | null;
    onEdit?: (skill: Skill) => void;
    onDelete?: (skill: Skill) => void;
}

function formatAverageProficiency(value?: number) {
    const proficiency = value ?? 0;
    return `${proficiency.toFixed(1)}%`;
}

export function SkillsTable({ data, deletingSkillId, onEdit, onDelete }: Props) {
    const columns = [
        {
            header: "SKILL",
            render: (skill: Skill) => (
                <div className="min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{skill.name}</p>
                    <p className="text-[11px] font-medium text-slate-400 truncate">
                        {skill.description || skill.type}
                    </p>
                </div>
            ),
            className: "min-w-[220px]",
        },
        {
            header: "CATEGORIA",
            render: (skill: Skill) => (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${getCategoryBadgeStyle(skill.category)}`}
                >
                    {getSkillCategoryLabel(skill.category)}
                </span>
            ),
            className: "w-36",
        },
        {
            header: "QTD. RECURSOS",
            render: (skill: Skill) => (
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-800 min-w-[2rem]">
                        {skill.resourcesCount ?? 0}
                    </span>
                    {skill.avatarUrls && skill.avatarUrls.length > 0 && (
                        <div className="flex -space-x-2">
                            {skill.avatarUrls.slice(0, 3).map((url, index) => (
                                <Avatar
                                    key={`${skill.id}-avatar-${index}`}
                                    name={`${skill.name} ${index + 1}`}
                                    photoUrl={url}
                                    size={28}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ),
            className: "w-44",
        },
        {
            header: "NÍVEL MÉDIO",
            render: (skill: Skill) => {
                const proficiency = skill.averageProficiency ?? 0;

                return (
                    <div className="flex flex-col gap-1.5 min-w-[180px]">
                        <span className="text-sm text-slate-700">
                            {formatAverageProficiency(skill.averageProficiency)}
                        </span>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-pink transition-[width] duration-500"
                                style={{ width: `${Math.min(proficiency, 100)}%` }}
                            />
                        </div>
                    </div>
                );
            },
            className: "w-52",
        },
        {
            header: "AÇÕES",
            render: (skill: Skill) => (
                <div className="flex items-center gap-1 justify-end">
                    <button
                        onClick={() => onEdit?.(skill)}
                        className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors p-2 rounded-md"
                        title="Editar skill"
                        aria-label="Editar skill"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete?.(skill)}
                        disabled={deletingSkillId === skill.id}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Excluir skill"
                        aria-label="Excluir skill"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
            className: "w-24",
        },
    ];

    return (
        <Table<Skill>
            columns={columns}
            data={data}
            keyExtractor={(skill) => skill.id}
            emptyMessage="Nenhuma skill encontrada"
        />
    );
}
