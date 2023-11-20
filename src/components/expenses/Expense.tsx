import { useState } from 'react'
import { Expense, removeExpense } from '../../features/expenses-slice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import EditExpense from './EditExpense'
import { selectCategories } from '../../features/categories-slice'

const ExpenseComponent = ({ expense }: { expense: Expense }) => {
  const dispatch = useAppDispatch()
  const { amount, categoryId, date, notes } = expense
  const [editExpense, setEditExpense] = useState(false)
  const categories = useAppSelector(selectCategories)
  const category = categories.find((category) => category.id === categoryId)

  const toggleEdit = () => {
    setEditExpense((prev) => !prev)
  }

  const deleteExpense = () => {
    if (confirm('are sure that you will delete this expense?')) {
      dispatch(removeExpense(expense))
    }
  }
  return (
    <div className="bg-gray-200/40 rounded-lg font-medium text-slate-500 mb-3 p-4 border border-gray-300">
      <div className="flex justify-between">
        <p>
          <span className="font-bold text-indigo-500">{notes}</span> | {date}
        </p>
        <p>
          <span className="text-[11px] mr-2 rounded-full py-1 px-2 bg-sky-400/30 text-sky-600 ">
            {category?.name}
          </span>
          <span className="mr-4 text-[11px] rounded-full py-1 px-2 bg-amber-900/10 text-amber-900">
            {amount}$
          </span>
          <span className="inline-block ">
            <span
              className="cursor-pointer flex justify-center items-center text-[11px] rounded-full h-6 w-6 text-center border border-red-700 text-red-700"
              onClick={deleteExpense}
            >
              <span>X</span>
            </span>
          </span>
        </p>
      </div>
      <button
        className={`${
          editExpense ? 'bg-red-500 hover:bg-red-700' : 'bg-sky-500 hover:bg-sky-700'
        } px-5 py-2 text-sm rounded-full font-semibold text-white mt-4 mb-4`}
        onClick={toggleEdit}
      >
        {!editExpense ? 'Edit Expense' : 'close'}
      </button>
      {editExpense && <EditExpense expense={expense} setEditExpense={setEditExpense} />}
    </div>
  )
}

export default ExpenseComponent
