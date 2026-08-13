<template>
  <view class="as-breadcrumb">
    <view
      v-for="(item, index) in items"
      :key="index"
      class="as-breadcrumb__item"
      :class="{ 'as-breadcrumb__item--active': index === items.length - 1 }"
      @click="handleClick(item)"
    >
      <text class="as-breadcrumb__label">{{ item.label }}</text>
      <text v-if="index < items.length - 1" class="as-breadcrumb__separator">{{ separator }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  path?: string
}

const props = withDefaults(defineProps<{
  items: BreadcrumbItem[]
  separator?: string
}>(), {
  separator: '/'
})

const emit = defineEmits<{
  click: [item: BreadcrumbItem]
}>()

function handleClick(item: BreadcrumbItem) {
  emit('click', item)
}
</script>

<style lang="scss" scoped>
.as-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: $s-1;
}

.as-breadcrumb__item {
  display: flex;
  align-items: center;
  gap: $s-1;
  cursor: pointer;
}

.as-breadcrumb__label {
  font-size: $font-size-xs;
  color: $ink-mute;
  line-height: $lh-tight;
  transition: color $t-fast;
}

.as-breadcrumb__item--active {
  .as-breadcrumb__label {
    color: $primary;
    font-weight: 600;
  }
  cursor: default;
}

.as-breadcrumb__item:not(.as-breadcrumb__item--active):active {
  .as-breadcrumb__label {
    color: $primary-light;
  }
}

.as-breadcrumb__separator {
  font-size: $font-size-xs;
  color: $ink-faint;
  line-height: $lh-tight;
  margin: 0 $s-1;
}
</style>