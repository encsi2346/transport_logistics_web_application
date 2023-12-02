import PageHeader from "../../components/text/PageHeader.tsx";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import DataCard from "../../components/layout/DataCard.tsx";
import Headline from "../../components/text/Headline.tsx";
import {Box, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";

const CarTypeEdit = () => {
    return (
        <Box>
            <PageHeader text={'Új autótípus hozzáadása'}/>
            <BackgroundCard>
                <DataCard>
                    <Headline text={'Típus adatok'} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Típus neve'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
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
                <Box sx={{ display: 'inline', paddingLeft: 142}}>
                    <CancelButton text={'Mégsem'} />
                    <SaveButton text={'Tovább'} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default CarTypeEdit;