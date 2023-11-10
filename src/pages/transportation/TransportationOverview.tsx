import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import DataCard from "../../components/layout/DataCard.tsx";
import Headline from "../../components/text/Headline.tsx";
import {Box, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";

const TransportationOverview = () => {
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
                <DataCard>
                    <Headline text={'Indulási adatok'} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Ország'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Irányítószám'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Település'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Közterület neve'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Közterület jellege'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Házszám'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Indulási dátum'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Indulási időpont'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                    </Box>
                </DataCard>
                <DataCard>
                    <Headline text={'Érkezési adatok'} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Ország'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Irányítószám'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Település'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Közterület neve'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Közterület jellege'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Házszám'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Érkezés dátum'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Érkezés időpont'} />
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

export default TransportationOverview;