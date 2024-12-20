import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useTypeSafeTranslation} from "../inputField/hooks/useTypeSafeTranslation";
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
    currentStep: number;
    setCurrentStep: (step: number) => void;
}
const StepperComponent = ({ currentStep, setCurrentStep }: Props) => {
    const { t } = useTypeSafeTranslation();
    const steps = [
        `${t('TRANSPORTATIONS.CAR')}`,
        `${t('TRANSPORTATIONS.ROADMAP')}`,
        `${t('TRANSPORTATIONS.DRIVER')}`,
        `${t('TRANSPORTATIONS.SHIPMENT')}`,
        `${t('TRANSPORTATIONS.OVERVIEW')}`
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
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
            setCurrentStep(activeStep + 1); // Pass the step change back to the parent component
        }
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