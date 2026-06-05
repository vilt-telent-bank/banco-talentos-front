export type Senioridade = "INTERN" | "JUNIOR" | "MID_LEVEL" | "SENIOR" | "SPECIALIST";
export type Prioridade = "Baixa" | "Média" | "Alta" | "Urgente";
export type StatusVaga = "Aberta" | "Em andamento" | "Fechada" | "Cancelada";

export interface Vaga {
  id: string;
  titulo: string;
  senioridade: Senioridade;
  time: string;
  solicitante: string;
  tempoContratacao: string;
  area: string;
  skills: string[];
  descricao: string;
  status: StatusVaga;
  prioridade: Prioridade;
  dataAbertura: string;
}
