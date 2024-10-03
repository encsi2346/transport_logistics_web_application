import {Box, FormControl, Grid, MenuItem, Select, SelectChangeEvent, SxProps, Theme, Typography} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import {useState} from "react";
import NewExamButton from "@/components/button/NewExamButton";

const paramTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#A3A3A3',
}

const normalTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#000000',
}

const missingTypeStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#ffffff',
    backgroundColor: '#ff0000',
    borderRadius: 45,
    width: 120,
    textAlign: 'center',
    paddingTop: 1,
    paddingBottom: 1,
}

const uploadedTypeStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#ffffff',
    backgroundColor: '#23ef00',
    borderRadius: 45,
    width: 120,
    textAlign: 'center',
    paddingTop: 1,
    paddingBottom: 1,
}

const CarTabDocuments = () => {
    const [stateValue1, setStateValue1] = useState(null);
    const [stateValue2, setStateValue2] = useState(null);

    const handleChangeState1 = (event: SelectChangeEvent) => {
        setStateValue1(event.target.value as string);
    }

    const handleChangeState2 = (event: SelectChangeEvent) => {
        setStateValue2(event.target.value as string);
    }

    return (
        <Box sx={{paddingTop: 7, paddingLeft: 5}}>
            <Grid container spacing={12}>
                {/* First Column */}
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Typography sx={paramTextStyle}>{'Forgalmi engedély másolat'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Typography sx={normalTextStyle}>{'2024_01_30_Vik_kft_fuvarlevél.docsx'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Typography sx={normalTextStyle}>{'2024.01.28 15:30'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <FormControl>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    data-testid='select-language-input'
                                    value={stateValue1}
                                    onChange={handleChangeState1}
                                    defaultValue={"missing"}
                                    //TODO: original border remove
                                    renderValue={(value) =>
                                        value === "missing" ? (
                                            <Box sx={missingTypeStyle}>Hiányzik</Box>
                                        ) : (
                                            <Box sx={uploadedTypeStyle}>Feltöltve</Box>
                                        )
                                    }
                                >
                                    <MenuItem value="missing">
                                        <Typography sx={missingTypeStyle}>Hiányzik</Typography>
                                    </MenuItem>
                                    <MenuItem value="uploaded">
                                        <Typography sx={uploadedTypeStyle}>Feltöltve</Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={12}>
                {/* Second Column */}
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Typography sx={paramTextStyle}>{'Műszaki vizsga'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Typography sx={normalTextStyle}>{'-'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Typography sx={normalTextStyle}>{'-'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <FormControl>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    data-testid='select-language-input'
                                    value={stateValue2}
                                    onChange={handleChangeState2}
                                    defaultValue={"missing"}
                                    renderValue={(value) =>
                                        value === "missing" ? (
                                            <Box sx={missingTypeStyle}>Hiányzik</Box>
                                        ) : (
                                            <Box sx={uploadedTypeStyle}>Feltöltve</Box>
                                        )
                                    }
                                >
                                    <MenuItem value="missing">
                                        <Typography sx={missingTypeStyle}>Hiányzik</Typography>
                                    </MenuItem>
                                    <MenuItem value="uploaded">
                                        <Typography sx={uploadedTypeStyle}>Feltöltve</Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <NewExamButton />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CarTabDocuments;