import {z} from 'zod';

export const documentEditFormSchema = () =>
    z.object({
        documentId: z.string().min(1),
        documentType: z.string().min(1), //documenttype
        title: z.string().nullish(),
        timeStamp: z.string().nullish(),
        status: z.string().nullish(), //documentstatus
        creator: z.string().nullish(), //user
        size: z.number().nullish(),
    });

export type DocumentEditFormSchema = z.infer<ReturnType<typeof documentEditFormSchema>>;