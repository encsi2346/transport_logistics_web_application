import {useEffect} from "react";


const OrderList = () => {

    const handleLoadOrders = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/orders`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getOrdersData = await getResponse.json();
        const getStatus = getResponse.status;
        console.log('getOrdersData', getOrdersData);
        console.log('getUserStatus', getStatus);
        //setCartTypes(getOrdersData);
    }

    useEffect(() => {
        handleLoadOrders();
    }, []);

    return (
        <div>

        </div>
    );
};

export default OrderList;