import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Tag } from "@/components/ui";
import { type Vaga } from "../types";
import { vagaSchema, type VagaFormData } from "../validations";

const inputCls = "w-full font-sans text-base rounded-lg px-3.5 py-2.5 outline-none transition-all bg-white border border-slate-300 focus:border-pink focus:shadow-focus-pink text-slate-900 placeholder:text-slate-400";
const ErrorMsg = ({ msg }: { msg?: string }) => msg ? <span className="text-xs text-red-500">{msg}</span> : null;
function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return <div className="flex flex-col gap-1.5"><label className="text-xs font-medium text-slate-600">{label}</label>{children}</div>;
}

export function VagaModal({ initial, saving, onSave, onClose }: { initial: Omit<Vaga, "id"> & { id?: string }; saving: boolean; onSave: (v: Omit<Vaga, "id"> & { id?: string }) => void; onClose: () => void; }) {
    const isEdit = Boolean(initial.id);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<VagaFormData>({
        resolver: zodResolver(vagaSchema),
        defaultValues: { ...initial, skillsInput: initial.skills.join(", ") }
    });

    const skillsInputValue = watch("skillsInput") || "";

    function onSubmit(data: VagaFormData) {
        const skills = data.skillsInput ? data.skillsInput.split(",").map((s) => s.trim()).filter(Boolean) : [];
        onSave({ ...data, skills, id: initial.id } as Omit<Vaga, "id"> & { id?: string });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-login w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between px-7 py-5 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900">{isEdit ? "Editar vaga" : "Nova vaga"}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors text-xl leading-none">×</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1">
                    <div className="px-7 py-6 flex flex-col gap-5">
                        <Field label="Título da vaga">
                            <input className={`${inputCls} ${errors.titulo ? 'border-red-400' : ''}`} placeholder="ex: Desenvolvedor Full Stack" {...register("titulo")} />
                            <ErrorMsg msg={errors.titulo?.message} />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Senioridade">
                                <select className={inputCls} {...register("senioridade")}><option value="INTERN">Estagiário</option><option value="JUNIOR">Júnior</option><option value="MID_LEVEL">Pleno</option><option value="SENIOR">Sênior</option><option value="SPECIALIST">Especialista</option></select>
                                <ErrorMsg msg={errors.senioridade?.message} />
                            </Field>
                            <Field label="Área">
                                <input className={`${inputCls} ${errors.area ? 'border-red-400' : ''}`} placeholder="ex: Engenharia" {...register("area")} />
                                <ErrorMsg msg={errors.area?.message} />
                            </Field>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Time">
                                <input className={`${inputCls} ${errors.time ? 'border-red-400' : ''}`} placeholder="ex: Squad Pagamentos" {...register("time")} />
                                <ErrorMsg msg={errors.time?.message} />
                            </Field>
                            <Field label="Solicitante">
                                <input className={`${inputCls} ${errors.solicitante ? 'border-red-400' : ''}`} placeholder="Nome" {...register("solicitante")} />
                                <ErrorMsg msg={errors.solicitante?.message} />
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Field label="Tempo de contratação">
                                <input className={inputCls} placeholder="ex: CLT, PJ 3 meses" {...register("tempoContratacao")} />
                                <ErrorMsg msg={errors.tempoContratacao?.message} />
                            </Field>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Field label="Status">
                                <select className={inputCls} {...register("status")}><option>Aberta</option><option>Em andamento</option><option>Fechada</option><option>Cancelada</option></select>
                                <ErrorMsg msg={errors.status?.message} />
                            </Field>
                            <Field label="Prioridade">
                                <select className={inputCls} {...register("prioridade")}><option>Baixa</option><option>Média</option><option>Alta</option><option>Urgente</option></select>
                                <ErrorMsg msg={errors.prioridade?.message} />
                            </Field>
                            <Field label="Data de abertura">
                                <input type="date" className={`${inputCls} ${errors.dataAbertura ? 'border-red-400' : ''}`} {...register("dataAbertura")} />
                                <ErrorMsg msg={errors.dataAbertura?.message} />
                            </Field>
                        </div>
                        <Field label="Skills (separadas por vírgula)">
                            <input className={inputCls} placeholder="React, Node.js" {...register("skillsInput")} />
                            {skillsInputValue.trim() && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {skillsInputValue.split(",").map((s) => s.trim()).filter(Boolean).map((s) => <Tag key={s} kind="skill">{s}</Tag>)}
                                </div>
                            )}
                        </Field>
                        <Field label="Descrição">
                            <textarea className={`${inputCls} min-h-[100px] resize-y`} placeholder="Descreva as responsabilidades..." {...register("descricao")} />
                            <ErrorMsg msg={errors.descricao?.message} />
                        </Field>
                    </div>
                    <div className="px-7 py-5 border-t border-slate-200 flex items-center justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={onClose} disabled={saving}>Cancelar</Button>
                        <Button type="submit" variant="primary" loading={saving}>{isEdit ? "Salvar alterações" : "Criar vaga"}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}