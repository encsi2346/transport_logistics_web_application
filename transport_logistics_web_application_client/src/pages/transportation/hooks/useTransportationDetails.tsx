import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {useTransportationStore} from "../stores/useTransportationStore.tsx";
import {
    TransportationDetailsFormSchema,
    transportationDetailsFormSchema
} from "../schemas/transportation-details-form-schema.ts";

const useTransportationDetails = () => {
    const [preValidationError, setPreValidationError] = useState(false);
    const submitDetailsForm = useTransportationStore((state) => state.submitDetailsForm);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const {
        control,
        setValue,
        handleSubmit,
        trigger,
        formState: { isValid },
    } = useForm<TransportationDetailsFormSchema>({
        resolver: zodResolver(transportationDetailsFormSchema),
        mode: 'all',
    });

    const onSubmit = handleSubmit((data) => {
        if (loadedTransportation.canModifyBaseData) {
            submitDetailsForm();
        } else {
        }
    });

    return { control, isValid, preValidationError, onSubmit };
};

export default useTransportationDetails;
