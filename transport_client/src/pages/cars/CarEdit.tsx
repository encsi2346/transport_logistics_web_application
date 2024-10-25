import PageHeader from "../../components/text/PageHeader";
import BackgroundCard from "../../components/layout/BackgroundCard";
import {Box, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import DataCard from "../../components/layout/DataCard";
import Headline from "../../components/text/Headline";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "@/pages/car-types/schemas/car-type-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {carEditFormSchema, CarEditFormSchema} from "@/pages/cars/schemas/car-edit-form-schema";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const CarEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [t, i18n] = useTranslation();

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<CarEditFormSchema>({
        defaultValues: {
            carId: '',
            name: '',
            type: '',
            licencePlate: '',
            numberOfRegistrationLicence: null,
            chassisNumber: null,
            yearOfProduction: null,
            dateOfFirstRegistration: null,
            images: null,
            dateOfDatabaseRegistration: null,
            dateOfLastTechnicalExamination: null,
            dateOfLastService: null,
            totalDrivenKm: null,
            totalTransport: null,
        },
        resolver: zodResolver(carEditFormSchema(isEditing)),
        mode: 'all',
    });

    const getCar = async (id: string) => {
        try {
            const getCarResponse = await fetch(
                `http://localhost:3001/api/cars/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getCarData = await getCarResponse.json();
            const getStatus = getCarResponse.status;
            console.log('getCarData', getCarData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
        } catch (error) {
            console.error('Error get car:', error);
        }
    }

    const createCar = async (data: any) => {
        try {
            const createCarResponse = await fetch(
                `http://localhost:3001/api/cars/addCar`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getCarData = await createCarResponse.json();
            const getStatus = createCarResponse.status;
            console.log('getCarData', getCarData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getCarData;
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };

    const updateCarType = async (id: string, data: any) => {
        try {
            const updatedCarResponse = await fetch(
                `http://localhost:3001/api/cars/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getCarData = await updatedCarResponse.json();
            const getStatus = updatedCarResponse.status;
            console.log('getCarData', getCarData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getCarData;
        } catch (error) {
            console.error(`Error updating car with ID ${id}:`, error);
        }
    };

    const deleteCar = async (id: string) => {
        //TODO
        try {
            const deleteCarResponse = await fetch(
                `http://localhost:3001/api/cars/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getCarData = await deleteCarResponse.json();
            const getStatus = deleteCarResponse.status;
            console.log('getCarTypeData', getCarData);
            console.log('getUserStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getCarData;
        } catch (error) {
            console.error(`Error deleting car with ID ${id}:`, error);
        }
    };

    useEffect(() => {
        getCar(id);
    }, [id]);

    return (
        <Box>
            <PageHeader text={t('CAR.NEW_CAR')}/>
            <BackgroundCard>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <NormalText text={t('CAR.SELECTED_CAR_TYPE')} />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Box>
                <DataCard>
                    <Headline text={t('CAR_TYPES.CAR_TYPE_DATA')} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={t('CAR_TYPES.CAR_FUNCTIONAL_DESIGN')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR_TYPES.PERFORMANCE')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR_TYPES.OWN_WEIGHT')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={t('CAR_TYPES.NUMBER_OF_SEATS')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR_TYPES.FUEL')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR_TYPES.USEFUL_WEIGHT')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                    </Box>
                </DataCard>
                <DataCard>
                    <Headline text={t('CAR.CAR_DATA')} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={t('CAR.LICENCE_PLATE')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR.FORG')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR.ALVAZ')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <NormalText text={t('CAR.PRODUCTION_YEAR')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            <NormalText text={t('CAR.FIRST_REG')} />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </Box>
                    </Box>
                </DataCard>

                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                    <SaveButton text={t('TEXT.SAVE')} onClick={() => console.log('save car')} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default CarEdit;