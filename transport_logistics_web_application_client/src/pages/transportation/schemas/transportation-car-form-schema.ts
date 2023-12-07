import { z } from 'zod';

export const transportationCarFormSchema = z.object({

});

export type TransportationCarFormSchema = z.infer<typeof transportationCarFormSchema>;
