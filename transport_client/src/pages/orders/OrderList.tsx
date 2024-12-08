import React, {useEffect, useState} from "react";
import {useTypeSafeTranslation} from '../../components/inputfield/hooks/useTypeSafeTranslation';
import {useLocation, useNavigate} from "react-router-dom";
import {useModal} from "@ebay/nice-modal-react";
import OrderAddDialog from "./OrderAddDialog";
import PageHeader from "../../components/text/PageHeader";
import {Box, Fab, Grid} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard";
import AddIcon from "@mui/icons-material/Add";
import OrderCard from "../../components/layout/OrderCard";
import TabComponent from "../../components/layout/TabComponent";


const OrderList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const addOrderDialog = useModal(OrderAddDialog);
    const [orderStatusList, setOrderStatusList] = useState([]);
    const [orders, setOrders] = useState([]);

    const openAddOrderDialog = () => {
        addOrderDialog
            .show({
                title: t('ORDER.ADD_NEW_ORDER'),
                acceptText: t('TEXT.CREATE'),
            })
            .then((value) => {
                setValue('products', value as string[]);
            })
            .catch(() => null);
    };

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
        setOrders(getOrdersData);
    }

    useEffect(() => {
        getOrders();
    }, []);

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
        <Box>
            <PageHeader text={t('ORDERS.ORDERS')}/>
            <ContentCard>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                    <TabComponent />
                </Box>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <Grid container rowSpacing={3} columnSpacing={-75}>
                        {orders
                            .map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item.id}>
                                        <OrderCard
                                            onClick={() => navigate(`/orders/${item.id}`)}
                                            id={item.id}
                                            status={item.status}
                                            company={item.company}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                    <Fab aria-label="add"
                         onClick={() => navigate(`/orders/new`)}
                         sx={{
                             margin: 0,
                             top: 'auto',
                             right: '40px',
                             bottom: '40px',
                             left: 'auto',
                             position: 'fixed',
                             width: '70px',
                             height: '70px',
                             backgroundColor: '#a40500',
                             color: '#ffffff'
                         }}
                    >
                        <AddIcon sx={{ width: '40px', height: '40px'}}/>
                    </Fab>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default OrderList;