import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import removeConsole from 'vite-plugin-remove-console'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), removeConsole()]
})
