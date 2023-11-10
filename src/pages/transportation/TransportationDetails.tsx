import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import {Box, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";

const TransportationDetails = () => {
    return (
        <Box>
            <BackgroundCard>
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
                <DataCard>
                    <Headline text={'Rakodási pont hozzáadása'} />
                </DataCard>
                <Box sx={{ display: 'inline', paddingLeft: 142}}>
                    <CancelButton text={'Mégsem'} />
                    <SaveButton text={'Mentés'} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default TransportationDetails;