import { z } from 'zod';

export const transportationOverviewFormSchema = z.object({

});

export type TransportationOverviewFormSchema = z.infer<typeof transportationOverviewFormSchema>;
