<template>
  <view
    class="as-toolbar"
    :class="{
      'is-sticky': sticky
    }"
  >
    <view class="as-toolbar__left">
      <text v-if="title" class="as-toolbar__title">{{ title }}</text>
      <slot />
    </view>
    <view class="as-toolbar__right">
      <slot name="right" />
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  sticky?: boolean
}>(), {
  title: '',
  sticky: false
})
</script>

<style lang="scss" scoped>
.as-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $s-3 $s-5;
  background: $bg-card;
  border-bottom: 2rpx solid $line-soft;
  gap: $s-3;
}

.as-toolbar.is-sticky {
  position: sticky;
  top: 0;
  z-index: $z-sticky;
}

.as-toolbar__left {
  display: flex;
  align-items: center;
  gap: $s-2;
  flex: 1;
  min-width: 0;
}

.as-toolbar__title {
  font-size: $font-size-md;
  font-weight: 600;
  color: $ink;
  flex-shrink: 0;
  margin-right: $s-2;
}

.as-toolbar__right {
  display: flex;
  align-items: center;
  gap: $s-2;
  flex-shrink: 0;
}
</style>