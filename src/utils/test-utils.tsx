import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { combineReducers, configureStore, type PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import type { AppStore, ApplicationState } from '../features/store'
import { expensesReducer } from '../features/expenses-slice'
import { categoriesReducer } from '../features/categories-slice'
import { incomeReducer } from '../features/income-slice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<ApplicationState>
  store?: AppStore
}

const rootReducer = combineReducers({
  expenses: expensesReducer,
  categories: categoriesReducer,
  income: incomeReducer,
})

function setupStore(preloadedState?: PreloadedState<ApplicationState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
