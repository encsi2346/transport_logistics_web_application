import create from 'zustand';

import { TransportationSteps } from '../enums/transportation-steps.ts';

interface TransportationState {
    currentStep: TransportationSteps;
    transportation: string[];
    loadedTransportation: string[];
    submitCarForm: () => void;
    submitDetailsForm: () => void;
    submitDriverForm: () => void;
    submitShipmentForm: () => void;
    submitOverviewForm: () => void;
    setCurrentStep: (currentStep: TransportationSteps) => void;
    setLoadedTransportation: (loadedTransportation: string[]) => void;
    setTransportation: () => void;
    resetStore: () => void;
}

export const useTransportationStore = create<TransportationState>((set) => ({
    currentStep: TransportationSteps.DRIVER,
    transportation: {},
    loadedTransportation: { canModifyBaseData: true },
    submitCarForm: () =>
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
        })),
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
    resetStore: () =>
        set(() => ({
            currentStep: TransportationSteps.CAR,
            transportation: {},
            loadedTransportation: { canModifyBaseData: true },
        })),
}));
