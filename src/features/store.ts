import { configureStore } from '@reduxjs/toolkit'
import { expensesReducer } from './expenses-slice'
import { categoriesReducer } from './categories-slice'
import { incomeReducer } from './income-slice'

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    categories: categoriesReducer,
    income: incomeReducer,
  },
})

export type ApplicationState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type ApplicationDispatch = AppStore['dispatch']

export default store
