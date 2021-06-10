import React from 'react'
import SubscriptionOptions from '../SubscriptionOptions';
import PaymentOptions from '../PaymentOptions';
import Confirmation from '../Confirmation';
import { useStep } from '../../contexts/StepContext/StepContext';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '20px 10px 30px'
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedPlan: {
    width: '60%',
    marginBottom: 10
  },
  formError: {
    margin: '-25px 0 20px',
    color: 'red',
    fontSize: '14px'
  }
}));

const MultiForm = () => {
  const classes = useStyles();
  const { currentStep, setStep, userData, loading, error, handleSubmit, formErrors } = useStep()

  const showStep = (step) => {
    switch (step) {
      case 1:
        return <SubscriptionOptions />
      case 2:
        return <PaymentOptions />
      case 3:
        return <Confirmation />
      default:
        return <div>404</div>
    }
  }

  if (loading) {
    return (
      <div>Please wait while loading...</div>
    )
  }
  if (error) {
    return (
      <div>{error}</div>
    )
  }

  return (
    <form title="form" className={classes.form} autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
      {showStep(currentStep)}
      {Boolean(formErrors.length) &&
        <div className={classes.formError}>Please fill in all the fields</div>
      }
      <div className={classes.selectedPlan}>
        Current selected plan is {userData.subscriptionType.duration_months} months with total price of : {userData.totalPrice}$
      </div>
      <div>
        {currentStep !== 1 &&
          <Button className={classes.button} onClick={() => setStep(currentStep - 1)} color='secondary' variant='contained'>Back</Button>
        }
        <Button title='submitButton' type="submit" className={classes.button} color='primary' variant='contained'>{currentStep !== 3 ? 'Next' : 'Confirm'}</Button>
      </div>
    </form>
  )
}

export default MultiForm
