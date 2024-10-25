import {z} from 'zod';

export const orderEditFormSchema = () =>
    z.object({
        orderId: z.string().min(1),
        status: z.string().min(1), //orderstatus
        company: z.string().nullish(), //company
        route: z.string().array().nullish(), //route
        selectedProducts: z.string().array().nullish(), //selectedproducts
        totalWeightsOfSelectedProducts: z.number().nullish(),
        departurePoint: z.string().nullish(), //departurePoint
        destinationPoint: z.string().nullish(), //departurePoint
        dockingPoints: z.string().array().nullish(), //departurePoint
        results: z.string().nullish(), //results
        documents: z.string().array().nullish(), //document
        invoice: z.string().nullish(), //invoice
        comments: z.string().array().nullish(), //comment
    });

export type OrderEditFormSchema = z.infer<ReturnType<typeof orderEditFormSchema>>;