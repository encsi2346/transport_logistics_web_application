import BackgroundCard from "../../components/layout/BackgroundCard";
import {Box} from "@mui/material";
import StepperComponent from "../../components/stepper/StepperComponent";
import TransportationCarSelector from "./TransportationCarSelector";
import TransportationDetails from "./TransportationDetails";
import TransportationDriver from "./TransportationDriver";
import TransportationOverview from "./TransportationOverview";
import TransportationShipment from "./TransportationShipment";
import {useTransportationStore} from "./stores/useTransportationStore";
import {useEffect} from "react";

interface Props {
    isEditing?: boolean;
}

const TransportationEdit = ({ isEditing = false }: Props) => {
    const { currentStep, setCurrentStep } = useTransportationStore((state) => ({
        currentStep: state.currentStep,
        setCurrentStep: state.setCurrentStep,
    }));


    useEffect(() => {
        console.log('currentStep-edit', currentStep);
    }, [currentStep]);

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <TransportationCarSelector setCurrentStep={setCurrentStep} />;
            case 1:
                return <TransportationDetails setCurrentStep={setCurrentStep} />;
            case 2:
                return <TransportationDriver setCurrentStep={setCurrentStep} />;
            case 3:
                return <TransportationShipment setCurrentStep={setCurrentStep} />;
            case 4:
                return <TransportationOverview setCurrentStep={setCurrentStep} />;
            default:
                return <TransportationCarSelector setCurrentStep={setCurrentStep} />;
        }
    };

    return (
        <Box>
            <BackgroundCard>
                <StepperComponent currentStep={currentStep} setCurrentStep={setCurrentStep} />
            </BackgroundCard>

            <Box sx={{
                marginTop: 3,
                marginBottom: 5,
                marginLeft: 0,
                marginRight: 0
            }}>
                {renderStepContent()}
            </Box>
        </Box>
    );
};

export default TransportationEdit;