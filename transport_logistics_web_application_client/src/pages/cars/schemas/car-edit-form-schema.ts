import {z} from 'zod';

export const carEditFormSchema = (isEditing: boolean) =>
    z.object({
        carTypeName: z.string().min(1),
        licencePlate: z.string().min(1),
        registrationCertificationNumber: z.string().nullish(),
        chassisNumber: z.string().nullish(),
        yearOfProduction: z.number().nullish(),
        dateOfFirstRegistration: z.string().nullish(),
    });

export type CarEditFormSchema = z.infer<ReturnType<typeof carEditFormSchema>>;