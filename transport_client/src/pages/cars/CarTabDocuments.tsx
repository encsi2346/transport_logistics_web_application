import {Box, Grid} from "@mui/material";
import NormalText from "../../components/text/NormalText";

const CarTabDocuments = () => {

    return (
        <Box>
            <Grid item container direction="column" spacing={2}>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={20}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Forgalmi engedély másolat'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024_01_30_Vik_kft_fuvarlevél.docsx'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.28 15:30'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Feltöltve'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={''} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6}  columns={20}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Műszaki vizsga'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Feltöltés'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'-'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Hiányzik'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Új vizsga'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CarTabDocuments;