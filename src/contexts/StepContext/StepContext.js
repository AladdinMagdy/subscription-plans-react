import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { formChangeReducer, initialState } from './formChangeReducer'

const StepperContext = createContext()


const StepProvider = ({ children, url, step = 1 }) => {
  const [currentStep, setStep] = useState(step)
  const [formErrors, setFormErrors] = useState([])
  const steps = ['Subscriptions', 'Payment Options', 'Confirmation']

  // NOTE: I did not want to use a form library (ex: Formik) to handle form state and initial values because it's an overkill for this task so I decided to handle the form state inside this context
  const [userData, dispatch] = React.useReducer(
    formChangeReducer,
    initialState
  )

  // handles data fetching statues
  const { data, loading, error } = useFetch(url);
  const subscriptionTypes = !loading && data['subscription_plans'];

  // to handle the Effect of change of user selected plan on the total price
  useEffect(() => {
    let totalPrice = userData.subscriptionType.price_usd_per_gb * userData.gigabytes
    if (userData.upfront) {
      totalPrice *= 0.90
    }
    dispatch({ type: 'price', data: totalPrice })
  }, [userData.subscriptionType, userData.gigabytes, userData.upfront])

  const handleSubmit = (e) => {
    e.preventDefault();
    // extra validation could be done here
    setFormErrors([]);
    const invalidFormFields = Array.from(e.target.elements).filter(elem => {
      if (elem.nodeName === 'INPUT' && typeof elem.value !== 'undefined' && elem.value === '') {
        return elem
      }
      return false
    })
    // console.log("🚀 ~ file: StepContext.js ~ line 42 ~ invalidFormFields ~ invalidFormFields", invalidFormFields)
    if (invalidFormFields.length) {
      return setFormErrors(invalidFormFields)
    }
    if (currentStep === 3) {
      // TODO: this can be enhanced more, maybe combine into the useFetch hook
      axios.post('https://httpbin.org/post', {
        ...userData
      })
    } else {
      setStep(currentStep + 1)
    }
  }


  return (
    <StepperContext.Provider value={{ steps, subscriptionTypes, loading, error, currentStep, setStep, userData, dispatch, handleSubmit, formErrors }}>
      {children}
    </StepperContext.Provider>
  )
}

function useStep() {
  const context = React.useContext(StepperContext)
  if (context === undefined) {
    throw new Error('useStep must be used within a CountProvider')
  }
  return context
}

// Also exported StepperContext for unit testing
export { StepProvider, useStep, StepperContext }
