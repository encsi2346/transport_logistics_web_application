import {z} from 'zod';

export const userEditFormSchema = (isEditing: boolean) =>
    z.object({
        familyName: z.string().min(1),
        firstName: z.string().min(1),
        gender: z.string().nullish(),
        nationality: z.string().nullish(),
        birthPlace: z.string().nullish(),
        birthDate: z.string().nullish(),
        IDCardNumber: z.string().nullish(),
        validityDateOfIDCard: z.string().nullish(),
        drivingLicenceNumber: z.string().nullish(),
        drivingLicenceCategories: z.string().nullish(),
        validityDateOfDrivingLicence: z.string().nullish(),
        dateOfMedicalVisit: z.string().nullish(),
        validityDateOfMedicalVisit: z.string().nullish(),
        email: z.string().nullish(),
        phoneNumber: z.number().nullish(),
        country: z.string().nullish(),
        postcode: z.number().nullish(),
        city: z.string().nullish(),
        nameOfPublicArea: z.string().nullish(),
        typeOfPublicArea: z.string().nullish(),
        houseNumber: z.number().nullish(),
        dateOfRegistration: z.string().nullish(),
        startDateOfContract: z.string().nullish(),
        endDateOfContract: z.string().nullish(),
        position: z.string().nullish(),
        lineManager: z.string().nullish(),
        healthProblem: z.string().nullish(),
    });

export type UserEditFormSchema = z.infer<ReturnType<typeof userEditFormSchema>>;