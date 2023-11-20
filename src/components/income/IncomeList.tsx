import React, { useState } from 'react'
import { useAppSelector } from '../../utils/hooks'
import CreateIncome from './CreateIncome'
import Income from './Income'

const IncomeList = () => {
  const incomes = useAppSelector((state) => state.income.entities)
  const [addIncome, setAddIncome] = useState(false)

  const toggleAddIncome = () => {
    setAddIncome((prev) => !prev)
  }

  return (
    <div>
      <div
        className={`flex justify-between items-center border-b-2 ${
          addIncome ? 'border-red-200' : 'border-sky-200'
        } mb-4`}
      >
        <h1 className="text-md font-semibold">Income List</h1>
        <button
          className={`${
            addIncome ? 'bg-red-500 hover:bg-red-700' : 'bg-sky-500 hover:bg-sky-700'
          } px-5 py-2 text-sm rounded-full font-semibold text-white mt-4 mb-4`}
          onClick={toggleAddIncome}
        >
          {!addIncome ? 'Add Income' : 'close'}
        </button>
      </div>
      {addIncome && <CreateIncome />}
      {incomes.map((income) => (
        <Income key={income.id} income={income} />
      ))}
    </div>
  )
}

export default IncomeList
