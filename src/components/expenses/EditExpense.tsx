import React, { useState } from 'react'
import { Expense, editExpense } from '../../features/expenses-slice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import ErrorComponent from '../ErrorComponent'
import { inputStyle } from './CreateExpense'
import { editCategory, selectCategories } from '../../features/categories-slice'

export const labelStyle = ' block mb-1 bold text-gray-500'

const EditExpense = ({
  expense,
  setEditExpense,
}: {
  expense: Expense
  setEditExpense: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories)
  const [expenseDate, setExpenseDate] = useState(expense)
  const [isValidForm, setIsValidForm] = useState(true)
  const [catErrorMessage, setCatErrorMessage] = useState('')

  const changeInputHandler: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (
    e,
  ) => {
    const value = e.target.type === 'number' ? +e.target.value : e.target.value
    const name = e.target.name === 'category' ? 'categoryId' : e.target.name
    setExpenseDate((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitExpenseForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!Object.values(expenseDate).every(Boolean)) {
      setIsValidForm(false)
      return
    }
    !isValidForm && setIsValidForm(true)

    const category = categories.find((cat) => cat.id === expenseDate.categoryId)!
    const catBudget = category.budget
    const maxBudget = category.maxBudget
    const oldAmount = expense.categoryId === category.id ? expense.amount : 0

    if (catBudget - oldAmount + expenseDate.amount > maxBudget) {
      if (catBudget === maxBudget) {
        setCatErrorMessage(
          `you can't add budget for ${category.name} because the max Budget for it is ${maxBudget}$ and you already used it`,
        )
      } else {
        setCatErrorMessage(
          `you can't add more than ${
            maxBudget - catBudget + oldAmount
          }$ because the max Budget for ${category.name} is ${maxBudget}$ and you used ${
            catBudget - oldAmount
          }$`,
        )
      }
      return
    }

    setCatErrorMessage('')
    if (category.id !== expense.categoryId) {
      const oldCategory = categories.find((cat) => cat.id === expense.categoryId)!
      dispatch(editCategory({ ...oldCategory, budget: oldCategory.budget - expense.amount }))
      dispatch(editCategory({ ...category, budget: catBudget + expenseDate.amount }))
    } else {
      dispatch(
        editCategory({
          ...category,
          budget: catBudget - expense.amount + expenseDate.amount,
        }),
      )
    }
    dispatch(editExpense({ expense: expenseDate }))
    setEditExpense(false)
  }

  return (
    <div>
      <form
        onSubmit={submitExpenseForm}
        className="flex gap-2 flex-wrap items-center bg-gray-300/80 p-8 rounded-lg"
      >
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
        <div>
          <button
            className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm rounded-full font-semibold text-white mb-3"
            type="submit"
          >
            Submit Edit
          </button>
        </div>
      </form>
      {!isValidForm && (
        <ErrorComponent key={String(isValidForm)} message="Please fill all fields" />
      )}
      {!!catErrorMessage && (
        <ErrorComponent key={String(catErrorMessage)} message={catErrorMessage} />
      )}
    </div>
  )
}

export default EditExpense
