import { render, fireEvent, screen, cleanup, waitFor, waitForElement, getAllByLabelText, getByLabelText, act } from '@testing-library/react'

import MultiForm from './index'
import { StepProvider } from '../../contexts/StepContext/StepContext'

import axiosMock from 'subscriptionTypes'
import userEvent from '@testing-library/user-event'

afterEach(cleanup)

describe("formSteppingCheck", () => {
  const url = 'https://cloud-storage-prices-moberries.herokuapp.com/prices'
  beforeEach(() => {
    axiosMock.get()
  })

  it("firstStepShouldStep", async () => {
    const { queryByTitle, getByText } = render(
      <StepProvider url={url}>
        <MultiForm />
      </StepProvider>
    )
    expect(getByText(/loading.../i).textContent).toBe("Please wait while loading...")
    await waitFor(() => {
      expect(queryByTitle("selectedPlan").textContent).toContain('12')
    });
    const submitButton = queryByTitle('submitButton')
    fireEvent.click(submitButton);
    expect(screen.getByText(/Credit card number/i)).toBeTruthy()
  });

  it("secondStepShouldNotStep", async () => {
    const { queryByTitle } = render(
      <StepProvider step={2} url={url}>
        <MultiForm />
      </StepProvider>
    )
    await waitFor(() => {
      expect(screen.getByText(/Credit card number/i)).toBeTruthy()
    });
    const submitButton = queryByTitle('submitButton');
    const form = queryByTitle('form');
    userEvent.click(submitButton);
    expect(form).not.toHaveTextContent(/You have selected:/i)
  });
})