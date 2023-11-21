import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { addExpense, removeExpense } from './expenses-slice'
import { ApplicationState } from './store'

export type Category = {
  id: string
  name: string
  budget: number
  maxBudget: number
}

export type DraftCategory = Omit<Category, 'id'>

type CategoriesState = {
  entities: Category[]
}

const createCategory = (draftCategory: DraftCategory): Category => {
  const id = nanoid()
  return {
    id,
    ...draftCategory,
  }
}

// groceries, transportation, entertainment
const groceriesCat = createCategory({
  budget: 0,
  maxBudget: 200,
  name: 'groceries',
})
const transportationCat = createCategory({
  budget: 0,
  maxBudget: 150,
  name: 'transportation',
})
const entertainmentCat = createCategory({
  budget: 0,
  maxBudget: 100,
  name: 'entertainment',
})

const initialState: CategoriesState = {
  entities: [groceriesCat, transportationCat, entertainmentCat],
}

const categoriesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<DraftCategory>) => {
      const category = createCategory(action.payload)
      state.entities.unshift(category)
    },
    editCategory: (state, action: PayloadAction<Category>) => {
      const index = state.entities.findIndex((category) => category.id === action.payload.id)
      state.entities[index].budget = action.payload.budget
    },
    removeCategory: (state, action: PayloadAction<Category['id']>) => {
      const index = state.entities.findIndex((category) => category.id === action.payload)
      state.entities.splice(index, index)
    },
  },
  extraReducers(builder) {
    builder.addCase(addExpense, (state, action) => {
      const index = state.entities.findIndex(
        (category) => category.id === action.payload.categoryId,
      )
      state.entities[index].budget += action.payload.amount
    }),
      builder.addCase(removeExpense, (state, action) => {
        const index = state.entities.findIndex(
          (category) => category.id === action.payload.categoryId,
        )
        state.entities[index].budget -= action.payload.amount
      })
  },
})

export const categoriesReducer = categoriesSlice.reducer
export const { addCategory, removeCategory, editCategory } = categoriesSlice.actions
export const selectCategories = (state: ApplicationState) => state.categories.entities

export default categoriesSlice
