<template>
  <view class="as-svg-icon" :style="wrapStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { rpxToVw } from '@/utils/rpx'

const props = withDefaults(defineProps<{
  /** 图标名称，不含扩展名，如 'bell-line' */
  name: string
  /** 尺寸，默认 36rpx */
  size?: string
  /** 颜色，默认当前文字色 */
  color?: string
}>(), {
  size: '36rpx',
  color: '#4b5a7a'
})

/** 将 rpx 转为 vw，解决 H5 预览环境内联样式不识别 rpx 的问题 */
const computedSize = computed(() => rpxToVw(props.size))

const dataUri = computed(() => {
  // 构建内联 SVG data URI
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${props.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="${iconPath(props.name)}"/></svg>`
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
  return `data:image/svg+xml,${encoded}`
})

/**
 * 使用 CSS background-image 渲染 SVG，而非 <image> 标签。
 * 原因：H5 预览环境（Vite + Vue isCustomElement）中 <image> 被创建为
 * HTMLUnknownElement，浏览器不会将其视为 <img>，导致 src 属性无效、
 * SVG 内容不渲染。CSS background-image 在 H5 和 uni-app 中均正常工作。
 */
const wrapStyle = computed(() => ({
  width: computedSize.value,
  height: computedSize.value,
  display: 'inline-block',
  verticalAlign: 'middle',
  flexShrink: '0',
  backgroundImage: `url("${dataUri.value}")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain'
} as Record<string, string>))

// 常用图标路径映射（后续可扩展或改为文件加载）
function iconPath(name: string): string {
  const paths: Record<string, string> = {
    'bell-line': 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
    'search': 'M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M21 21l-4.35-4.35',
    'arrow-left': 'M19 12H5M12 19l-7-7 7-7',
    'arrow-right': 'M5 12h14M12 5l7 7-7 7',
    'check': 'M20 6L9 17l-5-5',
    'close': 'M18 6L6 18M6 6l12 12',
    'plus': 'M12 5v14M5 12h14',
    'minus': 'M5 12h14',
    'chevron-down': 'M6 9l6 6 6-6',
    'chevron-up': 'M18 15l-6-6-6 6',
    'chevron-right': 'M9 18l6-6-6-6',
    'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    'trending-up': 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
    'trending-down': 'M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6',
    'settings': 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
    'home-line': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10',
    'chart-line': 'M3 3v18h18M9 17V9M15 17V5M21 17v-3',
    'trade-line': 'M7 7h13M16 4l4 3-4 3M17 17H4M8 14l-4 3 4 3',
    'user-line': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'star-line': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    'trending-up-line': 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
    'trending-down-line': 'M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6',
  }
  return paths[name] || ''
}
</script>

<style lang="scss" scoped>
.as-svg-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
