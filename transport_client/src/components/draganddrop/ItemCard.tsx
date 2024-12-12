import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {Id, Item} from "@/pages/transportations/TransportationShipment";
import {Box, Grid, Tooltip, Typography} from "@mui/material";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import UniqueIconButton from "../button/UniqueIconButton";
import {useTypeSafeTranslation} from "../inputfield/hooks/useTypeSafeTranslation";

interface Props {
    item: Item;
    deleteItem: (id: Id) => void;
}

const ItemCard = ({ item, deleteItem }: Props) => {
    const { t } = useTypeSafeTranslation();
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
                <Box sx={{
                    width: 230,
                    height: 80,
                    borderRadius: '17px',
                    backgroundColor: '#c8c8c8',
                    background: 'transparent',
                    border: '2px solid rgba(255, 255, 255, .2)',
                    backdropFilter: 'blur(30px)',
                    boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                    cursor: 'pointer',
                    position: 'relative', // Ensure the circles are behind the card content
                    zIndex: 1, // Set a higher z-index for the card itself
                    overflow: 'hidden',
                    '&:hover': {
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                    },
                }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '0px',
                            left: '10px',
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            backgroundColor: '#e3e3e3',
                            filter: 'blur(30px)',
                            zIndex: -1,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '100px',
                            right: '-40px',
                            width: '130px',
                            height: '130px',
                            borderRadius: '50%',
                            backgroundColor: '#c4c4c4',
                            filter: 'blur(50px)',
                            zIndex: -1,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '110px',
                            right: '40px',
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            backgroundColor: '#e3e3e3',
                            filter: 'blur(30px)',
                            zIndex: -1,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '80px',
                            right: '190px',
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            backgroundColor: '#e3e3e3',
                            filter: 'blur(60px)',
                            zIndex: -1,
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'start',
                        marginTop: 2
                    }}>
                        <Box sx={{
                            width: 15,
                            height: 15,
                            backgroundColor: '#07ea00',
                            borderRadius: '30px',
                            marginLeft: 2
                        }}/>

                        <Typography sx={{ marginLeft: 2, marginTop: 0}}>{item.productName}</Typography>
                        <Typography sx={{ marginLeft: 2, marginTop: 0, fontSize: 9}}>{item.amountOfProduct}</Typography>

                        {mouseIsOver && (
                            <Tooltip title={t('TEXT.REMOVE_ITEM')}>
                                <UniqueIconButton
                                    onClick={() => {
                                        deleteItem(item.id);
                                    }}
                                    width={32}
                                    icon={<ClearRoundedIcon sx={{width: 25, height: 25}} /> }/>
                            </Tooltip>
                        )}
                    </Box>
                </Box>
            </Grid>
        </div>
    );
}

export default ItemCard;