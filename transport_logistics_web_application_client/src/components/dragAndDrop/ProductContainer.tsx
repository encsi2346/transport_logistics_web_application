import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import ItemCard from "./ItemCard.tsx";
import {Container, Id, Item} from "../../pages/transportations/TransportationShipment.tsx";
import {Box, Grid} from "@mui/material";

interface Props {
    container: Container;
    deleteContainer: (id: Id) => void;
    deleteItem: (id: Id) => void;
    items: Item[];
}

const ProductContainer = ({
     container,
     deleteContainer,
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
            <div ref={setNodeRef} style={style} />
        );
    }

    return (
        <div ref={setNodeRef} style={style} >
            <Grid item xs={4} md={3}>
                <Box sx={{ display: "block", width: 170, height: 120, borderRadius: '4px', backgroundColor: '#4d4d4d', marginTop: 4, marginBottom: 1, marginLeft: 2}}>
                    <div {...attributes} {...listeners} >
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