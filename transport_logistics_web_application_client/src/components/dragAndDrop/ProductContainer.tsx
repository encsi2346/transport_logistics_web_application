import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import ItemCard from "./ItemCard.tsx";
import {Container, Id, Item} from "../../pages/transportation/TransportationShipment.tsx";
import {Box, Grid} from "@mui/material";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface Props {
    container: Container;
    deleteContainer: (id: Id) => void;
   // updateContainer: (id: Id, title: string) => void;
    deleteItem: (id: Id) => void;
    items: Item[];
}

const ProductContainer = ({
     container,
     deleteContainer,
     //updateContainer,
     items,
     deleteItem
 }: Props) => {
    const [editMode, setEditMode] = useState(false);

    const itemsIds = useMemo(() => {
        return items.map((item) => item.id);
    }, [items]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: container.id,
        data: {
            type: "Container",
            container,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                /*className="bg-columnBackgroundColor opacity-40 border-2 border-pink-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"*/
            />
        );
    }

    return (
        <div ref={setNodeRef} style={style} /*className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"*/>
            {/*<Box onClick={() => {deleteContainer(container.id)}} sx={{ width: 20, height: 20, marginBottom: -6, marginLeft: 20}}>
                <ClearRoundedIcon sx={{ color: '#ff0000', width: 19, height: 19}}/>
            </Box>*/}
            <Grid item xs={4} md={3}>
                <Box sx={{ display: "block", width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 4, marginBottom: 1, marginLeft: 2}}>
                    <div {...attributes} {...listeners} /*className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between" */>
                        <SortableContext items={itemsIds}>
                            {items.map((item) => (
                                <Box sx={{ marginLeft: 1, paddingLeft: -3, paddingTop: 2 }}>
                                    <ItemCard
                                        key={item.id}
                                        item={item}
                                        deleteItem={deleteItem}
                                    />
                                </Box>
                            ))}
                        </SortableContext>
                    </div>
                    {/*TODO*/}
                    <Box sxx={{ display: 'flex'}}>
                        <Box sx={{ display: 'flex', width: 50, height: 20, borderRadius: '5px', backgroundColor: '#cccccc', marginLeft: 3, marginTop: 2 }}/>
                        <Box sx={{ display: 'flex', width: 50, height: 20, borderRadius: '5px', backgroundColor: '#cccccc', marginLeft: 12, marginTop: -2}}/>
                    </Box>
                </Box>
            </Grid>
        </div>
    );
}

export default ProductContainer;