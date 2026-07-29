<template>
  <view class="as-investment-summary-card" :class="`is-${ratingType}`">
    <!-- 头部：标题 + 星级评分 -->
    <view class="as-investment-summary-card__header">
      <text class="as-investment-summary-card__title">{{ title }}</text>
      <Rate
        :model-value="rating"
        :max="5"
        readonly
        :type="ratingType === 'gold' ? 'gold' : 'primary'"
        show-text
      />
    </view>

    <!-- 投资结论 -->
    <view class="as-investment-summary-card__conclusion">
      <text class="as-investment-summary-card__conclusion-text">{{ conclusion }}</text>
    </view>

    <!-- 关键要点列表 -->
    <view v-if="keyPoints.length > 0" class="as-investment-summary-card__points">
      <view
        v-for="(point, idx) in keyPoints"
        :key="idx"
        class="as-investment-summary-card__point"
      >
        <view class="as-investment-summary-card__bullet" />
        <text class="as-investment-summary-card__point-text">{{ point }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Rate from './Rate.vue'

type RatingType = 'gold' | 'brand'

withDefaults(defineProps<{
  /** 投资评级（1-5 星） */
  rating: number
  /** 投资结论文本 */
  conclusion: string
  /** 关键投资要点列表 */
  keyPoints: string[]
  /** 卡片标题 */
  title?: string
  /** 星级配色主题：gold 金色 / brand 主蓝 */
  ratingType?: RatingType
}>(), {
  title: '投资总结',
  ratingType: 'gold'
})
</script>

<style lang="scss" scoped>
.as-investment-summary-card {
  background: $bg-card;
  border: 2rpx solid $line;
  border-radius: $r-xl;
  padding: $s-4;
  box-shadow: $shadow-xs;
  position: relative;
  overflow: hidden;
}

/* 顶部主题色装饰条 */
.as-investment-summary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6rpx;
}

.as-investment-summary-card.is-gold::before {
  background: linear-gradient(90deg, $gold-light, $gold);
}

.as-investment-summary-card.is-brand::before {
  background: linear-gradient(90deg, $primary-light, $primary);
}

/* ===== Header ===== */
.as-investment-summary-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $s-3;
  margin-bottom: $s-3;
  padding-bottom: $s-3;
  border-bottom: 2rpx solid $line-soft;
}

.as-investment-summary-card__title {
  font-size: $font-size-lg;
  font-weight: 700;
  color: $ink;
  line-height: $lh-tight;
}

/* ===== Conclusion ===== */
.as-investment-summary-card__conclusion {
  padding: $s-3;
  border-radius: $r-md;
  background: $bg-soft;
  margin-bottom: $s-3;
}

.as-investment-summary-card__conclusion-text {
  font-size: $font-size-base;
  color: $ink;
  line-height: $lh-loose;
}

/* ===== Key points ===== */
.as-investment-summary-card__points {
  display: flex;
  flex-direction: column;
  gap: $s-2;
}

.as-investment-summary-card__point {
  display: flex;
  align-items: flex-start;
  gap: $s-2;
}

.as-investment-summary-card__bullet {
  flex-shrink: 0;
  width: 12rpx;
  height: 12rpx;
  border-radius: $r-full;
  margin-top: 12rpx;
  background: $primary;
}

.as-investment-summary-card.is-gold .as-investment-summary-card__bullet {
  background: $gold;
}

.as-investment-summary-card.is-brand .as-investment-summary-card__bullet {
  background: $primary;
}

.as-investment-summary-card__point-text {
  flex: 1;
  font-size: $font-size-sm;
  color: $ink-soft;
  line-height: $lh-base;
}
</style>
