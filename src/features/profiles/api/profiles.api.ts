import { http } from "@/lib/axios";

export const profilesApi = {
    getMyProfile: () => http.get("/v1/profile").then((r) => r.data),
    submitProfile: (data: unknown) => http.post("/v1/profile", data).then((r) => r.data),
    getPendentes: () => http.get("/v1/admin/profiles/pending").then((r) => r.data),
    getAtivos: () => http.get("/v1/admin/profiles/active").then((r) => r.data),
    getAllProfiles: () => http.get("/v1/admin/profiles").then((r) => r.data),
    getProfileById: (id: string) => http.get(`/v1/admin/profiles/${id}`).then((r) => r.data),
    updateProfile: (id: string, data: unknown) => http.patch(`/v1/admin/profiles/${id}`, data).then((r) => r.data),
    getDashboard: () => http.get("v1/admin/dashboard").then((r) => r.data),
    getPendingUsers: () => http.get("/v1/admin/users/pending").then((r) => r.data),
    approveUser: (id: string) => http.post(`/v1/admin/users/${id}/approve`).then((r) => r.data),
    rejectUser: (id: string) => http.post(`/v1/admin/users/${id}/reject`).then((r) => r.data),
};