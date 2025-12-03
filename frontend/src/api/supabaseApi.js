import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../supabase'

const artworksView = 'artworks_with_dynamic_path'
const variantsView = 'variants_with_dynamic_path'

export const supabaseApi = createApi({
  reducerPath: 'supabase',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Art'],
  endpoints: build => ({
    getCategoryIds: build.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
        return error ? { error } : { data }
      },
    }),

    getArtsByCategory: build.query({
      queryFn: async (categoryId) => {
        const { data, error } = await supabase
          .from(artworksView)
          .select(`*, ${variantsView}!inner(*)`)
          .eq('categoryId', categoryId)
        return error ? { error } : { data }
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Art', id })),
              { type: 'Art', id: 'LIST' },
            ]
          : [{ type: 'Art', id: 'LIST' }],
    }),

    addLike: build.mutation({
      queryFn: async ({ artworkId, currentLikes }) => {
        const { data, error } = await supabase
          .from('artworks')
          .update({ likes: currentLikes + 1 })
          .eq('id', artworkId)
          .select('*')
        return error ? { error } : { data }
      },
      invalidatesTags: (result, error, { artworkId }) => [
        { type: 'Art', id: artworkId },
        { type: 'Art', id: 'LIST' },
      ],
    }),

    removeLike: build.mutation({
      queryFn: async ({ artworkId, currentLikes }) => {
        const { data, error } = await supabase
          .from('artworks')
          .update({ likes: currentLikes - 1 })
          .eq('id', artworkId)
          .select('*')
        return error ? { error } : { data }
      },
      invalidatesTags: (result, error, { artworkId }) => [
        { type: 'Art', id: artworkId },
        { type: 'Art', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetCategoryIdsQuery,
  useGetArtsByCategoryQuery,
  useAddLikeMutation,
  useRemoveLikeMutation,
} = supabaseApi
