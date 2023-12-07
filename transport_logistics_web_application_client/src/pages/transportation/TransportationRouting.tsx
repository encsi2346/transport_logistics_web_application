import {Route, Routes} from "react-router-dom";
import TransportationList from "./TransportationList.tsx";
import TransportationCarSelector from "./TransportationCarSelector.tsx";
import TransportationOverview from "./TransportationOverview.tsx";
import TransportationDetails from "./TransportationDetails.tsx";
import TransportationDriver from "./TransportationDriver.tsx";
import TransportationShipment from "./TransportationShipment.tsx";
import TransportationEdit from "./TransportationEdit.tsx";

const TransportationRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<TransportationList />} />
            <Route path=":id" element={<TransportationOverview isInputDisabled isEditing />} />
            <Route path="/new" element={<TransportationCarSelector isInputDisabled isEditing />} />
            <Route path="/new/car-selector" element={<TransportationCarSelector isInputDisabled isEditing />} />
            <Route path="/new/details" element={<TransportationDetails isInputDisabled isEditing />} />
            <Route path="/new/driver" element={<TransportationDriver isInputDisabled isEditing />} />
            <Route path="/new/products-selector" element={<TransportationShipment isInputDisabled isEditing />} />
            <Route path="/new/overview" element={<TransportationOverview isInputDisabled isEditing />} />
            <Route path="/new/edit" element={<TransportationEdit isInputDisabled isEditing />} />
        </Routes>
    );
};

export default TransportationRouting;