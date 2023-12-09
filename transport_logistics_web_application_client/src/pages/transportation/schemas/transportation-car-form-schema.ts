import { z } from 'zod';

export const transportationCarFormSchema = z.object({
    selectedCarType: z.string().min(1),
    carFunctionalDesign: z.string().min(1),
    performance: z.string().nullish(),
    ownWeight: z.number().nullish(),
    numberOfSeats: z.number().nullish(),
    fuel: z.string().nullish(),
    usefulWeight: z.number().nullish(),
    selectedCar: z.string().nullish(),
    licencePlate: z.string().nullish(),
    registrationCertificationNumber: z.string().nullish(),
    chassisNumber: z.string().nullish(),
    yearOfProduction: z.number().nullish(),
    dateOfFirstRegistration: z.string().nullish(),
});

export type TransportationCarFormSchema = z.infer<typeof transportationCarFormSchema>;
