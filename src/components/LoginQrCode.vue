<template>
  <view class="as-login-qr">
    <view class="as-login-qr__box">
      <!-- 二维码区域 -->
      <image
        v-if="qrData && !expired"
        class="as-login-qr__image"
        :src="qrData"
        mode="aspectFit"
      />
      <view
        v-else-if="!expired"
        class="as-login-qr__grid"
      >
        <view
          v-for="(cell, i) in qrCells"
          :key="i"
          class="as-login-qr__cell"
          :class="{ 'is-off': !cell }"
        />
      </view>
      <!-- 过期遮罩 -->
      <view v-if="expired" class="as-login-qr__overlay">
        <text class="as-login-qr__overlay-text">二维码已过期</text>
        <view class="as-login-qr__refresh-btn" @tap="handleRefresh">
          <text class="as-login-qr__refresh-btn-text">刷新二维码</text>
        </view>
      </view>
    </view>
    <text class="as-login-qr__title">{{ title }}</text>
    <text class="as-login-qr__desc">{{ desc }}</text>
    <view class="as-login-qr__refresh" @tap="handleRefresh">
      <text class="as-login-qr__refresh-link">刷新二维码</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  desc?: string
  expired?: boolean
  qrData?: string
}>(), {
  title: '扫码登录',
  desc: '使用 App 扫描二维码登录',
  expired: false,
  qrData: ''
})

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

// 生成随机二维码格子（用于 CSS 模拟）
const qrCells = ref<boolean[]>([])

function generateQrCells(): void {
  const cells: boolean[] = []
  for (let i = 0; i < 64; i++) {
    // 随机黑白格子，黑格子概率约 65%
    cells.push(Math.random() < 0.65)
  }
  qrCells.value = cells
}

function handleRefresh(): void {
  emit('refresh')
}

onMounted(() => {
  if (!props.qrData) {
    generateQrCells()
  }
})
</script>

<style lang="scss" scoped>
.as-login-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $s-2;
  padding: $s-5;
  background: $bg-card;
  border-radius: $r-xl;
  border: 2rpx solid $line;
}

.as-login-qr__box {
  position: relative;
  width: 320rpx;
  height: 320rpx;
  background: $white;
  border: 2rpx solid $line;
  border-radius: $r-md;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-login-qr__image {
  width: 100%;
  height: 100%;
}

.as-login-qr__grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 4rpx;
  padding: 16rpx;
  width: 100%;
  height: 100%;
}

.as-login-qr__cell {
  border-radius: 2rpx;
  background: $ink;

  &.is-off {
    background: transparent;
  }
}

.as-login-qr__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $s-3;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8rpx);
}

.as-login-qr__overlay-text {
  font-size: $font-size-base;
  color: $ink-soft;
  font-weight: 500;
}

.as-login-qr__refresh-btn {
  padding: $s-1 $s-4;
  background: $primary;
  border-radius: $r-full;

  .as-login-qr__refresh-btn-text {
    font-size: $font-size-sm;
    color: $white;
    font-weight: 500;
  }
}

.as-login-qr__title {
  font-size: $font-size-lg;
  color: $ink;
  font-weight: 700;
  margin-top: $s-2;
}

.as-login-qr__desc {
  font-size: $font-size-sm;
  color: $ink-soft;
}

.as-login-qr__refresh {
  margin-top: $s-1;
}

.as-login-qr__refresh-link {
  font-size: $font-size-sm;
  color: $primary;
  font-weight: 500;
}
</style>