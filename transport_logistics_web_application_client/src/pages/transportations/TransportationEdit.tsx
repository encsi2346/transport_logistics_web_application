import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import {Box} from "@mui/material";
import StepperComponent from "../../components/stepper/StepperComponent.tsx";
import TransportationCarSelector from "./TransportationCarSelector.tsx";
import TransportationDetails from "./TransportationDetails.tsx";
import TransportationDriver from "./TransportationDriver.tsx";
import TransportationOverview from "./TransportationOverview.tsx";
import TransportationShipment from "./TransportationShipment.tsx";
import {useTransportationStore} from "./stores/useTransportationStore.tsx";

interface Props {
    isEditing?: boolean;
}

const TransportationEdit = ({ isEditing = false }: Props) => {
    const currentStep = useTransportationStore((state) => state.currentStep);

    return (
        <Box>
            <BackgroundCard>
                <StepperComponent currentStep={currentStep} />
            </BackgroundCard>

            <Box sx={{
                marginTop: 3,
                marginBottom: 5,
                marginLeft: 0,
                marginRight: 0
            }}>
                <TransportationCarSelector />

                <TransportationDetails />

                <TransportationDriver />

                <TransportationShipment />

                <TransportationOverview />
            </Box>
        </Box>
    );
};

export default TransportationEdit;