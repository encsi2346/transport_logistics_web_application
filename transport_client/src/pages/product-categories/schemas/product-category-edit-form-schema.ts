import {z} from 'zod';

export const productCategoryEditFormSchema = (isEditing: boolean) =>
    z.object({
        productCategoryId: z.string().min(1),
        name: z.string().nullish(),
        description: z.string().nullish(),
        status: z.string().nullish(), //productstatus
    });

export type ProductCategoryEditFormSchema = z.infer<ReturnType<typeof productCategoryEditFormSchema>>;