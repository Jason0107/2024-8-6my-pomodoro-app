import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {BASE_PATH} from './src/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `${BASE_PATH}/`, // 这里使用模板字符串将路径拼接
})
