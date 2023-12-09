import { z } from 'zod';
//TODO
export const transportationCarFormSchema = z.object({

});

export type TransportationCarFormSchema = z.infer<typeof transportationCarFormSchema>;
