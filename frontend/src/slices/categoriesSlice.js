import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  activeCategoryId: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, { payload }) => {
      state.categories = payload
    },
    setActiveCategoryId: (state, { payload }) => {
      const id = state.categories.filter(category => category.name === payload)
      state.activeCategoryId = id
    },
  },

})

export const { actions } = categoriesSlice
export default categoriesSlice.reducer
