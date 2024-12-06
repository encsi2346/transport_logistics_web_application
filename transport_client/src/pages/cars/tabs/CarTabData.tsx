import {
    Box,
    Grid, SxProps, Theme, Tooltip, Typography,
} from "@mui/material";
import CancelButton from "../../../components/button/CancelButton";
import SaveButton from "../../../components/button/SaveButton";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import NormalText from "../../../components/text/NormalText";
import {useNavigate, useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {carEditFormSchema, CarEditFormSchema} from "../schemas/car-edit-form-schema";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import axios from "axios";
import UniqueIconButton from "../../../components/button/UniqueIconButton";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";

function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#A3A3A3',
}

const normalTextStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#000000',
    paddingTop: 1
}

const paramTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#A3A3A3',
    paddingTop: 5
}

const iconStyle: SxProps<Theme> = {
    fontSize: 100,
    color: '#A3A3A3',
    marginLeft: '40px',
    marginRight: '40px',
    marginTop: '20px',
    marginBottom: '10px',
}

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const CarTabData = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const car = useSelector((state) => state.car);
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [isProfilePage, setIsProfilePage] = useState(true);
    const [t, i18n] = useTranslation();
    const [image, setImage] = useState({ image : "", userId: null, carId: id, productId: null });
    const [allImage, setAllImage] = useState(null);


    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<CarEditFormSchema>({
        defaultValues: {
        },
        resolver: zodResolver(carEditFormSchema(isEditing)),
        mode: 'all',
    });

    const onSubmit = handleSubmit((data) => {
        let submitData = data as any;
    }, (errors) => {console.log(errors)});

    const handleEditClicked = () => {
        setInputDisabled(!inputDisabled);
    };

    //TODO: common image handling
    const getImage = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/get-image", {
                params: {
                    carId: id, // Pass userId as a query parameter
                },
            });
            setAllImage(response.data.data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const updateImage = async (updatedImage) => {
        try {
            await axios.put('http://localhost:3001/api/update-image', updatedImage);
            console.log("Image updated successfully");
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };

    const deleteImage = async () => {
        try {
            // Send a DELETE request with the userId as a query parameter
            await axios.delete("http://localhost:3001/api/delete-image", {
                params: {
                    carId: id,
                },
            });
            console.log("Image deleted successfully");
            setAllImage(null); // Optionally, clear the image state after deletion
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };



    const handleSubmitImage = (e) => {
        e.preventDefault();
        updateImage(image);
        console.log("Uploaded");
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setImage({ ...image, image : base64, carId: id });
    }

    const handleDeleteImage = (e) => {
        e.preventDefault();
        deleteImage();
    };


    useEffect(() => {
        getImage();
    }, []);

    useEffect(() => {
        console.log('car', id);
    }, [id]);

    useEffect(() => {
        console.log('allimages', allImage);
    }, [allImage]);


    return (
        <Box sx={{paddingTop: 7, paddingLeft: 5}}>
            <Grid container spacing={12}>
                {/* First Column */}
                <Grid item xs={12} md={4}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.BRAND')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'Fiat Ducato'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.TYPE')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'Maxi 250 L3H2 2.3 MJet 3.5'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.LICENCE_PLATE')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'ABC-123'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.CAR_FUNCTIONAL_DESIGN')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'Kisbusz'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.FUEL')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'gázolaj'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.PRODUCTION_YEAR')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'2023'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{`${t('CAR.NUMBER_OF_SEATS')}`}</Typography>
                                <Typography sx={normalTextStyle}>{'6'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Teljesítmény'}</Typography>
                                <Typography sx={normalTextStyle}>{'55 kW, 75 LE'}</Typography>
                            </Box>
                        </Grid>

                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Saját teher'}</Typography>
                                <Typography sx={normalTextStyle}>{'1790 kg'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Hasznos teher'}</Typography>
                                <Typography sx={normalTextStyle}>{'900 kg'}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={4}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Vontatás'}</Typography>
                                <Typography sx={normalTextStyle}>{'420 kg'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Raktér'}</Typography>
                                <Typography sx={normalTextStyle}>{'150 *200*300 cm'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Forgalmi engedély száma'}</Typography>
                                <Typography sx={normalTextStyle}>{'123456789'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Alvázszám'}</Typography>
                                <Typography sx={normalTextStyle}>{'12345678PA'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Első nyilvántartásba vétel'}</Typography>
                                <Typography sx={normalTextStyle}>{'2023.01.01.'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Adatbázis regisztráció'}</Typography>
                                <Typography sx={normalTextStyle}>{'2023.01.01.'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Legutóbbi műszaki vizsga időpontja'}</Typography>
                                <Typography sx={normalTextStyle}>{'2023.01.01.'}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'block', gap: 5}}>
                                <Typography sx={paramTextStyle}>{'Legutóbbi szervíz időpontja'}</Typography>
                                <Typography sx={normalTextStyle}>{'2023.11.24.'}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={4}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#ffffff',
                                    width: 250,
                                    height: 250,
                                    borderRadius: 4,
                                    cursor: 'pointer'
                                }}
                            >
                                <Box>
                                    <form onSubmit={handleSubmitImage}>
                                        <Box sx={{display: 'flex', marginBottom: '10px'}}>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#ffffff',
                                                width: 250,
                                                height: 250,
                                                borderRadius: 4,
                                                cursor: 'pointer'
                                            }}>
                                                {allImage?.length > 0 ? (
                                                    <img
                                                        src={allImage?.length > 0 ? (image.image || allImage[0]?.image) : ""}
                                                        alt=""
                                                        height={150}
                                                        width={150}
                                                    />
                                                ) : (
                                                    <PhotoLibraryIcon sx={iconStyle}/>
                                                )}
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <Box sx={{display: 'flex', marginBottom: '10px'}}>
                                                    <Tooltip title={t('TEXT.SAVE')}>
                                                        <UniqueIconButton
                                                            type='submit'
                                                            icon={<UploadIcon sx={{width: '50px'}}/>}
                                                            color='#ffffff'
                                                            backgroundColor='#A3A3A3'
                                                        />
                                                    </Tooltip>
                                                </Box>
                                                <Box sx={{display: 'flex'}}>
                                                    <Tooltip title={t('TEXT.REMOVE_IMAGE')}>
                                                        <UniqueIconButton
                                                            onClick={handleDeleteImage}
                                                            icon={<DeleteIcon sx={{width: '50px'}}/>}
                                                            color='#A3A3A3'
                                                            backgroundColor='#dadada'
                                                        />
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <input
                                            type="file"
                                            name="myFile"
                                            id='file-upload'
                                            accept='.jpeg, .png, .jpg'
                                            onChange={(e) => handleFileUpload(e)}
                                        />
                                    </form>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <CancelButton text={t('TEXT.BACK')} onClick={() => navigate(-1)}/>
                <SaveButton text={t('TEXT.SAVE')} onClick={onSubmit}/>
            </Box>
        </Box>
    );
};

export default CarTabData;