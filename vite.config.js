import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   base: 'https://normaly.net/dist',
//   plugins: [react()],
// })

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      plugins: [react()]
    }
  } else {
    return {
      base: 'https://normaly.net/dist',
      plugins: [react()]
    }
  }
})