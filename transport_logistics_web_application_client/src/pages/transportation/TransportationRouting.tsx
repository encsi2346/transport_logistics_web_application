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
            <Route path=":id" element={<TransportationOverview/>} />
            <Route path="/new" element={<TransportationCarSelector/>} />
            <Route path="/new/car-selector" element={<TransportationCarSelector/>} />
            <Route path="/new/details" element={<TransportationDetails/>} />
            <Route path="/new/driver" element={<TransportationDriver />} />
            <Route path="/new/products-selector" element={<TransportationShipment />} />
            <Route path="/new/overview" element={<TransportationOverview  />} />
            <Route path="/new/edit" element={<TransportationEdit />} />
        </Routes>
    );
};

export default TransportationRouting;