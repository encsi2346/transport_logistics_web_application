import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import {Box, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import DataCard from "../../components/layout/DataCard.tsx";
import Headline from "../../components/text/Headline.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const TransportationCarSelecting = ({ isEditing = false, isInputDisabled }: Props) => {
    return (
        <Box>
            <BackgroundCard>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <NormalText text={'Kiválasztott típus'} />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Box>
                <DataCard>
                    <Headline text={'Típus adatok'} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Kivitel'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Teljesítmény'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Saját tömeg'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Ülések száma'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Üzemanyag'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Hasznos teher'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                    </Box>
                </DataCard>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <NormalText text={'Kiválasztott autó'} />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Box>
                <DataCard>
                    <Headline text={'Egyéni adatok'} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Rendszám'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Forg.engedély száma'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Alvázszám'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Gyártási év'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Első nyilvántartásba vétel'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                    </Box>
                </DataCard>
                <Box sx={{ display: 'inline', paddingLeft: 142}}>
                    <CancelButton text={'Mégsem'} />
                    <SaveButton text={'Mentés'} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default TransportationCarSelecting;