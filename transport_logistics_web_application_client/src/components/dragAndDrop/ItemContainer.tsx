import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import ItemCard from "./ItemCard.tsx";
import { Container, Item } from "../../pages/transportation/TransportationShipment.tsx";
import { Grid } from "@mui/material";
import { useTypeSafeTranslation } from "../inputField/hooks/useTypeSafeTranslation.tsx";

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
        <div ref={setNodeRef} style={style} /* className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"*/>
            {/* Column task container <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto"> */}
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
            {/*</div>*/}
        </div>
    );
}

export default ItemContainer;