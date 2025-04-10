import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
 plugins: [react()],
 build: {
  chunkSizeWarningLimit: 2600,
 },
 test:{
  globals:true,
  environment:'jsdom', 
  setupFiles:'./src/tests/setup.js',
  css:true,
  reporters:[
   'default',
   ['json',{outputFile:'results.json'}]
  ]
  
 }
})
