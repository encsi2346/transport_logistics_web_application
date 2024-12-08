import create from 'zustand';

import { TransportationSteps } from '../enums/transportation-steps';

interface TransportationState {
    currentStep: TransportationSteps;
    transportation: any; //string[];
    loadedTransportation: any; //string[];
    setCurrentStep: (currentStep: TransportationSteps) => void;
    setLoadedTransportation: (loadedTransportation: string[]) => void;
    setTransportation: (data: Partial<TransportationState>) => void;
    resetTransportation: () => void;
    transportationId: '',
    //carselector
    selectedTypeOfTransportationId: '',
    selectedCarTypeId: '',
    /*selectedCarBrand: '',
    selectedCarTypeTypeName: '',
    selectedCarTypeDesign: '',
    selectedCarTypePerformance: '',
    selectedCarTypeSelfWeight: 0,
    selectedCarTypeUsefulWeight: 0,
    selectedCarTypeNumberOfSeats: 0,
    selectedCarTypeFuel: '',
    selectedCarTypeTowing: 0,
    selectedCarTypeHeight: 0,
    selectedCarTypeWidth: 0,
    selectedCarTypeLong: 0,
    selectedCarTypeTransportationId: '',*/
    selectedCarId: '',
    /*selectedCarName: '',
    selectedCarType: '',
    selectedCarLicencePlate: '',
    selectedCarNumberOfRegistrationLicence: '',
    selectedCarChassisNumber: '',
    selectedCarYearOfProduction: '',
    selectedCarDateOfFirstRegistration: '',
    selectedCarDateOfDatabaseRegistration: '',
    selectedCarDateOfLastTechnicalExamination: '',
    selectedCarDateOfLastService: '',
    selectedCarTotalDrivenKm: 0,
    selectedCarTotalTransport: 0,
    selectedCarImage: '',*/
    //cardetails
    departureDockingPointId: '',
    /*departureCountry: '',
    departurePostcode: '',
    departureCity: '',
    departureNameOfPublicArea: '',
    departureTypeOfPublicArea: '',
    departureHouseNumber: '',
    departureDate: '',
    departureTime: '',
    departureDestinationDate: '',
    departureDestinationTime: '',
    departureIsItOwnLocation: '',
    departureDriverId: '',
    departureDriverName: '',
    departurePassengers: '',*/
    arrivalDockingPointId: '',
    /*arrivalCountry: '',
    arrivalPostcode: '',
    arrivalCity: '',
    arrivalNameOfPublicArea: '',
    arrivalTypeOfPublicArea: '',
    arrivalHouseNumber: '',
    arrivalDepartureDate: '',
    arrivalDepartureTime: '',
    arrivalDestinationDate: '',
    arrivalDestinationTime: '',
    arrivalIsItOwnLocation: '',
    arrivalDriverId: '',
    arrivalDriverName: '',
    arrivalPassengers: '',*/
    dockingPointIds: [],
    //cardriver
    selectedDriverId: '',
    selectedPassengers: [],
    //carshipment
    selectedProducts: [],
    totalWeightsOfSelectedProducts: '',
    //remove
    /*submitCarForm: () => void;
    submitDetailsForm: () => void;
    submitDriverForm: () => void;
    submitShipmentForm: () => void;
    submitOverviewForm: () => void;
    resetTransportation: () => void;
    setTransportation: (transportation: any) => void;
    resetStore: () => void;*/
}

export const useTransportationStore = create<TransportationState>((set) => ({
    currentStep: TransportationSteps.CAR,
    transportation: {},
    loadedTransportation: { canModifyBaseData: true },
    transportationId: '',
    //carselector
    selectedTypeOfTransportationId: '',
    selectedCarTypeId: '',
    /*selectedCarBrand: '',
    selectedCarTypeTypeName: '',
    selectedCarTypeDesign: '',
    selectedCarTypePerformance: '',
    selectedCarTypeSelfWeight: 0,
    selectedCarTypeUsefulWeight: 0,
    selectedCarTypeNumberOfSeats: 0,
    selectedCarTypeFuel: '',
    selectedCarTypeTowing: 0,
    selectedCarTypeHeight: 0,
    selectedCarTypeWidth: 0,
    selectedCarTypeLong: 0,
    selectedCarTypeTransportationId: '',*/
    selectedCarId: '',
    /*selectedCarName: '',
    selectedCarType: '',
    selectedCarLicencePlate: '',
    selectedCarNumberOfRegistrationLicence: '',
    selectedCarChassisNumber: '',
    selectedCarYearOfProduction: '',
    selectedCarDateOfFirstRegistration: '',
    selectedCarDateOfDatabaseRegistration: '',
    selectedCarDateOfLastTechnicalExamination: '',
    selectedCarDateOfLastService: '',
    selectedCarTotalDrivenKm: 0,
    selectedCarTotalTransport: 0,
    selectedCarImage: '',*/
    //cardetails
    departureDockingPointId: '',
    /*departureCountry: '',
    departurePostcode: '',
    departureCity: '',
    departureNameOfPublicArea: '',
    departureTypeOfPublicArea: '',
    departureHouseNumber: '',
    departureDate: '',
    departureTime: '',
    departureDestinationDate: '',
    departureDestinationTime: '',
    departureIsItOwnLocation: '',
    departureDriverId: '',
    departureDriverName: '',
    departurePassengers: '',*/
    arrivalDockingPointId: '',
    /*arrivalCountry: '',
    arrivalPostcode: '',
    arrivalCity: '',
    arrivalNameOfPublicArea: '',
    arrivalTypeOfPublicArea: '',
    arrivalHouseNumber: '',
    arrivalDepartureDate: '',
    arrivalDepartureTime: '',
    arrivalDestinationDate: '',
    arrivalDestinationTime: '',
    arrivalIsItOwnLocation: '',
    arrivalDriverId: '',
    arrivalDriverName: '',
    arrivalPassengers: '',*/
    dockingPointIds: [],
    //cardriver
    selectedDriverId: '',
    selectedPassengers: [],
    //carshipment
    selectedProducts: [],
    totalWeightsOfSelectedProducts: '',
    /*submitCarForm: () =>
        set((state) => ({
            ...state,
            currentStep: TransportationSteps.DETAILS,
            transportation: { ...state.transportation },
        })),
    submitDetailsForm: () =>
        set((state) => ({
            ...state,
            currentStep: TransportationSteps.DRIVER,
            transportation: { ...state.transportation }
        })),
    submitDriverForm: () =>
        set((state) => ({
            ...state,
            currentStep: TransportationSteps.SHIPMENT,
            transportation: { ...state.transportation },
        })),
    submitShipmentForm: () =>
        set((state) => ({
            ...state,
            currentStep: TransportationSteps.OVERVIEW,
            transportation: { ...state.transportation },
        })),
    submitOverviewForm: () =>
        set((state) => ({
            ...state,
            transportation: { ...state.transportation },
        })),*/
    setCurrentStep: (currentStep) =>
        set((state) => ({
            ...state,
            currentStep,
        })),
    setLoadedTransportation: (loadedTransportation) =>
        set((state) => ({
            ...state,
            loadedTransportation,
        })),
    setTransportation: (data) => set((state) => ({
        ...state,
        ...data
    })),
    resetTransportation: () => set({
        transportationId: '',
        //carselector
        selectedTypeOfTransportationId: '',
        selectedCarTypeId: '',
        /*selectedCarBrand: '',
        selectedCarTypeTypeName: '',
        selectedCarTypeDesign: '',
        selectedCarTypePerformance: '',
        selectedCarTypeSelfWeight: 0,
        selectedCarTypeUsefulWeight: 0,
        selectedCarTypeNumberOfSeats: 0,
        selectedCarTypeFuel: '',
        selectedCarTypeTowing: 0,
        selectedCarTypeHeight: 0,
        selectedCarTypeWidth: 0,
        selectedCarTypeLong: 0,
        selectedCarTypeTransportationId: '',*/
        selectedCarId: '',
        /*selectedCarName: '',
        selectedCarType: '',
        selectedCarLicencePlate: '',
        selectedCarNumberOfRegistrationLicence: '',
        selectedCarChassisNumber: '',
        selectedCarYearOfProduction: '',
        selectedCarDateOfFirstRegistration: '',
        selectedCarDateOfDatabaseRegistration: '',
        selectedCarDateOfLastTechnicalExamination: '',
        selectedCarDateOfLastService: '',
        selectedCarTotalDrivenKm: 0,
        selectedCarTotalTransport: 0,
        selectedCarImage: '',*/
        //cardetails
        departureDockingPointId: '',
        /*departureCountry: '',
        departurePostcode: '',
        departureCity: '',
        departureNameOfPublicArea: '',
        departureTypeOfPublicArea: '',
        departureHouseNumber: '',
        departureDate: '',
        departureTime: '',
        departureDestinationDate: '',
        departureDestinationTime: '',
        departureIsItOwnLocation: '',
        departureDriverId: '',
        departureDriverName: '',
        departurePassengers: '',*/
        arrivalDockingPointId: '',
        /*arrivalCountry: '',
        arrivalPostcode: '',
        arrivalCity: '',
        arrivalNameOfPublicArea: '',
        arrivalTypeOfPublicArea: '',
        arrivalHouseNumber: '',
        arrivalDepartureDate: '',
        arrivalDepartureTime: '',
        arrivalDestinationDate: '',
        arrivalDestinationTime: '',
        arrivalIsItOwnLocation: '',
        arrivalDriverId: '',
        arrivalDriverName: '',
        arrivalPassengers: '',*/
        dockingPointIds: [],
        //cardriver
        selectedDriverId: '',
        selectedPassengers: [],
        //carshipment
        selectedProducts: [],
        totalWeightsOfSelectedProducts: '',
    }),
    /*setTransportation: (transportation) =>
        set((state) => ({
            ...state,
            transportation,
        })),
    resetStore: () =>
        set(() => ({
            currentStep: TransportationSteps.CAR,
            transportation: {},
            loadedTransportation: { canModifyBaseData: true },
        })),*/
}));
