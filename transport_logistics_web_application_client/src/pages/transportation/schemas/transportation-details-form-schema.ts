import { z } from 'zod';

export const transportationDetailsFormSchema = z.object({
    country: z.string().min(1),
    postcode: z.number().nullish,
    city: z.string().nullish(),
    nameOfPublicArea: z.string().nullish(),
    houseNumber: z.number().nullish(),
    startDate: z.string().nullish(),
    startTime: z.string().nullish(),
    arrivalCountry: z.string().nullish(),
    arrivalPostcode: z.number().nullish(),
    arrivalCity: z.string().nullish(),
    arrivalNameOfPublicArea: z.string().nullish(),
    arrivalTypeOfPublicArea: z.string().nullish(),
    arrivalHouseNumber: z.number().nullish(),
    endDate: z.string().nullish(),
    endTime: z.string().nullish()
});

export type TransportationDetailsFormSchema = z.infer<typeof transportationDetailsFormSchema>;
