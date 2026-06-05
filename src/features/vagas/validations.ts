import { z } from "zod";

export const vagaSchema = z.object({
    titulo: z.string().min(3, "O título é obrigatório"),
    senioridade: z.enum(["INTERN", "JUNIOR", "MID_LEVEL", "SENIOR", "SPECIALIST"]),
    area: z.string().min(1, "A área é obrigatória"),
    time: z.string().min(1, "O time é obrigatório"),
    solicitante: z.string().min(1, "O solicitante é obrigatório"),
    tempoContratacao: z.string().optional(),
    status: z.enum(["Aberta", "Em andamento", "Fechada", "Cancelada"]),
    prioridade: z.enum(["Baixa", "Média", "Alta", "Urgente"]),
    dataAbertura: z.string().min(1, "A data é obrigatória"),
    skillsInput: z.string().optional(), // Gerenciaremos a string separada por vírgula aqui
    descricao: z.string().optional(),
});

export type VagaFormData = z.infer<typeof vagaSchema>;