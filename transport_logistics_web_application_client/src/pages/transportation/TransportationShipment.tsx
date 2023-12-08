import {Box, Grid, Typography} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useNavigate} from "react-router-dom";
import {TransportationSteps} from "./enums/transportation-steps.ts";
import {useTransportationStore} from "./stores/useTransportationStore.tsx";
import useTransportationShipment from "./hooks/useTransportationShipment.tsx";
import SelectInput from "../../components/inputField/SelectInput.tsx";
import {useEffect, useMemo, useState} from "react";
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
import ItemCard from "../../components/dragAndDrop/ItemCard.tsx";
import ProductContainer from "../../components/dragAndDrop/ProductContainer.tsx";
import PlusIcon from '@mui/icons-material/Add';
import "../../App.css";
import ItemContainer from "../../components/dragAndDrop/ItemContainer.tsx";

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

const TransportationShipment = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [productCategories, setProductCategories] = useState([
        {
            label: `${t('TEXT.CATEGORY1')}`,
            value: 1
        },
        {
            label: `${t('TEXT.CATEGORY2')}`,
            value: 2
        },
        {
            label: `${t('TEXT.CATEGORY3')}`,
            value: 2
        }
    ]);
    const thisStep = TransportationSteps.SHIPMENT;
    const currentStep = useTransportationStore((state) => state.currentStep);
    const isStepDone = currentStep > thisStep;
    const isActiveStep = thisStep === currentStep;

    const setCurrentStep = useTransportationStore((state) => state.setCurrentStep);
    const loadedTransportation = useTransportationStore((state) => state.loadedTransportation);

    const { control, isValid, preValidationError, onSubmit} = useTransportationShipment();

    const handleCancelClicked = () => {
        navigate('..');
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
    ]);
    const containersId = useMemo(() => containers.map((con) => con.id), [containers]);
    const [items, setItems] = useState<Item[]>([
        {
            id: "1",
            containerId: "itemContainer",
            productName: "Termék0",
            amountOfProduct: "1200/836",
        },
        {
            id: "2",
            containerId: "itemContainer",
            productName: "Termék1",
            amountOfProduct: "1200/836",
        },
        {
            id: "3",
            containerId: "itemContainer",
            productName: "Termék2",
            amountOfProduct: "1200/836",
        },
        {
            id: "4",
            containerId: "itemContainer",
            productName: "Termék3",
            amountOfProduct: "1200/836",
        },
        {
            id: "5",
            containerId: "itemContainer",
            productName: "Termék4",
            amountOfProduct: "1200/836",
        },
        {
            id: "6",
            containerId: "itemContainer",
            productName: "Termék5",
            amountOfProduct: "1200/836",
        },
        {
            id: "7",
            containerId: "itemContainer",
            productName: "Termék6",
            amountOfProduct: "1200/836",
        },
        {
            id: "8",
            containerId: "itemContainer",
            productName: "Termék8",
            amountOfProduct: "1200/836",
        },
    ]);

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

        // Im dropping a Task over another Task
        if (isActiveItem && isOverItem) {
            setItems((item) => {
                const activeIndex = items.findIndex((t) => t.id === activeId);
                const overIndex = items.findIndex((t) => t.id === overId);

                if (items[activeIndex].containerId != items[overIndex].containerId) {
                    // Fix introduced after video recording
                    items[activeIndex].containerId = items[overIndex].containerId;
                    return arrayMove(items, activeIndex, overIndex - 1);
                }

                return arrayMove(items, activeIndex, overIndex);
            });
        }

        const isOverContainer = over.data.current?.type === "Container";

        // Im dropping a Task over a column
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
        /* Generate a random number between 0 and 10000 */
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
    /*const removedContainer = containers.filter((con) => con.id === id);
    console.log('removedContainer', removedContainer);
    const removedItems = items.filter((i) => i.containerId === removedContainer);
    console.log('removedItems', removedItems);
    const allItems = [...items, ...removedItems];
    setItems(allItems);
    console.log('allItems', allItems);*/

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

    return (
        <form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box sx={{ display: 'flex'}}>
                    <div /*className=" m-auto flex min-h-screen w-full items-center  overflow-x-auto overflow-y-hidden  px-[40px]"*/>
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
                                            <SelectInput
                                                label={t('TEXT.PRODUCT_CATEGORY')}
                                                control={control}
                                                name='productCategory'
                                                data-testid='product-category-input'
                                                options={productCategories}
                                                required
                                                InputProps={{
                                                    sx: {
                                                        '.MuiSelect-icon': {
                                                            display: 'none',
                                                        },
                                                    },
                                                }}
                                            />

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
                                                            {/*<div className="m-auto flex gap-4">
                                                                <div className="flex gap-4">*/}
                                                                    <SortableContext items={containersId}>
                                                                        {containers.map((con) => (
                                                                            <ProductContainer
                                                                                key={con.id}
                                                                                container={con}
                                                                                deleteContainer={deleteContainer}
                                                                                deleteItem={deleteItem}
                                                                                items={items.filter((item) => item.containerId === con.id)}
                                                                            />
                                                                        ))}
                                                                    </SortableContext>
                                                            {/*</div>*/}
                                                            {/* <button onClick={() => {createNewContainer()}}>
                                                                    <PlusIcon />
                                                                    Add Column
                                                                </button>*/}
                                                            {/*</div>*/}

                                                            {createPortal(
                                                                <DragOverlay>
                                                                    {activeContainer && (
                                                                        <ProductContainer
                                                                            container={activeContainer}
                                                                            deleteContainer={deleteContainer}
                                                                            deleteItem={deleteItem}
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
                                                <Box sx={{ display: 'block', paddingLeft: 95, marginTop: 13, marginBottom: -3}}>
                                                    <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                                    <SaveButton text={t('TEXT.NEXT')}  disabled={!isValid || !isActiveStep} onClick={onSubmit}/>
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
 /*<form autoComplete='off' noValidate onSubmit={(e) => e.preventDefault()}>
            {isActiveStep && (
                <Box>
                        <Grid item container direction="row">
                            <Grid item xs={4} md={3}>
                                <Box sx={{ width: 300, height: 500}}>
                                    <BackgroundCard>
                                        <SelectInput
                                            label={t('TEXT.PRODUCT_CATEGORY')}
                                            control={control}
                                            name='productCategory'
                                            data-testid='product-category-input'
                                            options={productCategories}
                                            required
                                            InputProps={{
                                                sx: {
                                                    '.MuiSelect-icon': {
                                                        display: 'none',
                                                    },
                                                },
                                            }}
                                        />
                                    </BackgroundCard>
                                    <Grid item container direction="column" sx={{ marginTop: -53, marginLeft: 7}}>
                                        <Grid item xs={4} md={3}>
                                            <Box sx={{ width: 190, height: 60, borderRadius: '17px', backgroundColor: '#c8c8c8'}}>
                                                <Box sx={{ width: 15, height: 15, backgroundColor: '#07ea00', borderRadius: '30px', marginLeft: 2}}/>
                                                <Typography sx={{ marginLeft: 7, marginTop: 0}}>Termék1</Typography>
                                                <Typography sx={{ marginLeft: 7, marginTop: 0, fontSize: 9}}>1200/836</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <Box sx={{ width: 190, height: 60, borderRadius: '17px', backgroundColor: '#c8c8c8'}}>
                                                <Box sx={{ width: 15, height: 15, backgroundColor: '#07ea00', borderRadius: '30px', marginLeft: 2}}/>
                                                <Typography sx={{ marginLeft: 7, marginTop: 0}}>Termék3</Typography>
                                                <Typography sx={{ marginLeft: 7, marginTop: 0, fontSize: 9}}>1200/836</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <Box sx={{ width: 190, height: 60, borderRadius: '17px', backgroundColor: '#c8c8c8'}}>
                                                <Box sx={{ width: 15, height: 15, backgroundColor: '#07ea00', borderRadius: '30px', marginLeft: 2}}/>
                                                <Typography sx={{ marginLeft: 7, marginTop: 0}}>Termék3</Typography>
                                                <Typography sx={{ marginLeft: 7, marginTop: 0, fontSize: 9}}>1200/836</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <Box sx={{ width: 190, height: 60, borderRadius: '17px', backgroundColor: '#c8c8c8'}}>
                                                <Box sx={{ width: 15, height: 15, backgroundColor: '#07ea00', borderRadius: '30px', marginLeft: 2}}/>
                                                <Typography sx={{ marginLeft: 7, marginTop: 0}}>Termék4</Typography>
                                                <Typography sx={{ marginLeft: 7, marginTop: 0, fontSize: 9}}>1200/836</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={9}>
                                <Box sx={{ width: 1140, height: 500, marginLeft: -7, display: 'grid'}}>
                                    <BackgroundCard>
                                        <Grid item container direction="row" sx={{ marginTop: 5, marginLeft: 15}}>
                                            <Grid item xs={4} md={3} sx={{ marginRight: -8}}>
                                                <Box sx={{ width: 200, height: 350, backgroundColor: '#9e9e9e'}}>
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
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} md={6}>
                                                        <Box sx={{ width: 600, height: 350, backgroundColor: '#9e9e9e', borderColor: '#ff0000', borderStyle: 'dashed', borderWidth: 3}}>
                                                            <Grid item container direction="row">
                                                                <Grid item xs={4} md={3}>
                                                                    <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 5, marginBottom: 1, marginLeft: 2, display: 'flex'}}>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={4} md={3}>
                                                                    <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 5, marginBottom: 1, marginLeft: 6, display: 'flex'}}>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={4} md={3}>
                                                                    <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 5, marginBottom: 1, marginLeft: 10, display: 'flex'}}>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item container direction="row">
                                                                <Grid item xs={4} md={3}>
                                                                    <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 2, marginBottom: 1, marginLeft: 2, display: 'flex'}}>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={4} md={3}>
                                                                    <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 2, marginBottom: 1, marginLeft: 6, display: 'flex'}}>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item xs={4} md={3}>
                                                                    <Box sx={{ width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 2, marginBottom: 1, marginLeft: 10, display: 'flex'}}>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                        <Box sx={{ width: 50, height: 20, backgroundColor: '#cccccc', marginLeft: 3, marginTop: 11}}/>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                             </Grid>
                                        </Grid>
                                        {!isStepDone && (
                                            <Box sx={{ display: 'block', paddingLeft: 95, marginTop: 3, marginBottom: -3}}>
                                                <CancelButton text={t('TEXT.BACK')} disabled={!isActiveStep} onClick={handleCancelClicked}/>
                                                <SaveButton text={t('TEXT.NEXT')}  disabled={!isValid || !isActiveStep} onClick={onSubmit}/>
                                            </Box>
                                        )}
                                    </BackgroundCard>
                                </Box>
                            </Grid>
                        </Grid>
                    </DndContext>
         </Box>
            )}
        </form>*/
    );
};

export default TransportationShipment;