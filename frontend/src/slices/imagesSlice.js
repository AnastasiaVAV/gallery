import { createSlice } from '@reduxjs/toolkit'

const imagesSlice = createSlice({
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

export const { actions } = imagesSlice
export default imagesSlice.reducer
