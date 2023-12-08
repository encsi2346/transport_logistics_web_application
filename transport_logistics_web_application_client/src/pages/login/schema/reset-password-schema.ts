import { z } from 'zod';

export const resetPasswordFormSchema = z.object({
    email: z.string().min(1),
});

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;