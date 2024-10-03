import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {useTransportationStore} from "../stores/useTransportationStore";
import {
    TransportationShipmentFormSchema,
    transportationShipmentFormSchema
} from "../schemas/transportation-shipment-form-schema";

const useTransportationShipment = () => {
    const [preValidationError, setPreValidationError] = useState(false);
    const submitShipmentForm = useTransportationStore((state) => state.submitShipmentForm);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<TransportationShipmentFormSchema>({
        resolver: zodResolver(transportationShipmentFormSchema),
        mode: 'all',
    });

    const onSubmit = handleSubmit((data) => {
        if (loadedTransportation.canModifyBaseData) {
            submitShipmentForm();
        } else {
        }
    });

    return { control, isValid, preValidationError, onSubmit };
};

export default useTransportationShipment;
