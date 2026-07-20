import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// rpx → vw 转换插件（仅本地预览用，uni-app 项目引用组件库时会用自己的 rpx 编译）
const rpxToVw = () => ({
  postcssPlugin: 'rpx-to-vw',
  Declaration(decl: { value: string }) {
    if (decl.value.includes('rpx')) {
      decl.value = decl.value.replace(
        /(\d+(\.\d+)?)rpx/g,
        (_m, n) => `${(Number(n) * 100 / 750).toFixed(4)}vw`
      )
    }
  }
})

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // uni-app 的 view/text/image 等标签在纯 vue 预览环境里识别为自定义元素
          isCustomElement: tag =>
            ['view', 'text', 'image', 'scroll-view', 'input', 'button', 'icon', 'progress', 'slider', 'switch', 'textarea'].includes(tag)
        }
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    postcss: {
      plugins: [rpxToVw() as never]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
