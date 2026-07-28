<template>
  <view class="as-global-chat-bar" :style="rootStyle">
    <view class="as-global-chat-bar__row">
      <!-- 左侧返回箭头（仅在面板页显示） -->
      <view v-if="showBack" class="as-global-chat-bar__back" @click="handleBack">
        <view class="as-global-chat-bar__back-icon"></view>
      </view>

      <!-- AI 对话入口胶囊 -->
      <view class="as-global-chat-bar__capsule" @click="handleChatTap">
        <!-- AI 头像 -->
        <view class="as-global-chat-bar__avatar">
          <text class="as-global-chat-bar__avatar-text">AI</text>
        </view>

        <!-- 输入提示 -->
        <text class="as-global-chat-bar__placeholder">{{ placeholder }}</text>

        <!-- 未读数 -->
        <view v-if="unreadCount > 0" class="as-global-chat-bar__unread">
          <text class="as-global-chat-bar__unread-text">{{ unreadCount }}</text>
        </view>

        <!-- 发送按钮 -->
        <view class="as-global-chat-bar__send" @click.stop="handleChatTap">
          <view class="as-global-chat-bar__send-icon" :style="{ backgroundImage: `url('${sendIcon}')` }" />
        </view>
      </view>
    </view>

    <!-- 底部免责声明 -->
    <view v-if="showDisclaimer" class="as-global-chat-bar__disclaimer">
      <text class="as-global-chat-bar__disclaimer-text">内容由AI生成，不构成投资建议</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { rpxToVw } from '@/utils/rpx'

/**
 * GlobalChatBar 全局 AI 对话入口
 * 悬浮在页面底部，默认展示 AI 头像与输入提示，点击展开对话。
 * 在面板页面中左侧出现返回箭头。胶囊圆角，fixed 于安全区底部。
 * 从 app 前端 GlobalChatBar.vue 改造：移除 uni.navigateTo / uni.navigateBack，
 * 改为通过 chat-tap、back-tap 事件向外抛出，由父组件处理。
 */
const props = withDefaults(defineProps<{
  /** 输入提示文案 */
  placeholder?: string
  /** 是否显示左侧返回箭头（面板页场景） */
  showBack?: boolean
  /** 未读消息数，>0 时显示徽章 */
  unreadCount?: number
  /** 是否显示底部免责声明 */
  showDisclaimer?: boolean
  /** 安全区底部补偿 */
  paddingBottom?: string
}>(), {
  placeholder: '问点什么…',
  showBack: false,
  unreadCount: 0,
  showDisclaimer: true,
  paddingBottom: 'calc(env(safe-area-inset-bottom) + 8rpx)'
})

/** rpx → vw 转换：内联样式中的 rpx 需手动转换 */
const rootStyle = computed(() => ({
  paddingBottom: rpxToVw(props.paddingBottom)
}))

const emit = defineEmits<{
  /** 点击对话入口（胶囊区/发送按钮） */
  chatTap: []
  /** 点击返回箭头 */
  backTap: []
}>()

const handleChatTap = () => {
  emit('chatTap')
}

const handleBack = () => {
  emit('backTap')
}

/* 发送按钮图标：内联 SVG data URI（白色向上箭头） */
const sendIcon = computed(() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
})
</script>

<style lang="scss" scoped>
.as-global-chat-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-fixed + 1;
  padding-top: $s-1;
  background: $bg-page;
}

.as-global-chat-bar__row {
  display: flex;
  align-items: center;
  padding: 0 $s-3;
  gap: $s-2;
}

/* 左侧返回按钮 */
.as-global-chat-bar__back {
  flex-shrink: 0;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-card;
  border-radius: $r-full;
  border: 2rpx solid rgba($primary, 0.15);
  box-shadow: $shadow-sm;
}

.as-global-chat-bar__back:active {
  background: $bg-soft;
}

/* CSS 绘制返回箭头 */
.as-global-chat-bar__back-icon {
  position: relative;
  width: 20rpx;
  height: 20rpx;
}

.as-global-chat-bar__back-icon::before {
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

/* 胶囊容器 */
.as-global-chat-bar__capsule {
  flex: 1;
  height: 80rpx;
  display: flex;
  align-items: center;
  padding: 0 $s-2 0 $s-1;
  gap: $s-2;
  background: $bg-card;
  border: 2rpx solid rgba($primary, 0.15);
  border-radius: $r-full;
  box-shadow: $shadow-hover;
}

.as-global-chat-bar__capsule:active {
  opacity: $op-active;
}

/* AI 头像：30x30(px 等效) 渐变圆 */
.as-global-chat-bar__avatar {
  flex-shrink: 0;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $r-full;
  background: linear-gradient(135deg, $primary, $accent);
}

.as-global-chat-bar__avatar-text {
  font-size: $font-size-xs;
  font-weight: 600;
  color: $white;
  line-height: 1;
}

/* 输入提示 */
.as-global-chat-bar__placeholder {
  flex: 1;
  font-size: $font-size-sm;
  color: $ink-mute;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 未读徽章 */
.as-global-chat-bar__unread {
  flex-shrink: 0;
  min-width: 32rpx;
  height: 32rpx;
  padding: 0 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary-50;
  border-radius: $r-full;
}

.as-global-chat-bar__unread-text {
  font-size: $font-size-xs;
  color: $primary;
  font-weight: 600;
  line-height: 1;
}

/* 发送按钮：32x32(px 等效) 主色圆 */
.as-global-chat-bar__send {
  flex-shrink: 0;
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $r-full;
  background: $primary;
  box-shadow: $shadow-primary;
}

.as-global-chat-bar__send:active {
  opacity: $op-active;
}

.as-global-chat-bar__send-icon {
  width: 32rpx;
  height: 32rpx;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 免责声明 */
.as-global-chat-bar__disclaimer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44rpx;
}

.as-global-chat-bar__disclaimer-text {
  font-size: $font-size-xs;
  color: $ink-faint;
}
</style>
