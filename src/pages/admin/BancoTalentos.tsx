import { PageHeader } from "@/components/ui";
import { BancoTalentosList } from "@/features/profiles";

export default function BancoTalentos() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Recursos" subtitle="Talentos disponíveis (bench)" />
      <BancoTalentosList />
    </div>
  );
}