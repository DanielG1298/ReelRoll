import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
 server: {
  proxy: {
    "/movies": "http://localhost:3000",
    "/genre": "http://localhost:3000",
    "/users": "http://localhost:3000",
    "/reviews": "http://localhost:3000",
    // add more later bacause this api is mean to me 
  },
},
})
