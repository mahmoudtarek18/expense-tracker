import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { addExpense } from '../../features/expenses-slice'
import ErrorComponent from '../ErrorComponent'
import { selectCategories } from '../../features/categories-slice'

export const inputStyle = 'bg-white rounded-sm h-7 mb-4 px-2'
export const labelStyle = ' block mb-1 bold text-white'

const CreateExpense = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const [expenseDate, setExpenseDate] = useState({
    notes: '',
    date: '',
    categoryId: categories[0].id,
    amount: 0,
  })
  const [isValidForm, setIsValidForm] = useState(true)
  const [catErrorMessage, setCatErrorMessage] = useState('')

  const changeInputHandler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const value = e.target.type === 'number' ? +e.target.value : e.target.value
    const name = e.target.name === 'category' ? 'categoryId' : e.target.name
    setExpenseDate((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitExpenseForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!Object.values(expenseDate).every(Boolean)) {
      setIsValidForm(false)
      return
    }

    !isValidForm && setIsValidForm(true)

    const category = categories.find((cat) => cat.id === expenseDate.categoryId)!
    const budget = category.budget
    const maxBudget = category.maxBudget

    if (budget + expenseDate.amount > maxBudget) {
      if (budget === maxBudget) {
        setCatErrorMessage(
          `you can't add budget for ${category.name} because the max Budget for it is ${maxBudget}$ and you already used it`,
        )
      } else {
        setCatErrorMessage(
          `you can't add more than ${maxBudget - budget}$ because the max Budget for ${
            category.name
          } is ${maxBudget}$ and you used ${budget}$`,
        )
      }
      return
    }

    setCatErrorMessage('')

    setExpenseDate({
      notes: '',
      date: '',
      categoryId: categories[0].id,
      amount: 0,
    })
    dispatch(addExpense(expenseDate))
  }

  return (
    <div className="bg-slate-800 rounded-lg font-medium text-slate-500 mb-3 p-4 border border-gray-300">
      <form onSubmit={submitExpenseForm}>
        <div className="flex gap-2 flex-wrap items-top">
          <div>
            <label htmlFor="notes" className={`${labelStyle}`}>
              notes
            </label>
            <input
              className={`${inputStyle}`}
              type="text"
              name="notes"
              id="notes"
              value={expenseDate.notes}
              onChange={changeInputHandler}
            />
          </div>
          <div>
            <label htmlFor="date" className={`${labelStyle}`}>
              date
            </label>
            <input
              id="date"
              className={`${inputStyle}`}
              type="date"
              name="date"
              value={expenseDate.date}
              onChange={changeInputHandler}
            />
          </div>
          <div>
            <label htmlFor="category" className={`${labelStyle}`}>
              category
            </label>
            <select
              id="category"
              className={`${inputStyle}`}
              name="category"
              value={expenseDate.categoryId}
              onChange={changeInputHandler}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount" className={`${labelStyle}`}>
              amount
            </label>
            <input
              id="amount"
              className={`${inputStyle}`}
              type="number"
              name="amount"
              min={0}
              value={expenseDate.amount}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <button
          className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm rounded-full font-semibold text-white mb-3"
          type="submit"
        >
          Create Expense
        </button>
      </form>
      {!isValidForm && <ErrorComponent message="Please fill all fields" />}
      {!!catErrorMessage && (
        <ErrorComponent key={String(catErrorMessage)} message={catErrorMessage} />
      )}
    </div>
  )
}

export default CreateExpense
