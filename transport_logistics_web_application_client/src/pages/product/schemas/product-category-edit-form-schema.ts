import {z} from 'zod';

export const productCategoryEditFormSchema = (isEditing: boolean) =>
    z.object({
        productCategoryName: z.string().min(1),
        productDescription: z.string().nullish(),
    });

export type ProductCategoryEditFormSchema = z.infer<ReturnType<typeof productCategoryEditFormSchema>>;