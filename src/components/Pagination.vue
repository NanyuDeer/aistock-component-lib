<template>
  <view class="as-pagination">
    <view
      class="as-pagination__prev"
      :class="{ 'is-disabled': currentPage <= 1 }"
      @click="goPrev"
    >
      <text class="as-pagination__arrow">{{ prevText }}</text>
    </view>

    <view
      v-for="item in pageNumbers"
      :key="typeof item === 'number' ? item : 'ellipsis'"
      class="as-pagination__item"
      :class="{
        'is-active': item === currentPage,
        'is-ellipsis': item === 'ellipsis'
      }"
      @click="handlePageClick(item)"
    >
      <text v-if="item === 'ellipsis'" class="as-pagination__ellipsis">...</text>
      <text v-else class="as-pagination__num">{{ item }}</text>
    </view>

    <view
      class="as-pagination__next"
      :class="{ 'is-disabled': currentPage >= totalPages }"
      @click="goNext"
    >
      <text class="as-pagination__arrow">{{ nextText }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  current?: number
  total: number
  pageSize?: number
  prevText?: string
  nextText?: string
}>(), {
  current: 1,
  pageSize: 10,
  prevText: '上一页',
  nextText: '下一页'
})

const emit = defineEmits<{
  'update:current': [value: number]
  'change': [value: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const currentPage = computed(() => {
  const val = props.current
  if (val < 1) return 1
  if (val > totalPages.value) return totalPages.value
  return val
})

const pageNumbers = computed((): (number | 'ellipsis')[] => {
  const total = totalPages.value
  const curr = currentPage.value
  const pages: (number | 'ellipsis')[] = []

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
    return pages
  }

  pages.push(1)

  const delta = 1
  let rangeStart = curr - delta
  let rangeEnd = curr + delta

  if (rangeStart <= 2) {
    rangeStart = 2
    rangeEnd = Math.min(total - 1, rangeStart + 3)
  }

  if (rangeEnd >= total - 1) {
    rangeEnd = total - 1
    rangeStart = Math.max(2, rangeEnd - 3)
  }

  if (rangeStart > 2) {
    pages.push('ellipsis')
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  if (rangeEnd < total - 1) {
    pages.push('ellipsis')
  }

  pages.push(total)

  return pages
})

const emitChange = (page: number) => {
  if (page === currentPage.value) return
  emit('update:current', page)
  emit('change', page)
}

const handlePageClick = (item: number | 'ellipsis') => {
  if (item === 'ellipsis') return
  emitChange(item)
}

const goPrev = () => {
  if (currentPage.value <= 1) return
  emitChange(currentPage.value - 1)
}

const goNext = () => {
  if (currentPage.value >= totalPages.value) return
  emitChange(currentPage.value + 1)
}
</script>

<style lang="scss" scoped>
.as-pagination {
  display: flex;
  align-items: center;
  gap: $s-1;
}

.as-pagination__prev,
.as-pagination__next {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 72rpx;
  height: 64rpx;
  padding: 0 $s-2;
  border: 2rpx solid $line;
  border-radius: $r-sm;
  background: $bg-card;
  cursor: pointer;
  user-select: none;
  transition: all $t-fast;
}

.as-pagination__prev:active,
.as-pagination__next:active {
  background: $bg-soft;
}

.as-pagination__prev.is-disabled,
.as-pagination__next.is-disabled {
  cursor: not-allowed;
  opacity: $op-disabled;
  background: $bg-soft;
}

.as-pagination__prev.is-disabled:active,
.as-pagination__next.is-disabled:active {
  background: $bg-soft;
}

.as-pagination__arrow {
  font-size: $font-size-sm;
  color: $ink-soft;
  white-space: nowrap;
}

.as-pagination__item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 64rpx;
  height: 64rpx;
  padding: 0 $s-1;
  border: 2rpx solid $line;
  border-radius: $r-sm;
  background: $bg-card;
  cursor: pointer;
  user-select: none;
  transition: all $t-fast;
}

.as-pagination__item:active {
  background: $bg-soft;
}

.as-pagination__item.is-active {
  border-color: $primary;
  background: $primary-50;
  cursor: default;
}

.as-pagination__item.is-ellipsis {
  border-color: transparent;
  background: transparent;
  cursor: default;
  min-width: 48rpx;
}

.as-pagination__item.is-ellipsis:active {
  background: transparent;
}

.as-pagination__num {
  font-size: $font-size-sm;
  font-weight: 500;
  color: $ink-soft;
  font-family: $font-mono;
}

.as-pagination__item.is-active .as-pagination__num {
  color: $primary;
  font-weight: 600;
}

.as-pagination__ellipsis {
  font-size: $font-size-sm;
  color: $ink-mute;
  letter-spacing: $ls-wide;
}
</style>