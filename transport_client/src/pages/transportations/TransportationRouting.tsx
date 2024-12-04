import {Route, Routes} from "react-router-dom";
import TransportationList from "./TransportationList";
import TransportationCarSelector from "./TransportationCarSelector";
import TransportationOverview from "./TransportationOverview";
import TransportationDetails from "./TransportationDetails";
import TransportationDriver from "./TransportationDriver";
import TransportationShipment from "./TransportationShipment";
import TransportationEdit from "./TransportationEdit";
import {useTransportationStore} from "./stores/useTransportationStore";

const TransportationRouting = () => {
    const { setCurrentStep } = useTransportationStore((state) => ({
        setCurrentStep: state.setCurrentStep,
    }));

    return (
        <Routes>
            <Route path="/" element={<TransportationList />} />
            <Route path=":id" element={<TransportationOverview setCurrentStep={setCurrentStep}/>} />
            <Route path="/new" element={<TransportationCarSelector setCurrentStep={setCurrentStep}/>} />
            <Route path="/new/car-selector" element={<TransportationCarSelector setCurrentStep={setCurrentStep}/>} />
            <Route path="/new/details" element={<TransportationDetails setCurrentStep={setCurrentStep}/>} />
            <Route path="/new/driver" element={<TransportationDriver setCurrentStep={setCurrentStep} />} />
            <Route path="/new/products-selector" element={<TransportationShipment setCurrentStep={setCurrentStep} />} />
            <Route path="/new/overview" element={<TransportationOverview setCurrentStep={setCurrentStep} />} />
            <Route path="/new/edit" element={<TransportationEdit />} />
        </Routes>
    );
};

export default TransportationRouting;