import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import ItemCard from "./ItemCard";
import {Container, Id, Item} from "@/pages/transportations/TransportationShipment";
import {Box, Grid, TextField} from "@mui/material";

interface Props {
    container: Container;
    deleteContainer: (id: Id) => void;
    deleteItem: (id: Id) => void;
    items: Item[];
    handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>, item: Item) => void;
    handleWeightChange: (event: React.ChangeEvent<HTMLInputElement>, item: Item) => void;
}

const ProductContainer = ({
      container,
      deleteContainer,
      items,
      deleteItem,
      handleQuantityChange,
      handleWeightChange
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
                <Box sx={{
                    display: "block",
                    width: 170,
                    height: 120,
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255,255,255,0.43)',
                    border: '2px solid rgba(255, 255, 255, .2)',
                    backdropFilter: 'blur(30px)',
                    boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                    marginTop: 4,
                    marginBottom: 1,
                    marginLeft: 2,
                    cursor: 'pointer'
                }}>
                    <div {...attributes} {...listeners} >
                        <SortableContext items={itemsIds}>
                            {items.map((item) => (
                                <Box key={item.id} sx={{ marginLeft: 1, paddingLeft: -3, paddingTop: 2 }}>
                                    <ItemCard
                                        key={item.id}
                                        item={item}
                                        deleteItem={deleteItem}
                                    />

                                    <Box sx={{ display: 'flex'}}>
                                        <Box sx={{
                                            display: 'flex',
                                            width: 50,
                                            height: 20,
                                            borderRadius: '5px',
                                            backgroundColor: '#cccccc',
                                            marginLeft: 3,
                                            marginTop: 2
                                        }}>
                                            <TextField
                                                label="Quantity"
                                                type="number"
                                                value={item.selectedNumberOfItems || ''}
                                                onChange={(e) => handleQuantityChange(e, item)}
                                                sx={{ width: '45%' }}
                                            />
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            width: 50,
                                            height: 20,
                                            borderRadius: '5px',
                                            backgroundColor: '#cccccc',
                                            marginLeft: 12,
                                            marginTop: -2
                                        }}>
                                            <TextField
                                                label="Weight"
                                                type="number"
                                                value={item.weightOfSelectedItems || ''}
                                                onChange={(e) => handleWeightChange(e, item)}
                                                sx={{ width: '45%' }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </SortableContext>
                    </div>
                </Box>
            </Grid>
        </div>
    );
}

export default ProductContainer;