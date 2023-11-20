import { Income, removeIncome } from '../../features/income-slice'
import { useAppDispatch } from '../../utils/hooks'

const IncomeComponent = ({ income }: { income: Income }) => {
  const { id, name, value } = income
  const dispatch = useAppDispatch()

  const deleteIncome = () => {
    if (confirm('are sure that you will delete this income?')) {
      dispatch(removeIncome(id))
    }
  }

  return (
    <div className="bg-gray-200/40 rounded-lg font-medium text-slate-500 mb-3 p-4 border border-gray-300">
      <div className="flex justify-between">
        <p>
          <span className="font-bold text-indigo-500">{name}</span>
        </p>
        <p className="text-[11px] ">
          <span className="inline-block rounded-full py-1 px-2 bg-amber-900/10 text-amber-900 mr-4">
            {value}$
          </span>

          <span className="inline-block ">
            <span
              className="cursor-pointer flex justify-center items-center text-[11px] rounded-full h-6 w-6 text-center border border-red-700 text-red-700"
              onClick={deleteIncome}
            >
              <span>X</span>
            </span>
          </span>
        </p>
      </div>
      {/* <button
        className={`${
          editExpense ? 'bg-red-500 hover:bg-red-700' : 'bg-sky-500 hover:bg-sky-700'
        } px-5 py-2 text-sm rounded-full font-semibold text-white mt-4 mb-4`}
        onClick={toggleEdit}
      >
        {!editExpense ? 'Edit Expense' : 'close'}
      </button>
      {editExpense && <EditExpense expense={expense} setEditExpense={setEditExpense} />} */}
    </div>
  )
}

export default IncomeComponent
