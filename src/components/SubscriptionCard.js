import React from 'react'
import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core'
import { useStep } from '../contexts/StepContext/StepContext';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 25,
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
    fontSize: 12
  },
  activeCard: {
    borderColor: 'green',
  },
  cardContent: {
    paddingBottom: 0
  },
  cardActions: {
    justifyContent: 'center'
  },
}));

const SubscriptionCard = ({ subType, readOnly }) => {
  const { userData, dispatch } = useStep()
  const classes = useStyles();
  const SelectedPlan = userData.subscriptionType.duration_months === subType.duration_months
  return (
    <Card {...(SelectedPlan ? { title: 'selectedPlan' } : '')} onClick={() => dispatch({ type: 'button', data: subType })} classes={{ root: classes.root }} className={SelectedPlan ? classes.activeCard : ''} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {subType.duration_months} Months
              </Typography>
        <Typography className={classes.pos} color="textSecondary">
          For {subType.price_usd_per_gb}$ per Gigabyte
              </Typography>
      </CardContent>
      {!readOnly &&
        <CardActions className={classes.cardActions}>
          <Button onClick={() => dispatch({ type: 'button', data: subType })} size="small">Pick plan</Button>
        </CardActions>
      }
    </Card>
  )
}

export default SubscriptionCard
