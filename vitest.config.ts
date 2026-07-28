import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // uni-app 的 view/text/image 等标签在纯 vue 测试环境里识别为自定义元素
          isCustomElement: tag =>
            ['view', 'text', 'image', 'scroll-view', 'input', 'button', 'icon', 'progress', 'slider', 'switch', 'textarea'].includes(tag)
        }
      }
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/components/**/*.vue']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  }
})
