import {z} from 'zod';

export const invoiceEditFormSchema = () =>
    z.object({
        invoiceId: z.string().min(1),
        orderId: z.string().min(1),
        companyId: z.string().nullish(),
        dateOfCreation: z.date().nullish(),
        deadlineForPayment: z.date().nullish(),
        price: z.string().nullish(), //user
        status: z.string().nullish(), //invoicestatus
    });

export type InvoiceEditFormSchema = z.infer<ReturnType<typeof invoiceEditFormSchema>>;