import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/minimal-routine/', // ← repo 이름과 정확히 일치해야 함!
})
