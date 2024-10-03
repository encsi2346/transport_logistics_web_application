import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {useTransportationStore} from "../stores/useTransportationStore";
import {
    TransportationDriverFormSchema,
    transportationDriverFormSchema
} from "../schemas/transportation-driver-form-schema";

const useTransportationDriver = () => {
    const [preValidationError, setPreValidationError] = useState(false);
    const submitDriverForm = useTransportationStore((state) => state.submitDriverForm);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<TransportationDriverFormSchema>({
        resolver: zodResolver(transportationDriverFormSchema),
        mode: 'all',
    });

    const onSubmit = handleSubmit((data) => {
        if (loadedTransportation.canModifyBaseData) {
            submitDriverForm();
        } else {
        }
    });

    return { control, isValid, preValidationError, onSubmit };
};

export default useTransportationDriver;
