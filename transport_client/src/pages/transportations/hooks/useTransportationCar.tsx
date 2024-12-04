import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {TransportationCarFormSchema, transportationCarFormSchema} from "../schemas/transportation-car-form-schema";
import {useTransportationStore} from "../stores/useTransportationStore";

const useTransportationCar = () => {
    const [preValidationError, setPreValidationError] = useState(false);
    const submitCarForm = useTransportationStore((state) => state.submitCarForm);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<TransportationCarFormSchema>({
        defaultValues: {
        },
        resolver: zodResolver(transportationCarFormSchema),
        mode: 'all',
    });

    const onSubmit = handleSubmit((data) => {
        console.log("onSubmit called");
        if (loadedTransportation.canModifyBaseData) {
            submitCarForm();
        } else {
        }
    });

    return { control, isValid, preValidationError, onSubmit };
};

export default useTransportationCar;
