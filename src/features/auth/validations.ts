import { z } from "zod";
import { UserRole } from "./types/roles";

export const loginSchema = z.object({
    email: z.string().min(1, "O e-mail é obrigatório").email("Formato de e-mail inválido"),
    password: z.string().min(1, "A senha é obrigatória"),
});

export const registerSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Formato de e-mail inválido").endsWith("@vilt-group.com", "Use seu e-mail corporativo"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    role: z.nativeEnum(UserRole),
    groupId: z.string().min(1, "Selecione um grupo"),
});

export const resetPasswordSchema = z.object({
    email: z.string().email("Formato de e-mail inválido"),
    token: z.string(),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirm: z.string().min(1, "Confirme sua senha"),
}).refine((data) => data.password === data.confirm, {
    message: "As senhas não coincidem",
    path: ["confirm"],
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Formato de e-mail inválido").min(1, "O e-mail é obrigatório"),
});

export const verifyEmailSchema = z.object({
    email: z.string().email("Formato de e-mail inválido").min(1, "O e-mail é obrigatório"),
    code: z.string().length(6, "O código deve ter exatamente 6 dígitos"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;