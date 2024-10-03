import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {Id, Item} from "@/pages/transportations/TransportationShipment";
import {Box, Grid, Typography} from "@mui/material";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface Props {
    item: Item;
    deleteItem: (id: Id) => void;
}

const ItemCard = ({ item, deleteItem }: Props) => {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item.id,
        data: {
            type: "Item",
            item,
        },
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
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
             onMouseEnter={() => {
                 setMouseIsOver(true);
             }}
             onMouseLeave={() => {
                 setMouseIsOver(false);
             }}
        >
            <Grid item xs={4} md={3}>
                <Box sx={{ width: 158, height: 60, borderRadius: '17px', backgroundColor: '#c8c8c8'}}>
                    <Box sx={{ width: 15, height: 15, backgroundColor: '#07ea00', borderRadius: '30px', marginLeft: 2}}/>

                    <Typography sx={{ marginLeft: 6, marginTop: 0}}>{item.productName}</Typography>
                    <Typography sx={{ marginLeft: 6, marginTop: 0, fontSize: 9}}>{item.amountOfProduct}</Typography>

                    {mouseIsOver && (
                        <button
                            onClick={() => {
                                deleteItem(item.id);
                            }}
                            className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
                        >
                            <ClearRoundedIcon />
                        </button>
                    )}
                </Box>
            </Grid>
        </div>
    );
}

export default ItemCard;