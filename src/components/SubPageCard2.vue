<template>
  <view class="as-sub-page-card-2" :style="{ paddingTop: paddingTop }">
    <!-- 白色导航栏 -->
    <view
      class="as-sub-page-card-2__nav"
      :class="{ 'as-sub-page-card-2__nav--subtitle': subtitle }"
    >
      <view class="as-sub-page-card-2__nav-left">
        <view v-if="showBack" class="as-sub-page-card-2__back" @click="handleBack">
          <view class="as-sub-page-card-2__back-icon"></view>
        </view>
        <view class="as-sub-page-card-2__title-wrap">
          <text v-if="title" class="as-sub-page-card-2__title">{{ title }}</text>
          <text v-if="subtitle" class="as-sub-page-card-2__subtitle">{{ subtitle }}</text>
        </view>
      </view>
      <view v-if="$slots['header-right']" class="as-sub-page-card-2__nav-right">
        <slot name="header-right" />
      </view>
    </view>

    <!-- 内容区：scroll-view 承载，底部可选 footer -->
    <view class="as-sub-page-card-2__body">
      <scroll-view class="as-sub-page-card-2__scroll" scroll-y>
        <slot />
      </scroll-view>
      <view v-if="$slots.footer" class="as-sub-page-card-2__footer">
        <slot name="footer" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * SubPageCard2 白色导航栏子页面容器
 * fixed 铺满屏幕，白色导航栏 + 标题/副标题，内容区用 scroll-view 承载。
 * 从 app 前端 SubPageCard2.vue 改造：移除内嵌 GlobalChatBar 依赖，
 * 移除 uni.getSystemInfoSync / uni.navigateBack 调用，
 * 状态栏高度通过 paddingTop prop 传入，返回通过 back 事件抛出。
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
  showBack: true,
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
.as-sub-page-card-2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: $bg-card;
}

/* ===== 白色导航栏 ===== */
.as-sub-page-card-2__nav {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  padding: 0 $s-3;
  background: $bg-card;
  border-bottom: 2rpx solid $line-soft;
}

/* 有副标题时导航栏更高 */
.as-sub-page-card-2__nav--subtitle {
  height: 120rpx;
}

.as-sub-page-card-2__nav-left {
  display: flex;
  align-items: center;
  gap: $s-1;
  flex: 1;
  min-width: 0;
}

.as-sub-page-card-2__back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  border-radius: $r-full;
  flex-shrink: 0;
}

.as-sub-page-card-2__back:active {
  background: $bg-soft;
}

/* CSS 绘制返回箭头（‹） */
.as-sub-page-card-2__back-icon {
  position: relative;
  width: 20rpx;
  height: 20rpx;
}

.as-sub-page-card-2__back-icon::before {
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

.as-sub-page-card-2__title-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.as-sub-page-card-2__title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.as-sub-page-card-2__subtitle {
  font-size: $font-size-xs;
  color: $ink-soft;
  margin-top: 4rpx;
  line-height: $lh-tight;
}

.as-sub-page-card-2__nav-right {
  flex-shrink: 0;
}

/* ===== 内容区 ===== */
.as-sub-page-card-2__body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.as-sub-page-card-2__scroll {
  flex: 1;
  min-height: 0;
  background: $bg-page;
}

.as-sub-page-card-2__footer {
  flex-shrink: 0;
}
</style>
