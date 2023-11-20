import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ApplicationDispatch, ApplicationState } from '../features/store'
import { useState } from 'react'
import { Expense } from '../features/expenses-slice'
import { Category } from '../features/categories-slice'
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector
export const useAppDispatch: () => ApplicationDispatch = useDispatch

export const useValidateForm = <T extends Array<Expense | Category>>(data: T) => {
  const [isValidForm, setIsValidForm] = useState(true)
  if (!Object.values(data).every(Boolean)) {
    setIsValidForm(false)
    return
  }
  !isValidForm && setIsValidForm(true)

  return isValidForm
}
