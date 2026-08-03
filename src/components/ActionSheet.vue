<template>
  <view v-if="isOpen" class="as-action-sheet" @click="handleMaskClick">
    <view class="as-action-sheet__mask"></view>
    <view class="as-action-sheet__container" @click.stop>
      <view
        v-for="action in actions"
        :key="action.key"
        class="as-action-sheet__item"
        :class="{ 'is-danger': action.danger }"
        @click="handleSelect(action)"
      >
        <text class="as-action-sheet__item-text">{{ action.label }}</text>
      </view>
      <view class="as-action-sheet__gap"></view>
      <view class="as-action-sheet__cancel" @click="handleCancel">
        <text class="as-action-sheet__cancel-text">{{ cancelText }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface ActionItem {
  key: string
  label: string
  danger?: boolean
}

const props = withDefaults(defineProps<{
  open?: boolean
  actions: ActionItem[]
  cancelText?: string
}>(), {
  open: false,
  cancelText: '取消'
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  select: [action: ActionItem]
  cancel: []
}>()

const isOpen = ref(props.open)

watch(() => props.open, (val) => {
  isOpen.value = val
})

const handleMaskClick = () => {
  handleClose()
}

const handleClose = () => {
  isOpen.value = false
  emit('update:open', false)
}

const handleSelect = (action: ActionItem) => {
  isOpen.value = false
  emit('update:open', false)
  emit('select', action)
}

const handleCancel = () => {
  isOpen.value = false
  emit('update:open', false)
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.as-action-sheet {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-drawer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.as-action-sheet__mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $overlay-base;
  animation: as-action-sheet-fade 0.25s $ease-out;
}

@keyframes as-action-sheet-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.as-action-sheet__container {
  position: relative;
  padding: 0 $s-4 $s-4;
  animation: as-action-sheet-slide 0.3s $ease-out;
}

@keyframes as-action-sheet-slide {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.as-action-sheet__item {
  background: $bg-card;
  padding: $s-4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-action-sheet__item:first-child {
  border-radius: $r-xl $r-xl 0 0;
}

.as-action-sheet__item:not(:last-child) {
  border-bottom: 2rpx solid $line-soft;
}

.as-action-sheet__item:active {
  background: $bg-soft;
}

.as-action-sheet__item-text {
  font-size: $font-size-md;
  color: $ink;
  line-height: $lh-base;
}

.as-action-sheet__item.is-danger .as-action-sheet__item-text {
  color: $up;
}

.as-action-sheet__gap {
  height: $s-2;
}

.as-action-sheet__cancel {
  background: $bg-card;
  border-radius: $r-xl;
  padding: $s-4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-action-sheet__cancel:active {
  background: $bg-soft;
}

.as-action-sheet__cancel-text {
  font-size: $font-size-md;
  color: $ink-soft;
  line-height: $lh-base;
}

.as-action-sheet__container {
  padding-bottom: calc($s-4 + $safe-bottom);
}
</style>