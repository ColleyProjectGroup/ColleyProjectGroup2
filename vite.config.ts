import { defineConfig, Alias } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),

      pages: `${path.resolve(__dirname, './src/pages/')}`,
      components: `${path.resolve(__dirname, './src/components/')}`,
      services: `${path.resolve(__dirname, './src/services/')}`,
      hooks: `${path.resolve(__dirname, './src/hooks/')}`,
      contexts: `${path.resolve(__dirname, './src/contexts/')}`,
      styles: `${path.resolve(__dirname, './src/styles/')}`,
      types: `${path.resolve(__dirname, './src/types/')}`,
      utils: `${path.resolve(__dirname, './src/utils/')}`,
      api: `${path.resolve(__dirname, './src/api/')}`
    }
  }
})
