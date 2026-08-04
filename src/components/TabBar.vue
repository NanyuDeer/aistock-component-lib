<template>
  <view class="as-tabbar">
    <view
      v-for="(item, index) in items"
      :key="item.key"
      class="as-tabbar__item"
      :class="{ 'is-active': index === currentValue }"
      @click="handleSelect(index, item)"
    >
      <SvgIcon
        v-if="item.icon"
        :name="item.icon"
        size="44rpx"
        :color="index === currentValue ? '#0b5fff' : '#8a96b0'"
      />
      <text class="as-tabbar__label">{{ item.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SvgIcon from './SvgIcon.vue'

interface TabBarItem {
  key: string
  label: string
  icon?: string
}

const props = withDefaults(defineProps<{
  items: TabBarItem[]
  value?: number
}>(), {
  value: 0
})

const emit = defineEmits<{
  'update:value': [value: number]
  change: [index: number, item: TabBarItem]
}>()

const currentValue = computed(() => props.value)

const handleSelect = (index: number, item: TabBarItem) => {
  emit('update:value', index)
  emit('change', index, item)
}
</script>

<style lang="scss" scoped>
.as-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-fixed;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding-bottom: $safe-bottom;
  background: $bg-card;
  border-top: 2rpx solid $line-soft;
  box-sizing: content-box;
}

.as-tabbar__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $s-2 0;
  gap: 4rpx;
  position: relative;
}

.as-tabbar__item:active {
  opacity: $op-active;
}

.as-tabbar__label {
  font-size: $font-size-xs;
  color: $ink-mute;
  line-height: 1;
}

.as-tabbar__item.is-active .as-tabbar__label {
  color: $primary;
  font-weight: 600;
}
</style>