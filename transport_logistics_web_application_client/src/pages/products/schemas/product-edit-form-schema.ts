import {z} from 'zod';

export const productEditFormSchema = (isEditing: boolean) =>
    z.object({
            productCategoryName: z.string().min(1),
            productName: z.string().min(1),
            productNumber: z.number().nullish(),
            barcode: z.number().nullish(),
            ownWeight: z.number().nullish(),
            maxNumberOfItems: z.number().nullish(),
            currentNumberOfItems: z.number().nullish(),
    });

export type ProductEditFormSchema = z.infer<ReturnType<typeof productEditFormSchema>>;