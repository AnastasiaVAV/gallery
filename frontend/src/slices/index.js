import { configureStore } from '@reduxjs/toolkit'

import imagesSlice from './imagesSlice.js'
import variantsSlice from './variantsSlice.js'
import categoriesSlice from './categoriesSlice.js'
import { supabaseApi } from '../api/supabaseApi.js'

export default configureStore({
  reducer: {
    categories: categoriesSlice,
    images: imagesSlice,
    variants: variantsSlice,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(supabaseApi.middleware),
})
