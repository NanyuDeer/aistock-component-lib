<template>
  <view class="as-nav-bar" :style="{ paddingTop: paddingTop }">
    <view class="as-nav-bar__inner" :class="{ 'as-nav-bar__inner--subtitle': subtitle }">
      <!-- 左侧：默认返回按钮，可通过 left slot 覆盖 -->
      <view class="as-nav-bar__left">
        <slot name="left">
          <view v-if="showBack" class="as-nav-bar__back" @click="handleBack">
            <view class="as-nav-bar__back-icon"></view>
          </view>
        </slot>
      </view>

      <!-- 中间：标题区，可通过 default slot 覆盖 -->
      <view class="as-nav-bar__center">
        <slot>
          <view class="as-nav-bar__title-wrap">
            <text v-if="title" class="as-nav-bar__title">{{ title }}</text>
            <text v-if="subtitle" class="as-nav-bar__subtitle">{{ subtitle }}</text>
          </view>
        </slot>
      </view>

      <!-- 右侧操作区 -->
      <view class="as-nav-bar__right">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * NavBar 顶部导航栏
 * 承载返回按钮、页面标题与右侧操作，适配安全区（刘海屏）。
 * 状态栏高度通过 paddingTop prop 传入，组件内不调用 uni API。
 */
withDefaults(defineProps<{
  /** 主标题 */
  title?: string
  /** 副标题，存在时导航栏高度增加 */
  subtitle?: string
  /** 是否显示返回按钮 */
  showBack?: boolean
  /** 状态栏高度占位，如 '44px' */
  paddingTop?: string
}>(), {
  title: '',
  subtitle: '',
  showBack: false,
  paddingTop: '0px'
})

const emit = defineEmits<{
  /** 点击返回按钮 */
  back: []
}>()

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.as-nav-bar {
  background: $bg-card;
  border-bottom: 2rpx solid $line-soft;
  flex-shrink: 0;
}

.as-nav-bar__inner {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 $s-3;
}

/* 有副标题时增加高度 */
.as-nav-bar__inner--subtitle {
  height: 120rpx;
}

/* ===== 左侧 ===== */
.as-nav-bar__left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: 64rpx;
}

.as-nav-bar__back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  border-radius: $r-full;
}

.as-nav-bar__back:active {
  background: $bg-soft;
}

/* CSS 绘制返回箭头（‹） */
.as-nav-bar__back-icon {
  position: relative;
  width: 20rpx;
  height: 20rpx;
}

.as-nav-bar__back-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 20rpx;
  height: 20rpx;
  border-left: 4rpx solid $ink;
  border-bottom: 4rpx solid $ink;
  transform: rotate(45deg);
}

/* ===== 中间标题 ===== */
.as-nav-bar__center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
}

.as-nav-bar__title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}

.as-nav-bar__title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-nav-bar__subtitle {
  font-size: $font-size-xs;
  color: $ink-mute;
  margin-top: 2rpx;
  line-height: $lh-tight;
}

/* ===== 右侧 ===== */
.as-nav-bar__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  min-width: 64rpx;
}
</style>
