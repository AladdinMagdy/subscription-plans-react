export const initialState = {
  subscriptionType: {
    duration_months: 12,
    price_usd_per_gb: 2
  },
  gigabytes: 5,
  upfront: false,
  totalPrice: '',
  card_number: '',
  card_exp: '2022-05-24',
  card_csv: '',
  email: '',
  termsAndConditions: false
}

export const formChangeReducer = (state = initialState, { type, data }) => {
  if (type === 'button') {
    return {
      ...state,
      subscriptionType: data
    }
  } else if (type === 'toggler') {
    return {
      ...state,
      [data.target.name]: data.target.checked
    }
  } else if (type === 'value') {
    return {
      ...state,
      [data.target.name]: data.target.value
    }
  }
  else if (type === 'price') {
    return {
      ...state,
      totalPrice: data
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}