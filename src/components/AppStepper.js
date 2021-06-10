import React from 'react'
import { Stepper, StepLabel, Step } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useStep } from '../contexts/StepContext/StepContext';

const useStyles = makeStyles((theme) => ({
  stepper: {
    boxSizing: 'border-box',
    padding: '35px 10px 20px'
  }
}));
const AppStepper = () => {
  const { currentStep, setStep, steps } = useStep()
  const classes = useStyles();

  return (
    <Stepper className={classes.stepper} activeStep={currentStep - 1} alternativeLabel>
      {steps.map((step, index) =>
        <Step onClick={() => {
          if (index + 1 < currentStep) {
            setStep(index + 1)
          }
        }
        } key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      )}
    </Stepper>
  )
}

export default AppStepper
