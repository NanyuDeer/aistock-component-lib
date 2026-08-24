<template>
  <view class="as-importance-stars" :class="`is-${size}`">
    <text
      v-for="i in max"
      :key="i"
      class="as-importance-stars__star"
      :class="{ 'is-active': i <= value }"
    >&#9733;</text>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
}>(), {
  max: 5,
  size: 'md'
})
</script>

<style lang="scss" scoped>
.as-importance-stars {
  display: inline-flex;
  align-items: center;
  gap: 2rpx;
}

.as-importance-stars__star {
  color: $ink-faint;
  line-height: 1;
  transition: color $t-fast;

  &.is-active {
    color: $gold;
  }
}

/* Sizes */
.as-importance-stars.is-sm .as-importance-stars__star {
  font-size: 24rpx;
}

.as-importance-stars.is-md .as-importance-stars__star {
  font-size: 32rpx;
}

.as-importance-stars.is-lg .as-importance-stars__star {
  font-size: 40rpx;
}
</style>