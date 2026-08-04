<template>
  <view v-if="open" class="as-command-palette" @click="handleMaskClick">
    <view class="as-command-palette__mask"></view>
    <view class="as-command-palette__panel" @click.stop>
      <!-- Search Input -->
      <view class="as-command-palette__input-wrap">
        <SvgIcon name="search" :size="'32rpx'" color="#8a96b0" />
        <input
          ref="inputRef"
          class="as-command-palette__input"
          :placeholder="placeholder"
          placeholder-style="color: #b8c3d6; font-size: 26rpx;"
          @input="handleInput"
          @keydown="handleKeydown"
        />
      </view>

      <!-- Command List -->
      <scroll-view class="as-command-palette__list" scroll-y>
        <view
          v-for="(cmd, index) in filteredCommands"
          :key="cmd.key"
          class="as-command-palette__item"
          :class="{
            'is-highlighted': activeIndex === index
          }"
          @click="handleSelect(cmd)"
          @mouseenter="activeIndex = index"
        >
          <view
            v-if="cmd.icon"
            class="as-command-palette__item-icon"
          >
            <SvgIcon :name="cmd.icon" :size="'32rpx'" color="#0b5fff" />
          </view>
          <view class="as-command-palette__item-content">
            <text class="as-command-palette__item-title">{{ cmd.title }}</text>
            <text
              v-if="cmd.subtitle"
              class="as-command-palette__item-subtitle"
            >{{ cmd.subtitle }}</text>
          </view>
        </view>
        <view v-if="filteredCommands.length === 0" class="as-command-palette__empty">
          <text class="as-command-palette__empty-text">无匹配命令</text>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import SvgIcon from './SvgIcon.vue'

interface CommandItem {
  key: string
  title: string
  subtitle?: string
  icon?: string
}

const props = withDefaults(defineProps<{
  open?: boolean
  commands?: CommandItem[]
  placeholder?: string
}>(), {
  open: false,
  commands: () => [],
  placeholder: '搜索命令...'
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  select: [command: CommandItem]
}>()

const inputRef = ref<InstanceType<typeof HTMLInputElement> | null>(null)
const searchText = ref('')
const activeIndex = ref(0)

// 按 title 包含搜索文本过滤
const filteredCommands = computed(() => {
  if (!searchText.value) {
    return props.commands
  }
  const q = searchText.value.toLowerCase()
  return props.commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(q) ||
    (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q))
  )
})

// 重置搜索状态
watch(
  () => props.open,
  (val) => {
    if (val) {
      searchText.value = ''
      activeIndex.value = 0
      nextTick(() => {
        // input 自动聚焦
        if (inputRef.value) {
          ;(inputRef.value as unknown as { focus: () => void }).focus()
        }
      })
    }
  }
)

const handleInput = (e: Event) => {
  // 兼容浏览器（target.value）与 uni-app（detail.value）
  const target = e.target as HTMLInputElement
  const detail = (e as unknown as { detail?: { value?: string } }).detail
  searchText.value = detail?.value ?? target.value ?? ''
  activeIndex.value = 0
}

const handleKeydown = (e: KeyboardEvent) => {
  const max = filteredCommands.value.length - 1
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = activeIndex.value < max ? activeIndex.value + 1 : 0
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : max
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const cmd = filteredCommands.value[activeIndex.value]
    if (cmd) {
      handleSelect(cmd)
    }
  } else if (e.key === 'Escape') {
    e.preventDefault()
    handleClose()
  }
}

const handleSelect = (cmd: CommandItem) => {
  emit('select', cmd)
  handleClose()
}

const handleMaskClick = () => {
  handleClose()
}

const handleClose = () => {
  emit('update:open', false)
}
</script>

<style lang="scss" scoped>
.as-command-palette {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-modal;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
}

.as-command-palette__mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $overlay-base;
}

.as-command-palette__panel {
  position: relative;
  width: 640rpx;
  max-height: 480rpx;
  background: $bg-card;
  border-radius: $r-2xl;
  box-shadow: $shadow-hover;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: as-cmd-in 0.2s $ease-out;
}

@keyframes as-cmd-in {
  from {
    opacity: 0;
    transform: translateY(-20rpx) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ===== Input ===== */
.as-command-palette__input-wrap {
  display: flex;
  align-items: center;
  gap: $s-2;
  padding: $s-3 $s-4;
  border-bottom: 2rpx solid $line-soft;
}

.as-command-palette__input {
  flex: 1;
  height: 56rpx;
  font-size: $font-size-md;
  color: $ink;
  outline: none;
  border: none;
  background: transparent;
  line-height: 56rpx;
}

/* ===== List ===== */
.as-command-palette__list {
  flex: 1;
  overflow-y: auto;
  padding: $s-1 0;
  max-height: 360rpx;
}

.as-command-palette__item {
  display: flex;
  align-items: center;
  gap: $s-3;
  padding: $s-2 $s-4;
  cursor: pointer;
  transition: background $t-fast;
}

.as-command-palette__item.is-highlighted {
  background: $primary-50;
}

.as-command-palette__item:active {
  background: $primary-100;
}

.as-command-palette__item-icon {
  flex-shrink: 0;
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.as-command-palette__item-content {
  flex: 1;
  min-width: 0;
}

.as-command-palette__item-title {
  display: block;
  font-size: $font-size-base;
  font-weight: 500;
  color: $ink;
  line-height: $lh-tight;
}

.as-command-palette__item-subtitle {
  display: block;
  font-size: $font-size-xs;
  color: $ink-mute;
  margin-top: 2rpx;
}

/* ===== Empty ===== */
.as-command-palette__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $s-6 $s-4;
}

.as-command-palette__empty-text {
  font-size: $font-size-sm;
  color: $ink-mute;
}
</style>