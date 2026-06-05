import { http } from "@/lib/axios";

export const skillsApi = {
    getSkillById: (id: string) => http.get(`/admin/skills/${id}`).then((r) => r.data),
    updateSkill: (id: string, data: unknown) => http.put(`/admin/skills/${id}`, data).then((r) => r.data),
    activateSkill: (id: string) => http.patch(`/admin/skills/${id}/activate`).then((r) => r.data),
    inactivateSkill: (id: string) => http.patch(`/admin/skills/${id}/inactivate`).then((r) => r.data),
    getActiveSkills: () => http.get("/admin/skills/active").then((r) => r.data),
    getInactiveSkills: () => http.get("/admin/skills/inactive").then((r) => r.data),
};