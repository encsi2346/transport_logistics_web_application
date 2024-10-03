import {Route, Routes} from "react-router-dom";
import TransportationList from "./TransportationList";
import TransportationCarSelector from "./TransportationCarSelector";
import TransportationOverview from "./TransportationOverview";
import TransportationDetails from "./TransportationDetails";
import TransportationDriver from "./TransportationDriver";
import TransportationShipment from "./TransportationShipment";
import TransportationEdit from "./TransportationEdit";

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