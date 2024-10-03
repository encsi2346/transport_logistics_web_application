import {Box, Grid} from "@mui/material";
import NormalText from "../../components/text/NormalText";

const OrderTabDetails = () => {
    return (
        <Box>
            <Grid item container direction="column" spacing={2}>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Megrendelő'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Vik Kft.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2300 Debrecen'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Kiskikerics körút 12.'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Kapcsolattartó'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Kapcsolat Dániel'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'+36301112222'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'vikkft@email.hu'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Sofőr'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Sofőr Géza'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'+36301234567'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'sofor.geza@email.hu'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Jármű'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'MKP-111'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Fiat Ducato 256 Jet2.8'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Tervezett km'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'325 km'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Tervezett idő'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'8óra 12perc'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Szállítmány típusa'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'normál'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Megjegyzés'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'-'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Ár'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2511 euró'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Profit'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'800 euró'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Kiadás'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'700 euró'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderTabDetails;