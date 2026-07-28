<template>
  <view class="as-tab-bar">
    <view
      v-for="tab in tabs"
      :key="tab.id"
      class="as-tab-bar__item"
      :class="{ 'as-tab-bar__item--active': activeTab === tab.id }"
      @click="handleTabTap(tab)"
    >
      <view class="as-tab-bar__icon-wrap">
        <SvgIcon
          :name="tab.icon"
          size="28rpx"
          :color="activeTab === tab.id ? activeColor : inactiveColor"
        />
        <!-- 红点徽章 -->
        <view v-if="tab.badge === 'dot'" class="as-tab-bar__badge-dot"></view>
        <!-- 数字徽章 -->
        <view v-else-if="tab.badge" class="as-tab-bar__badge-num">
          <text class="as-tab-bar__badge-num-text">{{ tab.badge }}</text>
        </view>
      </view>
      <text v-if="activeTab === tab.id" class="as-tab-bar__text">{{ tab.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

/**
 * TabBar 底部标签栏
 * 用于主要功能模块间切换，选中态主色高亮 + 胶囊背景。
 * 从 app 前端 AppBottomBar.vue 改造：移除硬编码 tab 列表与路由跳转，
 * 改为通过 props 传入 tabs 配置，通过 change 事件向外抛出选中项。
 */
interface TabItem {
  /** tab 唯一标识 */
  id: string
  /** tab 名称 */
  name: string
  /** SvgIcon 图标名称 */
  icon: string
  /** 徽章：'dot' 为红点，数字字符串为数字徽章 */
  badge?: string
}

const props = withDefaults(defineProps<{
  /** tab 列表配置 */
  tabs: TabItem[]
  /** 当前激活的 tab id */
  activeTab?: string
}>(), {
  tabs: () => [],
  activeTab: ''
})

const emit = defineEmits<{
  /** 切换 tab，payload 为目标 tab id */
  (e: 'change', tabId: string): void
}>()

/* 选中/未选中图标色（对应 $primary / $ink-mute，SVG 需传字面色值） */
const activeColor = '#0b5fff'
const inactiveColor = '#8a96b0'

const handleTabTap = (tab: TabItem) => {
  if (props.activeTab === tab.id) return
  emit('change', tab.id)
}
</script>

<style lang="scss" scoped>
.as-tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: $s-2 $s-4 0;
  padding-bottom: calc(#{$s-1} + #{$safe-bottom});
  background: $bg-page;
}

.as-tab-bar__item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56rpx;
  padding: 0 $s-1;
  border-radius: $r-full;
  transition: all $t-base;

  /* 选中项：淡蓝胶囊背景 + 文字 */
  &.as-tab-bar__item--active {
    background: rgba($primary, 0.15);
    padding: 0 $s-3;
    gap: $s-1;
  }
}

.as-tab-bar__icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 红点徽章 */
.as-tab-bar__badge-dot {
  position: absolute;
  top: -2rpx;
  right: -2rpx;
  width: 14rpx;
  height: 14rpx;
  background: $up;
  border-radius: $r-full;
  border: 2rpx solid $bg-page;
}

/* 数字徽章 */
.as-tab-bar__badge-num {
  position: absolute;
  top: -10rpx;
  right: -16rpx;
  min-width: 28rpx;
  height: 28rpx;
  padding: 0 6rpx;
  background: $up;
  border-radius: $r-full;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid $bg-page;
}

.as-tab-bar__badge-num-text {
  font-size: 18rpx;
  color: $white;
  line-height: 1;
}

.as-tab-bar__text {
  font-size: $font-size-xs;
  font-weight: 600;
  color: $primary;
  line-height: 1;
  white-space: nowrap;
}
</style>
