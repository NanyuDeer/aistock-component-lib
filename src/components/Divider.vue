<template>
  <view
    v-if="type === 'horizontal'"
    class="as-divider as-divider--horizontal"
    :class="{ 'as-divider--dashed': dashed }"
  >
    <view
      v-if="text"
      class="as-divider__text-wrapper"
      :class="`as-divider__text-wrapper--${textPosition}`"
    >
      <view class="as-divider__line as-divider__line--left" />
      <text class="as-divider__text">{{ text }}</text>
      <view class="as-divider__line as-divider__line--right" />
    </view>
  </view>
  <view
    v-else
    class="as-divider as-divider--vertical"
    :class="{ 'as-divider--dashed': dashed }"
  />
</template>

<script setup lang="ts">
type DividerType = 'horizontal' | 'vertical'
type TextPosition = 'left' | 'center' | 'right'

withDefaults(defineProps<{
  type?: DividerType
  dashed?: boolean
  text?: string
  textPosition?: TextPosition
}>(), {
  type: 'horizontal',
  dashed: false,
  textPosition: 'center'
})
</script>

<style lang="scss" scoped>
.as-divider--horizontal {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1px;
  margin: $s-4 0;
  background: $line;
  position: relative;

  &.as-divider--dashed {
    background: none;
    border-top: 1px dashed $line;
    height: 0;
  }
}

.as-divider__text-wrapper {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
}

.as-divider__text-wrapper--left {
  left: 0;
}

.as-divider__text-wrapper--center {
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.as-divider__text-wrapper--right {
  right: 0;
}

.as-divider__line {
  height: 1px;
  background: $line;
  min-width: 24rpx;
}

.as-divider__text {
  font-size: $font-size-xs;
  color: $ink-mute;
  padding: 0 $s-2;
  background: $bg-card;
  line-height: $lh-tight;
}

.as-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 1em;
  background: $line;
  vertical-align: middle;
  margin: 0 $s-2;

  &.as-divider--dashed {
    background: none;
    border-left: 1px dashed $line;
    width: 0;
    height: 1.2em;
  }
}
</style>