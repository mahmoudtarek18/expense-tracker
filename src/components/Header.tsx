import { Link } from 'react-router-dom'
import { useAppSelector } from '../utils/hooks'
import { selectExpenses } from '../features/expenses-slice'

const btnStyle =
  'bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-sm rounded-full font-semibold text-white'

const Header = () => {
  const expenses = useAppSelector(selectExpenses)
  const income = useAppSelector((state) => state.income.entities)
  const totalExpenses = expenses.reduce((a, c) => a + c.amount, 0)
  const totalIncome = income.reduce((a, c) => a + c.value, 0)

  return (
    <div>
      <div className="bg-gray-200 text-center py-8">
        <div className="flex">
          <div className="bg-green-700/90 p-4 w-1/3 mx-auto mb-8">
            <h2 className="text-white text-lg">
              Income: <span className="font-bold">{totalIncome}$</span>
            </h2>
          </div>
          <div className="bg-red-700/90  p-4 w-1/3 mx-auto mb-8">
            <h2 className="text-white text-lg">
              Expenses: <span className="font-bold">{totalExpenses}$</span>
            </h2>
          </div>
        </div>
        <Link to={'/'} className={`${btnStyle} mr-5`} type="submit">
          Home
        </Link>
        <Link to={'/charts'} className={`${btnStyle} mr-5`} type="submit">
          charts
        </Link>
        <Link to={'/add-category'} className={btnStyle} type="submit">
          Add New Category
        </Link>
      </div>
    </div>
  )
}

export default Header
