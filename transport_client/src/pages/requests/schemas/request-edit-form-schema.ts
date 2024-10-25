import {z} from 'zod';

export const requestEditFormSchema = (isEditing: boolean) =>
    z.object({
        requestId: z.string().min(1),
        title: z.string().min(1),
        typeOfRequest: z.string().nullish(), //RequestType
        selectedDate: z.string().nullish(),
        reason: z.string().nullish(),
        status: z.string().nullish(), //RequestStatus
        answerId: z.string().nullish(),
        userId: z.string().nullish(),
    });

export type RequestEditFormSchema = z.infer<ReturnType<typeof requestEditFormSchema>>;