import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'

import ExpensesList from './ExpensesList'

describe('👉  ExpensesList', async () => {
  test('Uses preloaded state to render', () => {
    const expensesState = {
      entities: [
        {
          id: 'GipAH7kPokbCcXQi96RPt',
          notes: 'home needs',
          date: '2023-11-09',
          categoryId: 'vWrWfiQ4UAtQzQ-azvg4g',
          amount: 1,
        },
      ],
    }

    renderWithProviders(<ExpensesList />, {
      preloadedState: {
        expenses: expensesState,
        categories: { entities: [] },
        income: { entities: [] },
      },
    })
    expect(screen.queryByText(/home needs/i)).toBeInTheDocument()
  })
})
