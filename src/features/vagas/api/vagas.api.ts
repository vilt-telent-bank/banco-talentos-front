import { http } from "@/lib/axios";

export const vagasApi = {
    getVagas: () => http.get("/admin/job-postings").then((r) => r.data),
    createVaga: (data: unknown) => http.post("/admin/job-postings", data).then((r) => r.data),
    updateVaga: (id: string, data: unknown) => http.put(`/admin/job-postings/${id}`, data).then((r) => r.data),
    deleteVaga: (id: string) => http.delete(`/admin/job-postings/${id}`).then((r) => r.data),
};