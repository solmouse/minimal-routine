import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//  plugins: [react()],
//})

export default defineConfig({
  plugins: [react()],
  base: '/minimal-routine/', // ← 레포 이름으로 꼭 바꿔줘!
});
