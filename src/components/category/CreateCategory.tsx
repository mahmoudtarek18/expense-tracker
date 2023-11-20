import React, { useState, ChangeEventHandler, FormEventHandler } from 'react'
import { useAppDispatch } from '../../utils/hooks'
import { addCategory } from '../../features/categories-slice'
import { useNavigate } from 'react-router-dom'
import ErrorComponent from '../ErrorComponent'

const inputStyle = 'bg-gray-200/80 rounded-sm h-8 mb-4 px-2'
const labelStyle = ' block mb-1 bold text-slate-800'

const CreateCategory: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [categoryData, setCategoryData] = useState({
    name: '',
    maxBudget: 0,
  })
  const [isValidForm, setIsValidForm] = useState(true)

  const changeInputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.type === 'number' ? +e.target.value : e.target.value
    const name = e.target.name
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitCategoryForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!Object.values(categoryData).every(Boolean)) {
      setIsValidForm(false)
      return
    }
    dispatch(addCategory({ ...categoryData, budget: 0 }))
    navigate({ pathname: '/' })
  }

  return (
    <div className="rounded-lg font-medium text-slate-500 mb-3 p-4">
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
              value={categoryData.name}
              onChange={changeInputHandler}
            />
          </div>
          <div>
            <label htmlFor="maxBudget" className={`${labelStyle}`}>
              max budget
            </label>
            <input
              id="maxBudget"
              className={`${inputStyle}`}
              type="number"
              min={0}
              name="maxBudget"
              value={categoryData.maxBudget}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <button
          className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm rounded-full font-semibold text-white mb-3"
          type="submit"
        >
          Add Category
        </button>
      </form>
      {!isValidForm && <ErrorComponent message="Please fill all fields" />}
    </div>
  )
}

export default CreateCategory
