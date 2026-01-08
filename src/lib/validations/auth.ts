import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    remember: z.boolean().optional(),
});

export const registerSchema = z.object({
    name: z.string().min(3, 'Nama minimal 3 karakter'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(10, 'Nomor telepon minimal 10 digit').regex(/^[0-9]+$/, 'Nomor telepon hanya boleh angka'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string(),
    role_id: z.number().min(1, 'Pilih role'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
    email: z.string().email('Email tidak valid'),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
