<template>
  <view
    class="as-page-header"
    :class="{
      'is-transparent': transparent
    }"
  >
    <view class="as-page-header__left">
      <view
        v-if="back"
        class="as-page-header__back"
        @click="handleBack"
      >
        <SvgIcon name="arrow-left" :size="'36rpx'" color="#4b5a7a" />
      </view>
      <view class="as-page-header__info">
        <text v-if="title" class="as-page-header__title">{{ title }}</text>
        <text v-if="subtitle" class="as-page-header__subtitle">{{ subtitle }}</text>
      </view>
    </view>
    <view class="as-page-header__extra">
      <slot name="extra" />
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  back?: boolean
  transparent?: boolean
}>(), {
  title: '',
  subtitle: '',
  back: false,
  transparent: false
})

const emit = defineEmits<{
  back: []
}>()

const handleBack = () => {
  if (props.back) {
    emit('back')
  }
}
</script>

<style lang="scss" scoped>
.as-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-4 $s-5;
  background: $bg-card;
  border-bottom: 2rpx solid $line-soft;
  min-height: 100rpx;
}

.as-page-header.is-transparent {
  background: transparent;
  border-bottom: none;
}

.as-page-header__left {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.as-page-header__back {
  flex-shrink: 0;
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $r-full;
  margin-right: $s-2;
  cursor: pointer;
}

.as-page-header__back:active {
  background: $bg-soft;
}

.as-page-header__info {
  flex: 1;
  min-width: 0;
}

.as-page-header__title {
  display: block;
  font-size: $font-size-xl;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
}

.as-page-header__subtitle {
  display: block;
  font-size: $font-size-sm;
  color: $ink-soft;
  margin-top: $s-1;
  line-height: $lh-base;
}

.as-page-header__extra {
  flex-shrink: 0;
  margin-left: $s-4;
  display: flex;
  align-items: center;
  gap: $s-2;
}
</style>