import React, { useState, ChangeEventHandler, FormEventHandler } from 'react'
import { useAppDispatch } from '../../utils/hooks'
import { addIncome } from '../../features/income-slice'
import { inputStyle, labelStyle } from '../expenses/CreateExpense'
import ErrorComponent from '../ErrorComponent'

const CreateIncome = () => {
  const dispatch = useAppDispatch()
  const [incomeData, setIncomeData] = useState({
    name: '',
    value: 0,
  })
  const [isValidForm, setIsValidForm] = useState(true)

  const changeInputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.type === 'number' ? +e.target.value : e.target.value
    const name = e.target.name
    setIncomeData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitCategoryForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!Object.values(incomeData).every(Boolean)) {
      setIsValidForm(false)
      return
    }
    !isValidForm && setIsValidForm(true)

    dispatch(addIncome({ ...incomeData }))
    setIncomeData({
      name: '',
      value: 0,
    })
  }

  return (
    <div className="bg-slate-800 rounded-lg font-medium text-slate-500 mb-3 p-4 border border-gray-300">
      <form onSubmit={submitCategoryForm}>
        <div className="flex gap-2 flex-wrap items-top">
          <div>
            <label htmlFor="name" className={`${labelStyle}`}>
              name
            </label>
            <input
              className={`${inputStyle}`}
              type="text"
              name="name"
              id="name"
              value={incomeData.name}
              onChange={changeInputHandler}
            />
          </div>
          <div>
            <label htmlFor="value" className={`${labelStyle}`}>
              value
            </label>
            <input
              id="value"
              className={`${inputStyle}`}
              type="number"
              name="value"
              min={0}
              value={incomeData.value}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <button
          className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm rounded-full font-semibold text-white mb-3"
          type="submit"
        >
          Add Income
        </button>
      </form>
      {!isValidForm && <ErrorComponent message="Please fill all fields" />}
    </div>
  )
}

export default CreateIncome
