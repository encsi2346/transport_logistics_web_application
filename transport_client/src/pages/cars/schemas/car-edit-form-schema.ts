import {z} from 'zod';

export const carEditFormSchema = (isEditing: boolean) =>
    z.object({
            carId: z.string().min(1),
            name: z.string().min(1),
            type: z.string().nullish(), //cartype
            licencePlate: z.string().nullish(),
            numberOfRegistrationLicence: z.number().nullish(),
            chassisNumber: z.string().nullish(),
            yearOfProduction: z.date().nullish(),
            dateOfFirstRegistration: z.date().nullish(),
            images: z.string().array().nullish(),
            dateOfDatabaseRegistration: z.date().nullish(),
            dateOfLastTechnicalExamination: z.date().nullish(),
            dateOfLastService: z.date().nullish(),
            totalDrivenKm: z.number().nullish(),
            totalTransport: z.number().nullish(),
    });

export type CarEditFormSchema = z.infer<ReturnType<typeof carEditFormSchema>>;