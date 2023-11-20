import ExpensesList from './expenses/ExpensesList'
import IncomeList from './income/IncomeList'
const MainLayout = () => {
  return (
    <div className="mx-8 pt-5">
      <div className="flex gap-12">
        <div className="w-1/2">
          <IncomeList />
        </div>
        <div className="w-1/2">
          <ExpensesList />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
