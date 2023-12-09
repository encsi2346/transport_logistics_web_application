import {z} from 'zod';

export const requestEditFormSchema = (isEditing: boolean) =>
    z.object({
        subject: z.string().min(1),
        affectedWorkingDay: z.string().min(1),
        reason: z.string().nullish(),
        status: z.string().nullish(),
    });

export type RequestEditFormSchema = z.infer<ReturnType<typeof requestEditFormSchema>>;