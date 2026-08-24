<template>
  <view class="as-ai-graph">
    <view class="as-ai-graph__canvas">
      <!-- SVG lines between nodes -->
      <svg
        class="as-ai-graph__lines"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        preserveAspectRatio="none"
      >
        <line
          v-for="(link, index) in straightLinks"
          :key="'line-' + index"
          :x1="getNodeX(link.from)"
          :y1="getNodeY(link.from)"
          :x2="getNodeX(link.to)"
          :y2="getNodeY(link.to)"
          :stroke="getLinkColor(link.type)"
          :stroke-width="link.type === 'dashed' ? 1.5 : 2"
          :stroke-dasharray="link.type === 'dashed' ? '4 2' : 'none'"
          :opacity="0.4"
        />
        <path
          v-for="(link, index) in curveLinks"
          :key="'curve-' + index"
          :d="getCurvePath(link)"
          fill="none"
          :stroke="getLinkColor(link.type)"
          :stroke-width="2"
          :opacity="0.5"
        />
      </svg>

      <!-- Nodes -->
      <view
        v-for="(node, index) in nodes"
        :key="'node-' + index"
        class="as-ai-graph__node"
        :style="{ left: getNodeLeft(index), top: getNodeTop(index) }"
      >
        <view
          class="as-ai-graph__circle"
          :style="{ background: getNodeColor(node) }"
        >
          <text class="as-ai-graph__circle-text">{{ node.type }}</text>
        </view>
        <text class="as-ai-graph__label">{{ node.label }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface GraphNode {
  label: string
  type: string
  color?: string
}

export interface GraphLink {
  from: number
  to: number
  type?: 'solid' | 'dashed' | 'curve'
}

const props = withDefaults(defineProps<{
  nodes: GraphNode[]
  links: GraphLink[]
}>(), {
  nodes: () => [],
  links: () => []
})

const nodeWidth = 140
const nodeSpacing = 40
const svgHeight = 100
const svgWidth = computed(() => {
  if (props.nodes.length === 0) return 300
  return props.nodes.length * nodeWidth + nodeSpacing
})
const nodeY = 50

const curveLinks = computed(() => props.links.filter(l => l.type === 'curve'))
const straightLinks = computed(() => props.links.filter(l => l.type !== 'curve'))

function getNodeX(index: number): number {
  return nodeSpacing / 2 + index * nodeWidth + nodeWidth / 2
}

function getNodeY(_index: number): number {
  return nodeY
}

function getNodeLeft(index: number): string {
  return `${nodeSpacing / 2 + index * nodeWidth}rpx`
}

function getNodeTop(_index: number): string {
  return '0rpx'
}

function getNodeColor(node: GraphNode): string {
  if (node.color) return node.color
  const defaultColors = ['#0b5fff', '#c89020', '#e54d5e', '#18a058', '#4d8bff']
  return defaultColors[props.nodes.indexOf(node) % defaultColors.length]
}

function getLinkColor(type?: string): string {
  if (type === 'curve') return '#e54d5e'
  return '#0b5fff'
}

function getCurvePath(link: GraphLink): string {
  const x1 = getNodeX(link.from)
  const y1 = getNodeY(link.from)
  const x2 = getNodeX(link.to)
  const y2 = getNodeY(link.to)
  const midY = (y1 + y2) / 2
  const midX = (x1 + x2) / 2
  return `M${x1} ${y1} Q${midX} ${midY - 40} ${x2} ${y2}`
}
</script>

<style lang="scss" scoped>
.as-ai-graph {
  width: 100%;
  overflow-x: auto;
}

.as-ai-graph__canvas {
  position: relative;
  min-height: 120rpx;
}

.as-ai-graph__lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  pointer-events: none;
}

.as-ai-graph__node {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120rpx;
  transform: translateX(-50%);
}

.as-ai-graph__circle {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: 20rpx;
  font-weight: 600;
  box-shadow: $shadow-sm;
}

.as-ai-graph__circle-text {
  color: $white;
  font-size: 20rpx;
  font-weight: 600;
  line-height: 1;
}

.as-ai-graph__label {
  font-size: $font-size-xs;
  color: $ink-soft;
  line-height: $lh-tight;
  margin-top: $s-1;
  text-align: center;
  white-space: nowrap;
}
</style>