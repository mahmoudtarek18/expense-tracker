import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { ApplicationState } from './store'

export type Expense = {
  id: string
  amount: number
  date: string
  notes: string
  categoryId: string
}

export type DraftExpense = Omit<Expense, 'id'>

type ExpensesState = {
  entities: Expense[]
}

const initialState: ExpensesState = {
  entities: [],
}

export const createExpense = (draftExpense: DraftExpense): Expense => {
  const id = nanoid()
  return {
    id,
    ...draftExpense,
  }
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<DraftExpense>) => {
      const expense = createExpense(action.payload)
      state.entities.unshift(expense)
    },
    removeExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.entities.findIndex((expense) => expense.id === action.payload.id)
      state.entities.splice(index, 1)
    },
    editExpense: (
      state,
      action: PayloadAction<{
        expense: Expense
      }>,
    ) => {
      const index = state.entities.findIndex((expense) => expense.id === action.payload.expense.id)
      state.entities[index] = action.payload.expense
    },
  },
})

export const expensesReducer = expensesSlice.reducer
export const { addExpense, removeExpense, editExpense } = expensesSlice.actions
export const selectExpenses = (state: ApplicationState) => state.expenses.entities

export default expensesSlice
