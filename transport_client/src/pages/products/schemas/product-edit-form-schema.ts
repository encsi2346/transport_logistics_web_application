import {z} from 'zod';

export const productEditFormSchema = (isEditing: boolean) =>
    z.object({
        productId: z.string().min(1),
        name: z.string().min(1),
        description: z.string().nullish(),
        category: z.string().nullish(), //productcategory
        articleNumber: z.number().nullish(),
        barcode: z.number().nullish(),
        selfWeight: z.number().nullish(),
        maxNumberOfItems: z.number().nullish(),
        currentNumberOfItems: z.number().nullish(),
        szazalek: z.number().nullish(),
        status: z.string().nullish(), //productstatus
    });

export type ProductEditFormSchema = z.infer<ReturnType<typeof productEditFormSchema>>;