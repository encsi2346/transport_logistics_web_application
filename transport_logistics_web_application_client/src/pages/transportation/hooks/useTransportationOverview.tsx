import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {useTransportationStore} from "../stores/useTransportationStore.tsx";
import {
    transportationOverviewFormSchema,
    TransportationOverviewFormSchema
} from "../schemas/transportation-overview-form-schema.ts";

const useTransportationOverview = () => {
    const [preValidationError, setPreValidationError] = useState(false);
    const submitOverviewForm = useTransportationStore((state) => state.submitOverviewForm);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<TransportationOverviewFormSchema>({
        resolver: zodResolver(transportationOverviewFormSchema),
        mode: 'all',
    });

    const onSubmit = handleSubmit((data) => {
        if (loadedTransportation.canModifyBaseData) {
            submitOverviewForm();
        } else {
        }
    });

    return { control, isValid, preValidationError, onSubmit };
};

export default useTransportationOverview;
