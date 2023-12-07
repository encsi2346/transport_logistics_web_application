import {Fragment, ReactNode, useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useTypeSafeTranslation} from "../inputField/hooks/useTypeSafeTranslation.tsx";
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

const StepConnectorStyled = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        color: "#DD1C13",
        fontSize: '18px',
        fontWeight: 'bold',
        left: 'calc(-50% + 16px)',
        right: 'calc(-50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#DD1C13',
            borderStyle: 'dashed',
            borderWidth: 1
        },
        color: "#DD1C13",
        fontSize: '18px',
        fontWeight: 'bold',
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#DD1C13',
            borderWidth: 2
        },
        color: "#DD1C13",
        fontSize: '18px',
        fontWeight: 'bold',
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#A3A3A3',
        borderTopWidth: 3,
        borderWidth: 2,
        borderRadius: 1,
        color: "#DD1C13",
        fontSize: '18px',
        fontWeight: 'bold',
    },
}));

const StepIconRootStyled = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        display: 'flex',
        height: 25,
        alignItems: 'center',
        color: "#DD1C13",
        fontSize: '18px',
        fontWeight: 'bold',
        ...(ownerState.active && {
            color: '#DD1C13',
        }),
        '& .StepIcon-icon': {
            color: '#DD1C13',
            zIndex: 1,
            width: 25,
            height: 25,
            fontSize: '18px',
            fontWeight: 'bold',
        },
    }),
);

function StepIconStyled(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <StepIconRootStyled ownerState={{ active }} className={className}>
            {completed ? (
                <CheckCircleRoundedIcon className="StepIcon-icon" />
            ) : (
                <RadioButtonUncheckedRoundedIcon className="StepIcon-icon" />
            )}
        </StepIconRootStyled>
    );
}

interface Props {
    currentStep: number
}
const StepperComponent = ({ currentStep }: Props) => {
    const { t } = useTypeSafeTranslation();
    const steps = [
        `${t('TEXT.CAR')}`,
        `${t('TEXT.ROADMAP')}`,
        `${t('TEXT.DRIVER')}`,
        `${t('TEXT.SHIPMENT')}`,
        `${t('TEXT.OVERVIEW')}`
    ];
    const [activeStep, setActiveStep] = useState(currentStep);
    const [skipped, setSkipped] = useState(new Set<number>());

    useEffect(() => {
        setActiveStep(currentStep);
        console.log(currentStep);
    }, [currentStep]);

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} connector={<StepConnectorStyled />}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel StepIconComponent={StepIconStyled}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default StepperComponent;