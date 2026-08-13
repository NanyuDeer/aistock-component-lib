<template>
  <view class="as-steps">
    <template v-for="(step, index) in steps" :key="index">
      <view class="as-steps__item" :class="getStepClass(index)">
        <view class="as-steps__indicator">
          <text v-if="index < current" class="as-steps__icon">&#10003;</text>
          <text v-else class="as-steps__num">{{ index + 1 }}</text>
        </view>
        <view class="as-steps__content">
          <text class="as-steps__title">{{ step.title }}</text>
          <text v-if="step.description" class="as-steps__desc">{{ step.description }}</text>
        </view>
      </view>
      <view
        v-if="index < steps.length - 1"
        class="as-steps__connector"
        :class="{ 'as-steps__connector--done': index < current }"
      />
    </template>
  </view>
</template>

<script setup lang="ts">
export interface StepItem {
  title: string
  description?: string
}

const props = withDefaults(defineProps<{
  steps: StepItem[]
  current?: number
}>(), {
  current: 0
})

function getStepClass(index: number): Record<string, boolean> {
  return {
    'as-steps__item--done': index < props.current,
    'as-steps__item--current': index === props.current,
    'as-steps__item--pending': index > props.current
  }
}
</script>

<style lang="scss" scoped>
.as-steps {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.as-steps__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.as-steps__indicator {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-sm;
  font-weight: 600;
  line-height: 1;
  transition: all $t-base;
}

.as-steps__icon {
  color: $white;
  font-size: $font-size-sm;
}

.as-steps__num {
  font-size: $font-size-sm;
  font-weight: 600;
}

/* done */
.as-steps__item--done .as-steps__indicator {
  background: $down;
  color: $white;
}

/* current */
.as-steps__item--current .as-steps__indicator {
  background: $primary;
  color: $white;
  box-shadow: $shadow-glow;
}

/* pending */
.as-steps__item--pending .as-steps__indicator {
  background: transparent;
  border: 2rpx solid $ink-faint;
  color: $ink-faint;
}

.as-steps__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: $s-1;
  text-align: center;
}

.as-steps__title {
  font-size: $font-size-xs;
  font-weight: 600;
  color: $ink;
  line-height: $lh-tight;
  white-space: nowrap;
}

.as-steps__item--pending .as-steps__title {
  color: $ink-mute;
}

.as-steps__item--done .as-steps__title {
  color: $ink-soft;
}

.as-steps__desc {
  font-size: 20rpx;
  color: $ink-mute;
  line-height: $lh-tight;
  margin-top: 4rpx;
}

/* Connector line */
.as-steps__connector {
  flex: 0 0 auto;
  width: 60rpx;
  height: 2rpx;
  background: $ink-faint;
  margin-top: 20rpx;
  align-self: flex-start;
  transition: background $t-base;
}

.as-steps__connector--done {
  background: $down;
}
</style>