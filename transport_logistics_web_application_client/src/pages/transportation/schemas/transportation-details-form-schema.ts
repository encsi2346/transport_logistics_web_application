import { z } from 'zod';
//TODO
export const transportationDetailsFormSchema = z.object({

});

export type TransportationDetailsFormSchema = z.infer<typeof transportationDetailsFormSchema>;
