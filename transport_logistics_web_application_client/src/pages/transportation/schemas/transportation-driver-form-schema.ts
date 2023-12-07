import { z } from 'zod';

export const transportationDriverFormSchema = z.object({

});

export type TransportationDriverFormSchema = z.infer<typeof transportationDriverFormSchema>;
