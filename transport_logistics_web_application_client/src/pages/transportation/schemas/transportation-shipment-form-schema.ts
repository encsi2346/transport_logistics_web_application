import { z } from 'zod';

export const transportationShipmentFormSchema = z.object({

});

export type TransportationShipmentFormSchema = z.infer<typeof transportationShipmentFormSchema>;
