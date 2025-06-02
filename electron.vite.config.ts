import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import viteConfig from './vite.config.js'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    ...viteConfig, // 继承基础 Vite 配置
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve.alias,
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      ...viteConfig.plugins,
      vue()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@styles/element-plus.scss";`
        }
      }
    }
  }
})