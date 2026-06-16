import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { profilesApi } from "../../api/profiles.api";
import type { UserProfile } from "../../types/profile";

export function useBancoTalentos() {
    const [search, setSearch] = useState("");
    const [area, setArea] = useState("");

    const [page, setPage] = useState(0);

    const { data, isLoading: loading } = useQuery({
        queryKey: ['profiles-ativos', page],
        queryFn: () => profilesApi.getAtivos(page, 20)
    });

    const profiles: UserProfile[] = data?.content || [];
    const totalPages = data?.totalPages || 1;
    const totalElements = data?.totalElements || 0;

    useEffect(() => {
        setPage(0);
    }, [search, area]);

    const areas = useMemo(() => Array.from(new Set(profiles.map((p) => p.area).filter(Boolean))), [profiles]);
    const disponiveis = useMemo(() => profiles.filter((p) => p.allocationStatus === "Disponível (Bench)"), [profiles]);

    const filtered = useMemo(() => disponiveis.filter((p) => {
        const q = search.toLowerCase();
        return (
            (!q || p.name?.toLowerCase().includes(q) || p.area?.toLowerCase().includes(q) ||
                p.skills?.some((s: any) => (s.skill?.name || s.name)?.toLowerCase().includes(q))) &&
            (!area || p.area === area)
        );
    }), [disponiveis, search, area]);

    return {
        search, setSearch, area, setArea, areas, filtered, loading,
        page, setPage, totalPages, totalElements
    };
}