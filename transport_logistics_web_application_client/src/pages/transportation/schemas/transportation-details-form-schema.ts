import { z } from 'zod';

export const transportationDetailsFormSchema = z.object({

});

export type TransportationDetailsFormSchema = z.infer<typeof transportationDetailsFormSchema>;
