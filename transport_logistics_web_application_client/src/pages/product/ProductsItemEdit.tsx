import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import DataCard from "../../components/layout/DataCard.tsx";
import Headline from "../../components/text/Headline.tsx";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const ProductsItemEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    return (
        <Box>
            <PageHeader text={'Új áru felvétele'}/>
            <BackgroundCard>
                <DataCard>
                    <Headline text={'Áru adatok'} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Kategória neve'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Termék neve'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Cikkszám'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Vonalkód'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Önsúly'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={'Max. darabszám'} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={'Jelenlegi darabszám'} />
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

export default ProductsItemEdit;