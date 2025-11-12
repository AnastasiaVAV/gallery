import { createSlice } from '@reduxjs/toolkit'

const variantsSlice = createSlice({
  name: 'images',
  initialState: [],
  reducers: {
    setMessages: (state, { payload }) => { // []
      return payload
    },
    addMessage: (state, { payload }) => {
      state.push(payload)
    },
  },

})

export const { actions } = variantsSlice
export default variantsSlice.reducer
