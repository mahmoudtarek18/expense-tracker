import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

export type Income = {
  id: string
  name: string
  value: number
}

export type DraftIncome = Omit<Income, 'id'>

type IncomeState = {
  entities: Income[]
}

const initialState: IncomeState = {
  entities: [],
}

const createIncome = (draftIncome: DraftIncome): Income => {
  const id = nanoid()
  return {
    id,
    ...draftIncome,
  }
}

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<DraftIncome>) => {
      const expense = createIncome(action.payload)
      state.entities.unshift(expense)
    },
    removeIncome: (state, action: PayloadAction<Income['id']>) => {
      const index = state.entities.findIndex((el) => el.id === action.payload)
      state.entities.splice(index, 1)
    },
  },
})

export const incomeReducer = incomeSlice.reducer
export const { addIncome, removeIncome } = incomeSlice.actions

export default incomeSlice
