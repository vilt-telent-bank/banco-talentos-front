export default function MeuHistorico() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>Meu Histórico</h1>
        <p className="text-sm text-gray-400 mt-0.5">Histórico de alocações e evolução de carreira</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-16 flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-lg font-semibold text-gray-800">Em breve</p>
      </div>
    </div>
  );
}
