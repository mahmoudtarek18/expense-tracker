import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'
import CreateExpense from './CreateExpense'

describe('👉 test text in CreateExpense', async () => {
  beforeEach(() => renderWithProviders(<CreateExpense />))

  test('Create Expense text in the Document', () => {
    expect(screen.getByText(/Create Expense/i)).toBeInTheDocument()
  })

  test('Please fill all fields not in the Document', () => {
    expect(screen.queryByText(/Please fill all fields/i)).not.toBeInTheDocument()
  })

  test('after click on the button when there is no ❌ data', async () => {
    const button = screen.getByRole('button', { name: /Create Expense/i })
    fireEvent.click(button)
    expect(await screen.findByText(/Please fill all fields/i)).toBeInTheDocument()
  })

  test('after click on the button when there is ✅ data', async () => {
    const notesField = screen.getByRole('textbox', { name: 'notes' })
    const amountField = screen.getByRole('spinbutton', { name: 'amount' })
    const categoryField = screen.getByRole('combobox', { name: 'category' })
    const firstOptionValue = (categoryField.querySelector('option') as HTMLOptionElement).value
    const dateField = screen.getByLabelText('date')
    const button = screen.getByRole('button', { name: /Create Expense/i })

    // first: click the button before filling the data to show the error message
    fireEvent.click(button)
    expect(screen.queryByText(/Please fill all fields/i)).toBeInTheDocument()

    fireEvent.change(notesField, { target: { value: 'food' } })
    fireEvent.change(amountField, { target: { value: '10' } })
    fireEvent.change(categoryField, { target: { value: firstOptionValue } })
    fireEvent.change(dateField, { target: { value: '2023-11-11' } })
    fireEvent.click(button)

    // first: click the button before filling the data to show the error message
    expect(screen.queryByText(/Please fill all fields/i)).not.toBeInTheDocument()
  })
})
