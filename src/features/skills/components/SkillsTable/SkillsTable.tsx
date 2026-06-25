import { Pencil, Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { Table } from "@/components/ui/Table/Table";
import { SkillCategoryBadge } from "../SkillCategoryBadge/SkillCategoryBadge";
import type { Skill } from "../../types/types";

interface Props {
    data: Skill[];
    deletingSkillId?: string | null;
    onEdit?: (skill: Skill) => void;
    onDelete?: (skill: Skill) => void;
}

const MAX_VISIBLE_AVATARS = 2;

function getResourcesTotal(skill: Skill) {
    const avatarCount = skill.avatarUrls?.length ?? 0;
    return skill.resourcesCount ?? avatarCount;
}

function shouldShowMoreResources(skill: Skill) {
    const avatarCount = skill.avatarUrls?.length ?? 0;
    const total = getResourcesTotal(skill);
    return total > MAX_VISIBLE_AVATARS || avatarCount > MAX_VISIBLE_AVATARS;
}

function ResourcesCell({ skill }: { skill: Skill }) {
    const avatarUrls = skill.avatarUrls ?? [];
    const total = getResourcesTotal(skill);
    const showMore = shouldShowMoreResources(skill);
    const visibleAvatars = avatarUrls.slice(0, MAX_VISIBLE_AVATARS);

    return (
        <div className="flex items-center gap-2.5">
            <span className="font-semibold text-slate-900 tabular-nums shrink-0">{total}</span>

            {(visibleAvatars.length > 0 || showMore) && (
                <div className="flex items-center -space-x-2">
                    {visibleAvatars.map((url, index) => (
                        <Avatar
                            key={`${skill.id}-avatar-${index}`}
                            name={`${skill.name} ${index + 1}`}
                            photoUrl={url}
                            size={28}
                        />
                    ))}

                    {showMore && (
                        <div
                            className="size-7 rounded-full flex items-center justify-center shrink-0 bg-slate-100 border-2 border-white text-slate-500 text-sm font-semibold leading-none"
                            aria-label="Mais recursos"
                        >
                            +
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function formatAverageProficiency(value?: number) {
    const proficiency = value ?? 0;
    return `${proficiency.toFixed(1)}%`;
}

export function SkillsTable({ data, deletingSkillId, onEdit, onDelete }: Props) {
    const columns = [
        {
            header: "Skill",
            render: (skill: Skill) => (
                <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">{skill.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                        {skill.description || skill.type}
                    </p>
                </div>
            ),
        },
        {
            header: "Categoria",
            render: (skill: Skill) => <SkillCategoryBadge category={skill.category} />,
        },
        {
            header: "Qtd. Recursos",
            render: (skill: Skill) => <ResourcesCell skill={skill} />,
        },
        {
            header: "Nível Médio",
            render: (skill: Skill) => {
                const proficiency = skill.averageProficiency ?? 0;

                return (
                    <div className="flex flex-col gap-1.5 max-w-[180px]">
                        <span>{formatAverageProficiency(skill.averageProficiency)}</span>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-pink transition-[width] duration-500"
                                style={{ width: `${Math.min(proficiency, 100)}%` }}
                            />
                        </div>
                    </div>
                );
            },
        },
        {
            header: "Ações",
            className: "text-right",
            render: (skill: Skill) => (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit?.(skill)}
                        className="min-w-0 border-0 bg-slate-50 p-1.5 shadow-none font-normal rounded-md text-slate-400 hover:text-pink hover:bg-pink/10 active:scale-100 focus-visible:shadow-none"
                        title="Editar skill"
                        aria-label="Editar skill"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => onDelete?.(skill)}
                        disabled={deletingSkillId === skill.id}
                        className="min-w-0 border-0 bg-slate-50 p-1.5 shadow-none font-normal rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 active:scale-100 focus-visible:shadow-none disabled:hover:bg-slate-50 disabled:hover:text-slate-400"
                        title="Excluir skill"
                        aria-label="Excluir skill"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            data={data}
            keyExtractor={(skill) => skill.id}
            emptyMessage="Nenhuma skill encontrada"
        />
    );
}
