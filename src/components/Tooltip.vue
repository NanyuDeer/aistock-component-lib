<template>
  <view class="as-tooltip">
    <view class="as-tooltip__trigger" @click="handleToggle">
      <slot />
    </view>
    <view v-if="visible" class="as-tooltip__content" :class="`as-tooltip__content--${placement}`" @click.stop>
      <text class="as-tooltip__text">{{ content }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

withDefaults(defineProps<{
  content: string
  placement?: TooltipPlacement
}>(), {
  placement: 'top'
})

const visible = ref(false)

const handleToggle = () => {
  visible.value = !visible.value
}
</script>

<style lang="scss" scoped>
.as-tooltip {
  position: relative;
  display: inline-block;
}

.as-tooltip__trigger {
  display: inline-block;
}

.as-tooltip__content {
  position: absolute;
  z-index: $z-tooltip;
  background: $ink;
  border-radius: $r-sm;
  padding: $s-1 $s-2;
  white-space: nowrap;
  animation: as-tooltip-fade 0.2s $ease-out;
}

@keyframes as-tooltip-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.as-tooltip__content--top {
  bottom: calc(100% + #{$s-2});
  left: 50%;
  transform: translateX(-50%);
}

.as-tooltip__content--bottom {
  top: calc(100% + #{$s-2});
  left: 50%;
  transform: translateX(-50%);
}

.as-tooltip__content--left {
  right: calc(100% + #{$s-2});
  top: 50%;
  transform: translateY(-50%);
}

.as-tooltip__content--right {
  left: calc(100% + #{$s-2});
  top: 50%;
  transform: translateY(-50%);
}

.as-tooltip__text {
  font-size: $font-size-xs;
  color: $white;
}
</style>