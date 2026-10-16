import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // El prerender corre en Node: styled-components se empaqueta para evitar su interop CJS.
  ssr: { noExternal: ['styled-components'] },
  // Sin imágenes en base64: inflarían el JS y el HTML prerenderizado (los logos se repiten).
  build: { assetsInlineLimit: 0 },
})
