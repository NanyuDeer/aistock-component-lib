<template>
  <view class="as-dropdown" @touchstart="onTrigger">
    <!-- Trigger slot -->
    <view class="as-dropdown__trigger">
      <slot />
    </view>

    <!-- Menu overlay -->
    <view
      v-if="visible"
      class="as-dropdown__overlay"
      @click="close"
      @touchstart="close"
    />
    <view
      v-if="visible"
      class="as-dropdown__menu"
      :class="`as-dropdown__menu--${placement}`"
    >
      <view
        v-for="(item, index) in items"
        :key="index"
        class="as-dropdown__menu-item"
        :class="{
          'as-dropdown__menu-item--disabled': item.disabled,
          'as-dropdown__menu-item--divided': item.divided
        }"
        @click="handleSelect(item)"
      >
        <text class="as-dropdown__menu-label">{{ item.label }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface DropdownItem {
  label: string
  value: string
  disabled?: boolean
  divided?: boolean
}

type DropdownPlacement = 'bottom-start' | 'bottom-end'

const props = withDefaults(defineProps<{
  trigger?: 'click' | 'hover'
  items: DropdownItem[]
  placement?: DropdownPlacement
}>(), {
  trigger: 'click',
  placement: 'bottom-start'
})

const emit = defineEmits<{
  select: [value: string]
  'visible-change': [visible: boolean]
}>()

const visible = ref(false)

function open() {
  visible.value = true
  emit('visible-change', true)
}

function close() {
  visible.value = false
  emit('visible-change', false)
}

function onTrigger() {
  if (props.trigger === 'click') {
    visible.value = !visible.value
  }
}

function handleSelect(item: DropdownItem) {
  if (item.disabled) return
  emit('select', item.value)
  close()
}
</script>

<style lang="scss" scoped>
.as-dropdown {
  position: relative;
  display: inline-block;
}

.as-dropdown__trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.as-dropdown__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-dropdown - 1;
}

.as-dropdown__menu {
  position: absolute;
  z-index: $z-dropdown;
  min-width: 160rpx;
  background: $white;
  border-radius: $r-sm;
  box-shadow: $shadow-card;
  padding: $s-1 0;
  margin-top: $s-1;
  animation: as-dropdown-fade-in $t-fast;
}

.as-dropdown__menu--bottom-start {
  left: 0;
  top: 100%;
}

.as-dropdown__menu--bottom-end {
  right: 0;
  top: 100%;
}

.as-dropdown__menu-item {
  display: flex;
  align-items: center;
  padding: $s-2 $s-3;
  cursor: pointer;
  transition: background $t-fast;
  position: relative;
}

.as-dropdown__menu-item:active {
  background: $bg-soft;
}

.as-dropdown__menu-item--disabled {
  opacity: $op-disabled;
  cursor: not-allowed;
  pointer-events: none;
}

.as-dropdown__menu-item--divided {
  margin-top: $s-1;
  border-top: 1px solid $line;
}

.as-dropdown__menu-label {
  font-size: $font-size-xs;
  color: $ink;
  line-height: $lh-tight;
  white-space: nowrap;
}

@keyframes as-dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>