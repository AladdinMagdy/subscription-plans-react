import React from 'react'
import { FormControl, FormControlLabel, FormGroup, MenuItem, Select, Switch } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useStep } from '../contexts/StepContext/StepContext';
import { green } from '@material-ui/core/colors';
import SubscriptionCard from './SubscriptionCard';

const useStyles = makeStyles((theme) => ({
  selectRoot: {
    backgroundColor: '#fff',
    '&:focus': {
      backgroundColor: '#fff',
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    }
  },
  otherOptions: {
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const GreenSwitch = withStyles({
  switchBase: {
    color: green[300],
    '&$checked': {
      color: green[500],
    },
    '&$checked + $track': {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {},
})(Switch);


const SubscriptionOptions = () => {
  const classes = useStyles();
  const { subscriptionTypes, userData, dispatch } = useStep()

  return (
    <div className={classes.stepContainer}>
      <div className={classes.cardsContainer}>
        {subscriptionTypes.map(subType => (
          <SubscriptionCard key={subType.duration_months} subType={subType} />
        ))}
      </div>
      <div className={classes.otherOptions}>
        <FormControl required variant="filled" className={classes.formControl}>
          <Select
            classes={{ root: classes.selectRoot }}
            labelId="outlined-label"
            id="outlined"
            name="gigabytes"
            value={userData.gigabytes}
            onChange={(event) => dispatch({ type: 'value', data: event })}
          >
            <MenuItem value={5}>5 Gigabytes</MenuItem>
            <MenuItem value={10}>10 Gigabytes</MenuItem>
            <MenuItem value={50}>50 Gigabytes</MenuItem>
          </Select>
        </FormControl>
        <FormGroup style={{ marginTop: 20 }} row>
          <FormControlLabel
            control={<GreenSwitch value={userData.upfront} checked={userData.upfront} onChange={(event) => dispatch({ type: 'toggler', data: event })} name="upfront" />}
            label="Upfront payment: "
            labelPlacement="start"
          />
        </FormGroup>
      </div>
    </div>
  )
}

export default SubscriptionOptions
