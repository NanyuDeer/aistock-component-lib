<template>
  <view class="dev-container">
    <view class="dev-header">
      <text class="dev-title">AiStock 组件库预览</text>
      <text class="dev-desc">蓝白金融设计系统 · Vue 3 组件库</text>
    </view>

    <!-- Button 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">Button 按钮</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <Button type="primary">主要按钮</Button>
          <Button type="secondary">次要按钮</Button>
          <Button type="ghost">幽灵按钮</Button>
          <Button type="danger">危险按钮</Button>
        </view>
        <view class="dev-row">
          <Button type="gold">黄金按钮</Button>
          <Button type="accent">强调按钮</Button>
          <Button type="primary" size="sm">小按钮</Button>
          <Button type="primary" size="lg">大按钮</Button>
        </view>
        <view class="dev-row">
          <Button type="primary" disabled>禁用状态</Button>
          <Button type="primary" loading>加载中</Button>
        </view>
      </view>
    </view>

    <!-- Card 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">Card 卡片</text>
      <view class="dev-section-body">
        <Card title="趋势股评分" subtitle="技术面分析结果">
          <text class="card-content">卡片内容区域，可以放置任意内容。</text>
        </Card>
      </view>
    </view>

    <!-- Tag & Badge 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">Tag 标签 & Badge 徽章</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <Tag type="up">涨幅</Tag>
          <Tag type="down">跌幅</Tag>
          <Tag type="neutral">中性</Tag>
          <Tag type="warning">警告</Tag>
          <Tag type="gold">金牌</Tag>
        </view>
        <view class="dev-row">
          <Badge type="primary">新</Badge>
          <Badge type="success">已通过</Badge>
          <Badge type="warning">待审核</Badge>
          <Badge type="danger">高风险</Badge>
          <Badge type="gold">VIP</Badge>
          <Badge type="info">信息</Badge>
        </view>
      </view>
    </view>

    <!-- Input 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">Input 输入框</text>
      <view class="dev-section-body">
        <view class="dev-input-grid">
          <view>
            <text class="dev-label">股票代码</text>
            <Input v-model="stockCode" placeholder="输入股票代码" />
          </view>
          <view>
            <text class="dev-label">搜索</text>
            <Input v-model="searchText" placeholder="搜索股票" search-icon clearable />
          </view>
        </view>
      </view>
    </view>

    <!-- Switch 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">Switch 开关</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <view class="dev-switch-demo">
            <Switch v-model="switch1" />
            <text class="dev-switch-label">实时推送</text>
          </view>
          <view class="dev-switch-demo">
            <Switch v-model="switch2" />
            <text class="dev-switch-label">声音提醒</text>
          </view>
        </view>
      </view>
    </view>

    <!-- StockItem 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">StockItem 股票项</text>
      <view class="dev-section-body">
        <StockItem name="贵州茅台" code="600519.SH" :price="1689.50" :change="12.30" :change-percent="0.73" />
        <view class="dev-gap" />
        <StockItem name="宁德时代" code="300750.SZ" :price="218.60" :change="-3.40" :change-percent="-1.53" />
        <view class="dev-gap" />
        <StockItem name="工商银行" code="601398.SH" :price="5.12" :change="0" :change-percent="0" />
      </view>
    </view>

    <!-- Progress 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">Progress 进度条</text>
      <view class="dev-section-body">
        <Progress :value="68" label="数据同步进度" status="primary" />
        <view class="dev-gap" />
        <Progress :value="85" label="风险度" status="danger" />
        <view class="dev-gap" />
        <Progress :value="42" label="资金使用率" status="success" />
        <view class="dev-gap" />
        <view class="dev-row">
          <Progress :value="68" type="circle" status="primary" />
          <Progress :value="85" type="circle" status="danger" />
          <Progress :value="42" type="circle" status="gold" />
        </view>
      </view>
    </view>

    <!-- Empty & Skeleton 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">Empty 空状态 & Skeleton 骨架屏</text>
      <view class="dev-section-body">
        <view class="dev-grid-2">
          <view class="dev-panel">
            <Empty title="暂无搜索结果" description="尝试更换关键词" />
          </view>
          <view class="dev-panel">
            <Skeleton variant="title" />
            <view class="dev-gap-sm" />
            <Skeleton variant="text" />
            <view class="dev-gap-sm" />
            <Skeleton variant="text" width="60%" />
            <view class="dev-gap-sm" />
            <Skeleton variant="block" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import Tag from '@/components/Tag.vue'
import Badge from '@/components/Badge.vue'
import Input from '@/components/Input.vue'
import Switch from '@/components/Switch.vue'
import Empty from '@/components/Empty.vue'
import Progress from '@/components/Progress.vue'
import Skeleton from '@/components/Skeleton.vue'
import StockItem from '@/components/StockItem.vue'

const stockCode = ref('600740.SH')
const searchText = ref('')
const switch1 = ref(true)
const switch2 = ref(false)
</script>

<style lang="scss" scoped>
.dev-container {
  padding: $s-6;
}

.dev-header {
  margin-bottom: $s-8;
}

.dev-title {
  display: block;
  font-size: $font-size-2xl;
  font-weight: 600;
  color: $ink;
  margin-bottom: $s-2;
}

.dev-desc {
  font-size: $font-size-base;
  color: $ink-soft;
}

.dev-section {
  margin-bottom: $s-8;
}

.dev-section-title {
  display: block;
  font-size: $font-size-lg;
  font-weight: 600;
  color: $ink;
  margin-bottom: $s-4;
}

.dev-section-body {
  background: $bg-card;
  border-radius: $r-xl;
  padding: $s-6;
  box-shadow: $shadow-xs;
}

.dev-row {
  display: flex;
  flex-wrap: wrap;
  gap: $s-3;
  margin-bottom: $s-4;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
}

.dev-gap {
  height: $s-4;
}

.dev-gap-sm {
  height: $s-2;
}

.dev-input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $s-4;
}

.dev-label {
  display: block;
  font-size: $font-size-xs;
  font-weight: 600;
  color: $ink-soft;
  margin-bottom: $s-2;
}

.dev-switch-demo {
  display: flex;
  align-items: center;
  gap: $s-2;
}

.dev-switch-label {
  font-size: $font-size-sm;
  color: $ink;
}

.dev-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $s-4;
}

.dev-panel {
  background: $bg-soft;
  border-radius: $r-lg;
  padding: $s-4;
}

.card-content {
  font-size: $font-size-base;
  color: $ink-soft;
  line-height: $lh-base;
}
</style>