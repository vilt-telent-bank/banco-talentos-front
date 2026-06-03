import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/api";
import type { StackItem } from "@/components/ui/StackInput";
import type { UserProfile } from "@/types/profile";

const profileSchema = z.object({
    photoUrl: z.string().optional(),
    area: z.string().min(1, "Obrigatório"),
    sobre: z.string().optional(),
    experienceYears: z.string().optional(),
    linkedinUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    registrationNumber: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useMeuPerfil() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [stacks, setStacks] = useState<StackItem[]>([]);

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        api.getMyProfile()
            .then((p: UserProfile) => {
                setProfile(p);
                form.reset({
                    photoUrl: p.photoUrl ?? "",
                    area: p.area ?? "",
                    sobre: p.sobre ?? "",
                    experienceYears: p.experienceYears != null ? String(p.experienceYears) : "",
                    linkedinUrl: p.linkedinUrl ?? "",
                    githubUrl: p.githubUrl ?? "",
                    registrationNumber: p.registrationNumber ?? "",
                });

                if (p.skills?.length) {
                    // Filtra skills garantindo que não sejam do tipo SOFT
                    const hardSkills = p.skills.filter((ps) => ps.skill?.type !== "SOFT" && ps.type !== "SOFT");

                    setStacks(
                        hardSkills.map((ps) => ({
                            name: ps.skill?.name ?? ps.name ?? "",
                            level: Number(ps.proficiencyLevel ?? ps.level ?? 5),
                        }))
                    );
                }
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    console.error("Token inválido ao buscar perfil");
                }
            })
            .finally(() => setLoading(false));
    }, [form]);

    const onSubmit = async (data: ProfileFormData) => {
        try {
            const skillList = stacks.map((s) => ({ name: s.name, level: s.level }));
            const payload = {
                ...data,
                experienceYears: data.experienceYears ? Number(data.experienceYears) : undefined,
                skills: skillList
            };
            const result = await api.submitProfile(payload);
            setProfile(result);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error("Erro ao salvar perfil", error);
        }
    };

    return {
        profile, loading, saved, stacks, setStacks, form, onSubmit
    };
}