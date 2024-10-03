import BackgroundCard from "../../components/layout/BackgroundCard";
import {Box} from "@mui/material";
import StepperComponent from "../../components/stepper/StepperComponent";
import TransportationCarSelector from "./TransportationCarSelector";
import TransportationDetails from "./TransportationDetails";
import TransportationDriver from "./TransportationDriver";
import TransportationOverview from "./TransportationOverview";
import TransportationShipment from "./TransportationShipment";
import {useTransportationStore} from "./stores/useTransportationStore";

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