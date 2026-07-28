<template>
  <view class="as-footer">
    <slot>
      <text class="as-footer__text">{{ text }}</text>
    </slot>
  </view>
</template>

<script setup lang="ts">
/**
 * Footer 页脚
 * 居中展示产品标识，灰色小字。可通过 default slot 覆盖内容。
 */
withDefaults(defineProps<{
  /** 页脚文案 */
  text?: string
}>(), {
  text: 'AI Stock · 智能投顾'
})
</script>

<style lang="scss" scoped>
.as-footer {
  padding: $s-4 $s-3;
  margin-top: $s-5;
  text-align: center;
}

.as-footer__text {
  font-size: $font-size-xs;
  color: $ink-mute;
  line-height: $lh-base;
}
</style>
