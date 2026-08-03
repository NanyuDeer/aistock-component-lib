<template>
  <view class="as-page-shell" :class="`as-page-shell--${navType}`">
    <!-- 顶部安全区占位 -->
    <view class="as-page-shell__safe-top"></view>

    <!-- 导航栏 -->
    <view v-if="showNav" class="as-page-shell__nav">
      <slot name="nav">
        <view class="as-page-shell__nav-inner">
          <view v-if="back" class="as-page-shell__back" @click="handleBack">
            <SvgIcon name="arrow-left" size="36rpx" :color="navIconColor" />
          </view>
          <view class="as-page-shell__nav-titles">
            <text v-if="title" class="as-page-shell__title">{{ title }}</text>
            <text v-if="subtitle" class="as-page-shell__subtitle">{{ subtitle }}</text>
          </view>
          <view class="as-page-shell__nav-extra">
            <slot name="nav-extra" />
          </view>
        </view>
      </slot>
    </view>

    <!-- 可选的标签栏插槽（如胶囊标签栏） -->
    <view v-if="$slots.tabs" class="as-page-shell__tabs">
      <slot name="tabs" />
    </view>

    <!-- 内容滚动区 -->
    <scroll-view class="as-page-shell__content" scroll-y :style="contentStyle">
      <slot />
    </scroll-view>

    <!-- 底部插槽（对话栏/操作栏） -->
    <view v-if="$slots.footer" class="as-page-shell__footer">
      <slot name="footer" />
    </view>
    <!-- 底部安全区占位 -->
    <view class="as-page-shell__safe-bottom"></view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SvgIcon from './SvgIcon.vue'

type NavType = 'standard' | 'transparent' | 'white'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  navType?: NavType
  showNav?: boolean
  back?: boolean
  contentPadding?: number
}>(), {
  title: '',
  subtitle: '',
  navType: 'standard',
  showNav: true,
  back: false,
  contentPadding: 24
})

const emit = defineEmits<{
  back: []
}>()

// transparent 导航下文字用深色（叠在页面背景上）；white/standard 同样用主文本色
const navIconColor = '#0a1733'

const contentStyle = computed(() => ({
  padding: `${props.contentPadding}rpx`
}))

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.as-page-shell {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: $bg-page;
  z-index: $z-base;
}

/* ===== 安全区占位 ===== */
.as-page-shell__safe-top {
  height: $safe-top;
  flex-shrink: 0;
}

.as-page-shell__safe-bottom {
  height: $safe-bottom;
  flex-shrink: 0;
}

/* ===== 导航栏 ===== */
.as-page-shell__nav {
  flex-shrink: 0;
}

.as-page-shell__nav-inner {
  display: flex;
  align-items: center;
  min-height: 88rpx;
  padding: 0 $s-4;
  gap: $s-2;
}

.as-page-shell__back {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $r-full;
  flex-shrink: 0;
}

.as-page-shell__back:active {
  background: $bg-soft;
}

.as-page-shell__nav-titles {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.as-page-shell__title {
  font-size: $font-size-md;
  font-weight: 700;
  color: $ink;
  line-height: $lh-tight;
}

.as-page-shell__subtitle {
  font-size: $font-size-xs;
  color: $ink-soft;
  margin-top: 2rpx;
}

.as-page-shell__nav-extra {
  flex-shrink: 0;
  margin-left: $s-2;
}

/* ===== 导航类型变体 ===== */
.as-page-shell--standard .as-page-shell__nav-inner {
  background: $bg-card;
  border-bottom: 2rpx solid $line;
}

.as-page-shell--white .as-page-shell__nav-inner {
  background: $bg-card;
  border-bottom: 2rpx solid $line;
  min-height: 120rpx;
}

.as-page-shell--transparent .as-page-shell__nav-inner {
  background: transparent;
  border-bottom: none;
}

/* ===== 标签栏插槽 ===== */
.as-page-shell__tabs {
  flex-shrink: 0;
  background: $bg-card;
  border-bottom: 2rpx solid $line;
}

/* ===== 内容滚动区 ===== */
.as-page-shell__content {
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
}

/* ===== 底部插槽 ===== */
.as-page-shell__footer {
  flex-shrink: 0;
}
</style>
