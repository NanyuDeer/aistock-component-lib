<template>
  <view class="as-data-grid">
    <scroll-view
      class="as-data-grid__wrapper"
      :class="{ 'is-fixed-header': fixedHeader }"
      scroll-y
    >
      <view class="as-data-grid__table">
        <!-- Header -->
        <view class="as-data-grid__header">
          <view
            class="as-data-grid__row as-data-grid__row--header"
          >
            <view
              v-for="col in columns"
              :key="col.key"
              class="as-data-grid__cell as-data-grid__cell--header"
              :class="[`is-align-${col.align || 'left'}`]"
              :style="getCellStyle(col)"
            >
              <text class="as-data-grid__cell-text">{{ col.title }}</text>
            </view>
          </view>
        </view>

        <!-- Body -->
        <view
          v-if="data.length > 0"
          class="as-data-grid__body"
        >
          <view
            v-for="(row, rowIndex) in data"
            :key="getRowKey(row, rowIndex)"
            class="as-data-grid__row"
            :class="{
              'is-stripe': stripe && rowIndex % 2 === 1
            }"
            @click="handleRowClick(row, rowIndex)"
          >
            <view
              v-for="col in columns"
              :key="col.key"
              class="as-data-grid__cell"
              :class="[`is-align-${col.align || 'left'}`]"
              :style="getCellStyle(col)"
            >
              <slot
                :name="col.key"
                :row="row"
                :index="rowIndex"
              >
                <text class="as-data-grid__cell-text">{{ row[col.key] }}</text>
              </slot>
            </view>
          </view>
        </view>

        <!-- Empty -->
        <view v-else class="as-data-grid__empty">
          <text class="as-data-grid__empty-text">暂无数据</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
interface Column {
  key: string
  title: string
  width?: number
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<{
  columns: Column[]
  data: Array<Record<string, unknown>>
  rowKey?: string
  stripe?: boolean
  fixedHeader?: boolean
}>(), {
  rowKey: '',
  stripe: false,
  fixedHeader: false
})

const emit = defineEmits<{
  'row-click': [row: Record<string, unknown>, index: number]
}>()

const getCellStyle = (col: Column) => {
  const style: Record<string, string> = {}
  if (col.width) {
    style.width = `${col.width}rpx`
  }
  return style
}

const getRowKey = (row: Record<string, unknown>, index: number): string => {
  const key = props.rowKey || (props.columns[0] ? props.columns[0].key : '')
  return key ? String(row[key] ?? index) : String(index)
}

const handleRowClick = (row: Record<string, unknown>, index: number) => {
  emit('row-click', row, index)
}
</script>

<style lang="scss" scoped>
.as-data-grid {
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-xl;
  overflow: hidden;
}

.as-data-grid__wrapper {
  width: 100%;
}

.as-data-grid__table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

/* ===== Header ===== */
.as-data-grid__header {
  display: table-header-group;
}

.as-data-grid__row--header {
  background: $bg-soft;
  border-bottom: 2rpx solid $line;
}

.as-data-grid__cell--header {
  padding: $s-3 $s-4;
}

.as-data-grid__cell--header .as-data-grid__cell-text {
  font-size: $font-size-sm;
  font-weight: 600;
  color: $ink-soft;
}

/* ===== Row ===== */
.as-data-grid__row {
  display: table-row;
  cursor: pointer;
  transition: background $t-fast;
}

.as-data-grid__row:active {
  background: $bg-deep;
}

.as-data-grid__row.is-stripe {
  background: $bg-soft;
}

.as-data-grid__row.is-stripe:active {
  background: $bg-deep;
}

/* ===== Cell ===== */
.as-data-grid__cell {
  display: table-cell;
  padding: $s-3 $s-4;
  vertical-align: middle;
  border-bottom: 2rpx solid $line-soft;
}

.as-data-grid__cell.is-align-left {
  text-align: left;
}

.as-data-grid__cell.is-align-center {
  text-align: center;
}

.as-data-grid__cell.is-align-right {
  text-align: right;
}

.as-data-grid__cell-text {
  font-size: $font-size-base;
  color: $ink;
  line-height: $lh-base;
}

/* ===== Empty ===== */
.as-data-grid__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $s-8 $s-4;
}

.as-data-grid__empty-text {
  font-size: $font-size-md;
  color: $ink-mute;
}
</style>