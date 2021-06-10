import React from 'react'
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useStep } from '../contexts/StepContext/StepContext';
import SubscriptionCard from './SubscriptionCard';

const useStyles = makeStyles((theme) => ({
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25
  },
  root: {
    width: '90%',
    margin: '0 0 15px'
  }
}));

const Confirmation = () => {
  const classes = useStyles();
  const { userData, dispatch } = useStep()

  return (
    <div className={classes.stepContainer}>
      You have selected: <SubscriptionCard subType={userData.subscriptionType} readOnly />
      <TextField className={classes.root} value={userData.email} onChange={(e) => dispatch({ type: 'value', data: e })} name="email" id="email" type="email" required label="Email address" />
      <FormControlLabel
        control={<Checkbox value={userData.termsAndConditions} required checked={userData.termsAndConditions} onChange={(e) => dispatch({ type: 'toggler', data: e })} name="termsAndConditions" />}
        label="I agree to terms and conditions"
      />
    </div>
  )
}

export default Confirmation
