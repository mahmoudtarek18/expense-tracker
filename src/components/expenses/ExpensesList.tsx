import { useState } from 'react'
import { useAppSelector } from '../../utils/hooks'
import Expense from './Expense'
import CreateExpense from './CreateExpense'
import { selectExpenses } from '../../features/expenses-slice'

const ExpensesList = () => {
  const expenses = useAppSelector(selectExpenses)
  const [addExpense, setAddExpense] = useState(false)
  const toggleAddExpense = () => {
    setAddExpense((prev) => !prev)
  }
  return (
    <div>
      <div
        className={`flex justify-between items-center border-b-2 ${
          addExpense ? 'border-red-200' : 'border-sky-200'
        } mb-4`}
      >
        <h1 className="text-md font-semibold">Expenses List</h1>
        <button
          className={`${
            addExpense ? 'bg-red-500 hover:bg-red-700' : 'bg-sky-500 hover:bg-sky-700'
          } px-5 py-2 text-sm rounded-full font-semibold text-white mt-4 mb-4`}
          onClick={toggleAddExpense}
        >
          {!addExpense ? 'Add Expense' : 'close'}
        </button>
      </div>
      {addExpense && <CreateExpense />}
      {expenses.map((expense) => (
        <Expense key={expense.id} expense={expense} />
      ))}
    </div>
  )
}

export default ExpensesList
