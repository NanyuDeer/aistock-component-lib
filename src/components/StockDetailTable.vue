<template>
  <view class="as-stock-detail-table">
    <!-- 表头 -->
    <view class="as-stock-detail-table__header">
      <view
        v-for="col in columns"
        :key="col.key"
        class="as-stock-detail-table__th"
        :style="col.width ? { width: col.width } : {}"
      >
        <text class="as-stock-detail-table__th-text">{{ col.title }}</text>
      </view>
    </view>

    <!-- 表格行 -->
    <view
      v-for="(row, rowIndex) in data"
      :key="rowIndex"
      class="as-stock-detail-table__row"
    >
      <view
        v-for="col in columns"
        :key="col.key"
        class="as-stock-detail-table__td"
        :style="col.width ? { width: col.width } : {}"
      >
        <text
          class="as-stock-detail-table__td-text"
          :class="getCellClass(row, col.key)"
        >
          {{ formatCellValue(row, col.key) }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Column {
  key: string
  title: string
  width?: string
}

const props = withDefaults(defineProps<{
  columns: Column[]
  data: Record<string, string | number>[]
  upDownField?: string
}>(), {
  columns: () => [],
  data: () => [],
  upDownField: ''
})

function getCellClass(row: Record<string, string | number>, key: string): Record<string, boolean> {
  if (!props.upDownField || key !== props.upDownField) return {}
  const val = row[key]
  const num = typeof val === 'number' ? val : parseFloat(String(val))
  if (isNaN(num)) return {}
  return {
    'is-up': num > 0,
    'is-down': num < 0
  }
}

function formatCellValue(row: Record<string, string | number>, key: string): string {
  const val = row[key]
  if (typeof val === 'number') {
    return val.toFixed(2)
  }
  return String(val ?? '')
}
</script>

<style lang="scss" scoped>
.as-stock-detail-table {
  border: 2rpx solid $line;
  border-radius: $r-sm;
  overflow: hidden;
}

/* ===== Header ===== */
.as-stock-detail-table__header {
  display: flex;
  background: $bg-soft;
  border-bottom: 2rpx solid $line-soft;
}

.as-stock-detail-table__th {
  flex: 1;
  padding: $s-2 $s-3;
  text-align: left;
}

.as-stock-detail-table__th-text {
  font-size: $font-size-xs;
  font-weight: 600;
  color: $ink-mute;
}

/* ===== Row ===== */
.as-stock-detail-table__row {
  display: flex;
  border-bottom: 2rpx solid $line-soft;

  &:last-child {
    border-bottom: none;
  }
}

.as-stock-detail-table__td {
  flex: 1;
  padding: $s-2 $s-3;
  text-align: left;
}

.as-stock-detail-table__td-text {
  font-size: $font-size-xs;
  color: $ink;
  font-family: monospace;

  &.is-up { color: $up; }
  &.is-down { color: $down; }
}
</style>