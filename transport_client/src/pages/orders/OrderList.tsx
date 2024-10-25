import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {documentEditFormSchema, DocumentEditFormSchema} from "@/pages/documents/schemas/document-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {OrderEditFormSchema, orderEditFormSchema} from "@/pages/orders/schemas/order-edit-form-schema";


const OrderList = () => {
    const [orderStatusList, setOrderStatusList] = useState([]);

    const handleOrderStatusList = async () => {
        const getResponse = await fetch(
            "http://localhost:3001/api/orderStatus",
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getOrderStatusList = await getResponse.json();
        //const getStatus = getResponse.status;
        console.log('OrderStatuses', getOrderStatusList);

        const formattedOrderStatusList = getOrderStatusList.map(orderStatus => ({
            value: orderStatus,
            label: orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)
        }));
        console.log('formattedOrderStatusList', formattedOrderStatusList);
        setOrderStatusList(formattedOrderStatusList);
    }

    useEffect(() => {
        handleOrderStatusList();
    }, [])

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<OrderEditFormSchema>({
        defaultValues: {
            orderId: '',
            status: '',
            company: '',
            route: [],
            selectedProducts: [],
            totalWeightsOfSelectedProducts: null,
            departurePoint: '',
            destinationPoint: '',
            dockingPoints: [],
            results: '',
            documents: [],
            invoice: '',
            comments: [],
        },
        resolver: zodResolver(orderEditFormSchema()),
        mode: 'all',
    });

    const getOrders = async () => {
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

    const getOrder = async (id: string) => {
        try {
            const getOrderResponse = await fetch(
                `http://localhost:3001/api/orders/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getOrderData = await getOrderResponse.json();
            const getStatus = getOrderResponse.status;
            console.log('getOrderData', getOrderData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
        } catch (error) {
            console.error('Error get order:', error);
        }
    }

    const createOrder = async (data: any) => {
        try {
            const createOrderResponse = await fetch(
                `http://localhost:3001/api/orders/addOrder`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getOrderData = await createOrderResponse.json();
            const getStatus = createOrderResponse.status;
            console.log('getOrderData', getOrderData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getOrderData;
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const updateOrderType = async (id: string, data: any) => {
        try {
            const updatedOrderResponse = await fetch(
                `http://localhost:3001/api/orders/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getOrderData = await updatedOrderResponse.json();
            const getStatus = updatedOrderResponse.status;
            console.log('getOrderData', getOrderData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getOrderData;
        } catch (error) {
            console.error(`Error updating order with ID ${id}:`, error);
        }
    };

    const deleteOrder = async (id: string) => {
        //TODO
        try {
            const deleteOrderResponse = await fetch(
                `http://localhost:3001/api/orders/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getOrderData = await deleteOrderResponse.json();
            const getStatus = deleteOrderResponse.status;
            console.log('getOrderData', getOrderData);
            console.log('getUserStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getOrderData;
        } catch (error) {
            console.error(`Error deleting order with ID ${id}:`, error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>

        </div>
    );
};

export default OrderList;