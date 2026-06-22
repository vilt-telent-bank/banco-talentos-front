import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../Button/Button";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-200">
            <span className="text-sm text-slate-500">
                Página <span className="font-medium text-slate-900">{currentPage + 1}</span> de{" "}
                <span className="font-medium text-slate-900">{totalPages}</span>
            </span>
            <div className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage === 0}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Próxima
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    );
}
