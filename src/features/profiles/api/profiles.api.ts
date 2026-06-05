import { http } from "@/lib/axios";

export const profilesApi = {
    getMyProfile: () => http.get("/profile").then((r) => r.data),
    submitProfile: (data: unknown) => http.post("/profile", data).then((r) => r.data),
    getPendentes: () => http.get("/admin/profiles/pending").then((r) => r.data),
    getAtivos: () => http.get("/admin/profiles/active").then((r) => r.data),
    getAllProfiles: () => http.get("/admin/profiles").then((r) => r.data),
    getProfileById: (id: string) => http.get(`/admin/profiles/${id}`).then((r) => r.data),
    updateProfile: (id: string, data: unknown) => http.patch(`/admin/profiles/${id}`, data).then((r) => r.data),
    getDashboard: () => http.get("/admin/dashboard").then((r) => r.data),
    getPendingUsers: () => http.get("/admin/users/pending").then((r) => r.data),
    approveUser: (id: string) => http.post(`/admin/users/${id}/approve`).then((r) => r.data),
    rejectUser: (id: string) => http.post(`/admin/users/${id}/reject`).then((r) => r.data),
};