import {Box, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps";
import {useTransportationStore} from "./stores/useTransportationStore";
import useTransportationShipment from "./hooks/useTransportationShipment";
import SelectInput from "../../components/inputField/SelectInput";
import React, {useEffect, useMemo, useState} from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import {createPortal} from "react-dom";
import ItemCard from "../../components/dragAndDrop/ItemCard";
import ProductContainer from "../../components/dragAndDrop/ProductContainer";
import PlusIcon from '@mui/icons-material/Add';
import "../../App.css";
import ItemContainer from "../../components/dragAndDrop/ItemContainer";
import useTransportationCar from "./hooks/useTransportationCar";

export type Id = string | number;

export type Container = {
    id: Id;
    title: string;
};

export type Item = {
    id: Id;
    containerId: Id;
    productName: string;
    amountOfProduct: string;
};
//TODO

interface Props {
    setCurrentStep: (step: number) => void;
}

const TransportationShipment = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const { selectedProducts, totalWeightsOfSelectedProducts, setTransportation } = useTransportationStore();
    const [productCategories, setProductCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const thisStep = TransportationSteps.SHIPMENT;
    const currentStep = useTransportationStore((state) => state.currentStep);
    //const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;
    const [selectedProductCategory, setSelectedProductCategory] = useState('');
    const [selectedProductsList, setSelectedProductsList] = useState([]);

   /* const { control, isValid, preValidationError, onSubmit} = useTransportationShipment();*/

    const { onSubmit } = useTransportationCar();

    const handleLoadProductCategories = async () => {
        const getResponse = await fetch(
            `http://localhost:3001/api/product-categories`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getProductCategoriesData = await getResponse.json();
        setProductCategories(getProductCategoriesData);
    }

    useEffect(() => {
        handleLoadProductCategories();
    }, []);

    const handleLoadProducts = async (id) => {
        try {
            const params = new URLSearchParams({
                category: id,
            });

            const response = await fetch(
                `http://localhost:3001/api/product-categories/products?${params.toString()}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }

            const data = await response.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error('Error loading paginated products:', error);
        }
    };

    useEffect(() => {
        if (selectedProductCategory) {
            handleLoadProducts(selectedProductCategory);
        }
    }, [selectedProductCategory]);

    useEffect(() => {
        console.log('products', products);
    }, [productCategories, products])

    const handleCancelClicked = () => {
        setCurrentStep(2);
        //navigate(-1);
    };

    const handleNextClicked  = () => {
        //onSubmit(); // Calls the `onSubmit` from the hook
        setTransportation(selectedProductsList);
        setCurrentStep(4); // Move to the next step
    };

    // Handle changes in quantity for a selected product
    const handleQuantityChange = (event, item) => {
        const updatedItems = items.map((i) =>
            i.id === item.id
                ? { ...i, selectedNumberOfItems: event.target.value }
                : i
        );
        setItems(updatedItems);
    };

    // Handle changes in weight for a selected product
    const handleWeightChange = (event, item) => {
        const updatedItems = items.map((i) =>
            i.id === item.id
                ? { ...i, weightOfSelectedItems: event.target.value }
                : i
        );
        setItems(updatedItems);
    };


    const [itemContainer, setItemContainer] = useState<Container>({
        id: "itemContainer",
        title: "ItemContainer",
    });
    const [containers, setContainers] = useState<Container[]>([
        {
            id: "Box1",
            title: "Box1",
        },
        {
            id: "Box2",
            title: "Box2",
        },
        {
            id: "Box3",
            title: "Box3",
        },
        {
            id: "Box4",
            title: "Box4",
        },
        {
            id: "Box5",
            title: "Box5",
        },
        {
            id: "Box6",
            title: "Box6",
        },
    ]);
    const containersId = useMemo(() => containers.map((con) => con.id), [containers]);
    const [items, setItems] = useState<Item[]>([...products]);

    const [activeContainer, setActiveContainer] = useState<Container | null>(null);

    const [activeItem, setActiveItem] = useState<Item | null>(null);

    useEffect(() => {

    }, [items]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === "Container") {
            setActiveContainer(event.active.data.current.container);
            return;
        }

        if (event.active.data.current?.type === "Item") {
            setActiveItem(event.active.data.current.item);
            return;
        }
    }

    const onDragEnd = (event: DragEndEvent) => {
        setActiveContainer(null);
        setActiveItem(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveContainer = active.data.current?.type === "Container";
        if (!isActiveContainer) return;

        const activeItem = items.find((item) => item.id === active.id);
        if (!activeItem) return;

        // Add the item to the selected products list
        const newSelectedProduct = {
            selectedProductId: generateId(), // uuidv4(),
            productId: activeItem.productId,
            productName: activeItem.productName,
            //maxNumberOfItems: activeItem.maxNumberOfItems,
            //currentNumberOfItems: activeItem.currentNumberOfItems,
            selectedNumberOfItems: activeItem.selectedNumberOfItems,
            weightOfSelectedItems: activeItem.weightOfSelectedItems,
        };

        setSelectedProductsList((prevList) => [...prevList, newSelectedProduct]);

        console.log("DRAG END");

        setContainers((containers) => {
            const activeContainerIndex = containers.findIndex((con) => con.id === activeId);

            const overContainerIndex = containers.findIndex((con) => con.id === overId);

            return arrayMove(containers, activeContainerIndex, overContainerIndex);
        });
    }

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveItem = active.data.current?.type === "Item";
        const isOverItem= over.data.current?.type === "Item";

        if (!isActiveItem) return;

        if (isActiveItem && isOverItem) {
            setItems((item) => {
                const activeIndex = items.findIndex((t) => t.id === activeId);
                const overIndex = items.findIndex((t) => t.id === overId);

                if (items[activeIndex].containerId != items[overIndex].containerId) {
                    items[activeIndex].containerId = items[overIndex].containerId;
                    return arrayMove(items, activeIndex, overIndex - 1);
                }

                return arrayMove(items, activeIndex, overIndex);
            });
        }

        const isOverContainer = over.data.current?.type === "Container";

        if (isActiveItem && isOverContainer) {
            setItems((items) => {
                const activeIndex = items.findIndex((t) => t.id === activeId);

                items[activeIndex].containerId = overId;
                console.log("DROPPING TASK OVER CONTAINER", { activeIndex });
                return arrayMove(items, activeIndex, activeIndex);
            });
        }
    }

    const generateId = () => {
        return Math.floor(Math.random() * 10001);
    }


    const createNewContainer = () => {
        const containerToAdd: Container = {
            id: generateId(),
            title: `Container ${containers.length + 1}`,
        };

        setContainers([...containers, containerToAdd]);
    }

    const deleteContainer = (id: Id) => {
        const filteredContainers = containers.filter((con) => con.id !== id);
        setContainers(filteredContainers);

        const newItems = items.filter((t) => t.containerId !== id);
        setItems(newItems);
    }

    const addBackItem = (itemId: Id, itemName: string, amountOfProduct: string) => {
        const newItem: Item = {
            id: itemId,
            containerId: itemContainer.id,
            productName: itemName,
            amountOfProduct: amountOfProduct,
        };

        setItems([...items, newItem]);
    }

    const deleteItem = (id: Id) => {
        const removedItem = items.filter((item) => item.id === id);
        const newItems = items.filter((item) => item.id !== id);

        setItems(newItems);
        addBackItem(id, removedItem[0].productName, removedItem[0].amountOfProduct);
    }

    useEffect(() =>  {
        console.log('selectedproductcategory', selectedProductCategory);
    }, [selectedProductCategory])

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box sx={{ display: 'flex'}}>
                    <div>
                        <DndContext
                            sensors={sensors}
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            onDragOver={onDragOver}
                        >
                            <Grid item container direction="row">
                                <Grid item xs={4} md={3}>
                                    <Box sx={{ width: 300, height: 600}}>
                                        <BackgroundCard>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <FormControl>
                                                    <InputLabel>{t('TRANSPORTATIONS.PRODUCT_CATEGORY')}</InputLabel>
                                                    <Select
                                                        id="productCategory"
                                                        placeholder={t('TRANSPORTATIONS.PRODUCT_CATEGORY')}
                                                        label={t('TRANSPORTATIONS.PRODUCT_CATEGORY')}
                                                        name='productCategory'
                                                        data-testid='product-category-input'
                                                        value={selectedProductCategory ?? ''}
                                                        onChange={(e) => setSelectedProductCategory(e.target.value)}
                                                        sx={{
                                                            backgroundColor: `#ffffff`,
                                                            borderRadius: '18px',
                                                            color: `#000000`,
                                                            textDecoration: 'none',
                                                            height: 40,
                                                            width: 250,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            fontSize: "15px",
                                                            "& fieldset": {border: 'none'},
                                                        }}
                                                    >
                                                        {Object.values(productCategories).map((cat) => (
                                                            <MenuItem key={cat._id} value={cat._id}>
                                                                {cat.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <SortableContext items={containersId}>
                                                <ItemContainer
                                                    key={itemContainer.id}
                                                    container={itemContainer}
                                                    items={items.filter((item) => item.containerId === itemContainer.id)}
                                                />
                                            </SortableContext>
                                        </BackgroundCard>
                                    </Box>
                                </Grid>

                                <Grid item xs={4} md={9}>
                                    <Box sx={{ width: 1140, height: 600, marginLeft: -6, display: 'grid'}}>
                                        <BackgroundCard>
                                            <Grid item container direction="row" sx={{ marginTop: 5, marginLeft: 15}}>
                                                <Grid item xs={4} md={3} sx={{ marginRight: -8}}>
                                                    <Box sx={{ width: 200, height: 350, backgroundColor: '#9e9e9e'}}>
                                                        <Grid item container direction="column">
                                                            <Grid item container direction="column">
                                                                <Grid item xs={4} md={3}>
                                                                    <Box sx={{ width: 170, height: 80, borderRadius: '17px', backgroundColor: '#4d4d4d', marginTop: 5, marginBottom: 1, marginLeft: 2}}>

                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={4} md={3}>
                                                                    <Box sx={{ width: 170, height: 80, borderRadius: '17px', backgroundColor: '#4d4d4d', marginTop: 1, marginBottom: 1, marginLeft: 2}}>

                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={4} md={3}>
                                                                    <Box sx={{ width: 170, height: 80, borderRadius: '17px', backgroundColor: '#4d4d4d', marginTop: 1, marginBottom: 1, marginLeft: 2}}>

                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4} md={6}>
                                                    <Box sx={{ width: 600, height: 350, backgroundColor: '#9e9e9e', borderColor: '#ff0000', borderStyle: 'dashed', borderWidth: 3}}>
                                                        <Grid item container direction="row">
                                                            <SortableContext items={containersId}>
                                                                {containers.map((container) => (
                                                                    <ProductContainer
                                                                        key={container.id}
                                                                        container={container}
                                                                        deleteContainer={deleteContainer}
                                                                        deleteItem={deleteItem}
                                                                        items={items.filter((item) => item.containerId === container.id)}
                                                                        handleQuantityChange={handleQuantityChange}
                                                                        handleWeightChange={handleWeightChange}
                                                                    />
                                                                ))}
                                                            </SortableContext>

                                                            {createPortal(
                                                                <DragOverlay>
                                                                    {activeContainer && (
                                                                        <ProductContainer
                                                                            container={activeContainer}
                                                                            deleteContainer={deleteContainer}
                                                                            deleteItem={deleteItem}
                                                                            handleQuantityChange={handleQuantityChange}
                                                                            handleWeightChange={handleWeightChange}
                                                                            items={items.filter(
                                                                                (item) => item.containerId === activeContainer.id
                                                                            )}
                                                                        />
                                                                    )}
                                                                    {activeItem && (
                                                                        <ItemCard item={activeItem} deleteItem={deleteItem} />
                                                                    )}
                                                                </DragOverlay>,
                                                                document.body
                                                            )}
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            {!isStepDone && (
                                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                    <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                                    <SaveButton text={t('TEXT.NEXT')}  /*disabled={!isValid || !isActiveStep}*/ onClick={handleNextClicked}/>
                                                </Box>
                                            )}
                                        </BackgroundCard>
                                    </Box>
                                </Grid>
                            </Grid>
                    </DndContext>
                </div>
        </Box>
    )}
</form>
    );
};

export default TransportationShipment;