import { http } from "@/lib/axios";
import type { Skill, SkillPayload, SkillsPaginatedResponse } from "../types/types";

export const skillsApi = {
    create: (data: SkillPayload) =>
        http.post<Skill>("/v1/admin/skills", data).then((r) => r.data),

    update: (id: string, data: SkillPayload) =>
        http.put<Skill>(`/v1/admin/skills/${id}`, data).then((r) => r.data),

    inactivateSkill: (id: string) =>
        http.patch<Skill>(`/v1/admin/skills/${id}/inactivate`).then((r) => r.data),

    getActiveSkills: (page = 0, size = 20) =>
        http.get<SkillsPaginatedResponse>(`/v1/admin/skills/active?page=${page}&size=${size}`).then((r) => r.data),

    getInactiveSkills: (page = 0, size = 20) =>
        http.get<SkillsPaginatedResponse>(`/v1/admin/skills/inactive?page=${page}&size=${size}`).then((r) => r.data),
};
