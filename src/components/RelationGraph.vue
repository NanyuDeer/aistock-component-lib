<template>
  <view class="as-relation-graph">
    <view v-if="nodes.length === 0" class="as-relation-graph__empty">
      <view class="as-relation-graph__empty-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8a96b0" stroke-width="1.5" style="display: block;">
          <circle cx="12" cy="12" r="3"></circle>
          <circle cx="5" cy="6" r="2"></circle>
          <circle cx="19" cy="6" r="2"></circle>
          <circle cx="5" cy="18" r="2"></circle>
          <circle cx="19" cy="18" r="2"></circle>
        </svg>
      </view>
      <text class="as-relation-graph__empty-title">暂无关联数据</text>
      <text class="as-relation-graph__empty-desc">该标的暂未建立产业链关系</text>
    </view>
    <view v-else class="as-relation-graph__svg-wrap">
      <svg
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        :width="`${svgWidthRpx}rpx`"
        :height="`${svgHeightRpx}rpx`"
        style="display: block; max-width: 100%;"
      >
        <defs>
          <linearGradient id="rel-core-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0b5fff"></stop>
            <stop offset="100%" stop-color="#0a2e6f"></stop>
          </linearGradient>
        </defs>
        <!-- 连线 -->
        <line
          v-for="(link, i) in positionedLinks"
          :key="'link-' + i"
          :x1="link.x1"
          :y1="link.y1"
          :x2="link.x2"
          :y2="link.y2"
          :stroke="linkColor(link)"
          stroke-width="1.5"
          :stroke-dasharray="link.dashed ? '4 3' : undefined"
        ></line>
        <!-- 节点 -->
        <g v-for="(node, i) in positionedNodes" :key="'node-' + i">
          <circle
            :cx="node.x"
            :cy="node.y"
            r="24"
            :fill="nodeBg(node)"
            :stroke="nodeStroke(node)"
            stroke-width="2"
          ></circle>
          <text
            v-if="node.category === 'core'"
            :x="node.x"
            :y="node.y - 2"
            text-anchor="middle"
            font-size="13"
            font-weight="700"
            fill="#ffffff"
          >{{ node.label }}</text>
          <text
            v-if="node.category === 'core'"
            :x="node.x"
            :y="node.y + 14"
            text-anchor="middle"
            font-size="9"
            fill="#ffffff"
            opacity="0.85"
          >{{ node.subLabel || '' }}</text>
          <text
            v-else
            :x="node.x"
            :y="node.y + 4"
            text-anchor="middle"
            font-size="12"
            font-weight="600"
            :fill="nodeTextColor(node)"
          >{{ node.label }}</text>
        </g>
      </svg>
      <!-- 图例 -->
      <view class="as-relation-graph__legend">
        <view class="as-relation-graph__legend-item">
          <view class="as-relation-graph__legend-dot is-upstream"></view>
          <text class="as-relation-graph__legend-label">上游 Supply</text>
        </view>
        <view class="as-relation-graph__legend-item">
          <view class="as-relation-graph__legend-dot is-downstream"></view>
          <text class="as-relation-graph__legend-label">下游 Demand</text>
        </view>
        <view class="as-relation-graph__legend-item">
          <view class="as-relation-graph__legend-dot is-related"></view>
          <text class="as-relation-graph__legend-label">关联 Related</text>
        </view>
        <view class="as-relation-graph__legend-item">
          <view class="as-relation-graph__legend-dot is-core"></view>
          <text class="as-relation-graph__legend-label">中心标的 Target</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface RelationNode {
  key: string
  label: string
  category?: 'core' | 'upstream' | 'downstream'
  subLabel?: string
}

interface RelationLink {
  from: string
  to: string
  label?: string
}

const props = withDefaults(defineProps<{
  nodes: RelationNode[]
  links: RelationLink[]
  direction?: 'vertical' | 'horizontal'
}>(), {
  direction: 'vertical'
})

const isVertical = computed(() => props.direction === 'vertical')

const svgWidth = computed(() => isVertical.value ? 360 : 500)
const svgHeight = computed(() => isVertical.value ? 280 : 360)
const svgWidthRpx = computed(() => isVertical.value ? 360 : 500)
const svgHeightRpx = computed(() => isVertical.value ? 280 : 360)

const coreNode = computed(() => props.nodes.find(n => n.category === 'core'))
const otherNodes = computed(() => props.nodes.filter(n => n.category !== 'core'))

function getNodePosition(node: RelationNode, index: number, total: number): { x: number; y: number } {
  if (node.category === 'core') {
    return isVertical.value
      ? { x: svgWidth.value / 2, y: svgHeight.value / 2 }
      : { x: svgWidth.value / 2, y: svgHeight.value / 2 }
  }

  if (isVertical.value) {
    // Vertical: upstream above, downstream below
    const isUpstream = node.category === 'upstream' || node.category === undefined
    const groupTotal = otherNodes.value.filter(n => n.category === node.category || (node.category === undefined && !n.category)).length
    const groupIndex = otherNodes.value.filter(n => n.category === node.category || (node.category === undefined && !n.category)).indexOf(node)
    const topY = 56
    const bottomY = svgHeight.value - 56
    const y = isUpstream ? topY : bottomY
    const xRange = svgWidth.value - 120
    const xStep = xRange / Math.max(groupTotal + 1, 2)
    const x = 60 + xStep * (groupIndex + 1)
    return { x: Math.round(x), y: isUpstream ? topY : bottomY }
  } else {
    // Horizontal: upstream left, downstream right
    const isUpstream = node.category === 'upstream' || node.category === undefined
    const groupTotal = otherNodes.value.filter(n => n.category === node.category || (node.category === undefined && !n.category)).length
    const groupIndex = otherNodes.value.filter(n => n.category === node.category || (node.category === undefined && !n.category)).indexOf(node)
    const x = isUpstream ? 80 : svgWidth.value - 80
    const yRange = svgHeight.value - 120
    const yStep = yRange / Math.max(groupTotal + 1, 2)
    const y = 60 + yStep * (groupIndex + 1)
    return { x, y: Math.round(y) }
  }
}

const positionedNodes = computed(() => {
  const list: Array<{ x: number; y: number } & RelationNode> = []
  // Core first
  if (coreNode.value) {
    const pos = getNodePosition(coreNode.value, 0, 1)
    list.push({ ...coreNode.value, ...pos })
  }
  // Then others
  otherNodes.value.forEach((node, i) => {
    const pos = getNodePosition(node, i, otherNodes.value.length)
    list.push({ ...node, ...pos })
  })
  return list
})

const nodeMap = computed(() => {
  const map = new Map<string, { x: number; y: number }>()
  positionedNodes.value.forEach(n => map.set(n.key, { x: n.x, y: n.y }))
  return map
})

const positionedLinks = computed(() => {
  return props.links.map(link => {
    const from = nodeMap.value.get(link.from)
    const to = nodeMap.value.get(link.to)
    // Determine if link is dashed (related/cross-category)
    const fromNode = positionedNodes.value.find(n => n.key === link.from)
    const toNode = positionedNodes.value.find(n => n.key === link.to)
    const dashed = !fromNode || !toNode || fromNode.category === toNode.category
    return {
      x1: from?.x ?? 0,
      y1: from?.y ?? 0,
      x2: to?.x ?? 0,
      y2: to?.y ?? 0,
      dashed
    }
  })
})

// Colors for nodes/links
const categoryColorMap: Record<string, string> = {
  core: '#0b5fff',
  upstream: '#c89020',
  downstream: '#e54d5e'
}

function linkColor(link: { dashed: boolean }): string {
  return link.dashed ? '#8a96b0' : '#0b5fff'
}

function nodeStroke(node: RelationNode): string {
  if (node.category === 'core') return '#0a2e6f'
  return categoryColorMap[node.category ?? 'upstream'] || '#8a96b0'
}

function nodeBg(node: RelationNode): string {
  if (node.category === 'core') return 'url(#rel-core-grad)'
  if (node.category === 'downstream') return '#fff5f6'
  return '#f5f8fd'
}

function nodeTextColor(node: RelationNode): string {
  if (node.category === 'core') return '#ffffff'
  if (node.category === 'downstream') return '#e54d5e'
  if (node.category === 'upstream') return '#0b5fff'
  return '#4b5a7a'
}
</script>

<style lang="scss" scoped>
.as-relation-graph {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.as-relation-graph__svg-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $s-4;
}

.as-relation-graph__legend {
  display: flex;
  flex-wrap: wrap;
  gap: $s-3;
  padding: $s-3;
  background: $bg-soft;
  border-radius: $r-md;
}

.as-relation-graph__legend-item {
  display: flex;
  align-items: center;
  gap: $s-1;
}

.as-relation-graph__legend-dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  border-width: 3rpx;
  border-style: solid;
  flex-shrink: 0;
  background: $bg-soft;

  &.is-upstream {
    border-color: $primary;
  }

  &.is-downstream {
    border-color: $up;
    background: $up-bg;
  }

  &.is-related {
    border-color: $ink-mute;
  }

  &.is-core {
    border-color: $primary-deep;
    background: $brand-gradient;
  }
}

.as-relation-graph__legend-label {
  font-size: $font-size-xs;
  color: $ink;
}

.as-relation-graph__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $s-10 $s-6;
  background: $bg-soft;
  border-radius: $r-lg;
  width: 100%;
}

.as-relation-graph__empty-icon {
  margin-bottom: $s-4;
  opacity: 0.5;
}

.as-relation-graph__empty-title {
  font-size: $font-size-md;
  font-weight: 600;
  color: $ink-soft;
  margin-bottom: $s-2;
}

.as-relation-graph__empty-desc {
  font-size: $font-size-sm;
  color: $ink-mute;
  text-align: center;
}
</style>