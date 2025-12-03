import { configureStore } from '@reduxjs/toolkit'

import { supabaseApi } from '../api/supabaseApi.js'

export default configureStore({
  reducer: {
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(supabaseApi.middleware),
})
