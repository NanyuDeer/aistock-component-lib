<template>
  <view class="dev-container">
    <view class="dev-header">
      <text class="dev-title">AiStock 组件库预览</text>
      <text class="dev-desc">在这里引入你写好的组件，查看效果。修改后保存会自动刷新。</text>
    </view>

    <view class="dev-section">
      <text class="dev-section-title">基础组件预览区</text>
      <view class="dev-section-body">
        <!-- 示例：引入 Card 组件 -->
        <!-- <Card title="趋势股评分" subtitle="技术面分析">卡片内容</Card> -->
        <text class="dev-placeholder">暂未引入组件，请在 src/components/ 下创建组件后，在此引入预览。</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 在这里 import 你要预览的组件
// import Card from '@/components/Card.vue'
</script>

<style lang="scss" scoped>
.dev-container {
  padding: $spacing-base;
}

.dev-header {
  margin-bottom: $spacing-lg;
}

.dev-title {
  display: block;
  font-size: $font-size-xl;
  font-weight: 600;
  color: $text-color-title;
  margin-bottom: $spacing-xs;
}

.dev-desc {
  font-size: $font-size-sm;
  color: $text-color-secondary;
}

.dev-section {
  margin-bottom: $spacing-lg;
}

.dev-section-title {
  display: block;
  font-size: $font-size-base;
  font-weight: 600;
  color: $text-color-secondary;
  margin-bottom: $spacing-sm;
}

.dev-section-body {
  background: $bg-color-grey;
  border-radius: $radius-base;
  padding: $spacing-base;
  box-shadow: $shadow-card;
}

.dev-placeholder {
  font-size: $font-size-sm;
  color: $text-color-tertiary;
}
</style>
