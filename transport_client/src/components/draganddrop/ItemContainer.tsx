import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import ItemCard from "./ItemCard";
import { Container, Item } from "../../pages/transportations/TransportationShipment";
import { Grid } from "@mui/material";
import { useTypeSafeTranslation } from "../inputField/hooks/useTypeSafeTranslation";

interface Props {
    container: Container;
    items: Item[];
}

const ItemContainer = ({
  container,
  items,
}: Props) => {
    const { t } = useTypeSafeTranslation();
    const [editMode, setEditMode] = useState(false);

    const itemsIds = useMemo(() => {
        return items.map((item) => item.id);
    }, [items]);

    const {
        setNodeRef,
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
                <Grid item container direction="column" sx={{ marginTop: 3, marginLeft: 3, gap: 2}}>
                    <SortableContext items={itemsIds}>
                        {items.map((item) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </SortableContext>
                </Grid>
        </div>
    );
}

export default ItemContainer;