import {Box} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps.ts";
import {useTransportationStore} from "./stores/useTransportationStore.tsx";
import useTransportationShipment from "./hooks/useTransportationShipment.tsx";


const TransportationShipment = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const thisStep = TransportationSteps.SHIPMENT;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;

    const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationShipment();

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {!isActiveStep && (
                <Box>
                    <BackgroundCard>
                        {!isStepDone && (
                            <Box sx={{ display: 'inline', paddingLeft: 150}}>
                                <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={() => navigate(-1)}/>
                                <SaveButton text={t('TEXT.NEXT')}  disabled={!isValid || !isActiveStep} onClick={onSubmit}/>
                            </Box>
                        )}
                    </BackgroundCard>
                </Box>
            )};
        </form>
    );
};

export default TransportationShipment;