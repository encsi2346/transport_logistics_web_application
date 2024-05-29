import {z} from 'zod';

export const carTypeEditFormSchema = (isEditing: boolean) =>
    z.object({
        carTypeName: z.string().min(1),
        carFunctionalDesign: z.string().min(1),
        performance: z.number().nullish(),
        ownWeight: z.number().nullish(),
        numberOfSeats: z.number().nullish(),
        fuel: z.string().nullish(),
        usefulWeight: z.number().nullish(),
    });

export type CarTypeEditFormSchema = z.infer<ReturnType<typeof carTypeEditFormSchema>>;