import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import {Box} from "@mui/material";
import StepperComponent from "../../components/stepper/StepperComponent.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useRef} from "react";
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
    const { t } = useTypeSafeTranslation();
    const { params } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const allowNavigationRef = useRef(false);

    const transportation = useTransportationStore((state) => state.transportation);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);
    const currentStep = useTransportationStore((state) => state.currentStep);
    const setLoadedTransportation = useTransportationStore((state) => state.setLoadedTransportation);

    const navigateBack = () => {
        navigate({ pathname: '..', search: location.state?.queryParams});
    }

    /*useEffect(() => {
        if (params.id) {
            getTransportation(String(params.id)).then((transportation) => {
                setLoadedTransportation(transportation);
            });
        }
    }, [params.id, setLoadedTransportation]);*/

    const handleSubmitClicked = () => {
        allowNavigationRef.current = true;

        navigateBack();
    };

    const handleDeleteClicked = () => {
        allowNavigationRef.current = true;
    };

    const handleCancelClicked = () => {
        navigateBack();
    };

    return (
        <Box>
            <BackgroundCard>
                <StepperComponent />
            </BackgroundCard>

            <Box sx={{
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10
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