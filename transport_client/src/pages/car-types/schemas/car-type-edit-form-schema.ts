import {z} from 'zod';

export const carTypeEditFormSchema = (isEditing: boolean) =>
    z.object({
            carTypeId: z.string().min(1),
            brand: z.string().min(1),
            typeName: z.string().nullish(),
            design: z.string().nullish(),
            performance: z.string().nullish(),
            selfWeight: z.number().nullish(),
            usefulWeight: z.number().nullish(),
            numberOfSeats: z.number().nullish(),
            fuel: z.number().nullish(), //fueltype
            vontatas: z.number().nullish(),
            height: z.number().nullish(),
            szelesseg: z.number().nullish(),
            long: z.number().nullish(),
    });

export type CarTypeEditFormSchema = z.infer<ReturnType<typeof carTypeEditFormSchema>>;