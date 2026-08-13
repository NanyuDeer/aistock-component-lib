<template>
  <view
    class="as-guide-card"
    :class="`is-${theme}`"
    @click="handleAction"
  >
    <view class="as-guide-card__content">
      <text class="as-guide-card__title">{{ title }}</text>
      <text class="as-guide-card__desc">{{ desc }}</text>
    </view>
    <view
      v-if="actionText"
      class="as-guide-card__action"
      :class="`is-${theme}`"
    >{{ actionText }}</view>
    <text class="as-guide-card__arrow">&#8250;</text>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  desc: string
  theme?: 'primary' | 'accent' | 'gold'
  actionText?: string
}>(), {
  theme: 'primary',
  actionText: ''
})

const emit = defineEmits<{
  action: []
}>()

const handleAction = () => {
  emit('action')
}
</script>

<style lang="scss" scoped>
.as-guide-card {
  display: flex;
  align-items: center;
  gap: $s-2;
  padding: $s-3;
  border-radius: $r-lg;
  box-shadow: $shadow-card;
  cursor: pointer;
  user-select: none;
  transition: all $t-base;
}

.as-guide-card:active {
  transform: scale(0.99);
  opacity: $op-active;
}

/* ===== Themes ===== */
.as-guide-card.is-primary {
  background: $brand-gradient;
}

.as-guide-card.is-accent {
  background: linear-gradient(135deg, $accent, $primary);
}

.as-guide-card.is-gold {
  background: $gradient-golden;
}

/* ===== Content ===== */
.as-guide-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $s-1;
  min-width: 0;
}

.as-guide-card__title {
  font-size: $font-size-base;
  font-weight: 700;
  color: $white;
  line-height: $lh-tight;
}

.as-guide-card__desc {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.8);
  line-height: $lh-base;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== Action Button ===== */
.as-guide-card__action {
  flex-shrink: 0;
  font-size: $font-size-xs;
  font-weight: 600;
  padding: $s-1 $s-3;
  border-radius: $r-full;
  line-height: 1.4;
  border: 2rpx solid $white;

  &.is-primary,
  &.is-accent {
    background: $white;
    color: $primary;
  }

  &.is-gold {
    background: transparent;
    color: $white;
  }
}

/* ===== Arrow ===== */
.as-guide-card__arrow {
  flex-shrink: 0;
  font-size: $font-size-xl;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1;
  padding-left: $s-1;
}
</style>