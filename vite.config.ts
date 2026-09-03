import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// rpx → px 转换插件（仅本地预览用：750 设计稿固定手机尺寸，字号/间距不随视口等比放大；
// uni-app 项目引用组件库时会用自己的 rpx 编译）
const rpxToPx = () => ({
  postcssPlugin: 'rpx-to-px',
  Declaration(decl: { value: string }) {
    if (decl.value.includes('rpx')) {
      decl.value = decl.value.replace(
        /(\d+(\.\d+)?)rpx/g,
        (_m, n) => `${(Number(n) * 0.5).toFixed(2)}px`
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
      plugins: [rpxToPx() as never]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
