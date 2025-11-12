import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@api', replacement: '/src/api' },
      { find: '@slices', replacement: '/src/slices' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@contexts', replacement: '/src/contexts' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@styles', replacement: '/src/styles' },

      { find: '@components', replacement: '/src/components' },
      { find: '@ui', replacement: '/src/components/ui' },
      { find: '@layout', replacement: '/src/components/layout' },
      { find: '@modal', replacement: '/src/components/modal' },
      { find: '@pages', replacement: '/src/components/pages' },
    ],
  },
})
