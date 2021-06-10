import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useStep } from '../contexts/StepContext/StepContext';

const useStyles = makeStyles((theme) => ({
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    margin: '0 25px 25px'
  },
  root: {
    width: '100%',
    margin: 25
  }
}));

const PaymentOptions = () => {
  const classes = useStyles();
  const { userData, dispatch } = useStep()

  return (
    <div className={classes.stepContainer}>
      <TextField inputProps={{ 'data-testid': "card_number" }} className={classes.root} value={userData['card_number']} onChange={(e) => dispatch({ type: 'value', data: e })} name="card_number" required label="Credit card number" />
      <TextField inputProps={{ 'data-testid': "card_exp" }} className={classes.root} value={userData['card_exp']} onChange={(e) => dispatch({ type: 'value', data: e })} name="card_exp" required label="Expiration date" type="date" />
      <TextField inputProps={{ 'data-testid': "card_csv" }} className={classes.root} value={userData['card_csv']} onChange={(e) => dispatch({ type: 'value', data: e })} name="card_csv" required label="Credit card security code" type="password" />
    </div>
  )
}

export default PaymentOptions
