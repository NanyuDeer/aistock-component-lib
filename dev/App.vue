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

    <!-- Avatar 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">Avatar 头像</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <Avatar text="张三" size="xs" variant="primary" />
          <Avatar text="李四" size="sm" variant="gold" />
          <Avatar text="王五" size="md" variant="accent" />
          <Avatar text="赵六" size="lg" variant="neutral" />
        </view>
        <view class="dev-row">
          <Avatar text="Aria" size="md" variant="primary" />
          <Avatar text="晓研" size="md" variant="gold" />
        </view>
      </view>
    </view>

    <!-- SvgIcon 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">SvgIcon 图标</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <view class="dev-icon-demo">
            <SvgIcon name="bell-line" size="48rpx" color="#4d7cfe" />
            <text class="dev-icon-label">bell</text>
          </view>
          <view class="dev-icon-demo">
            <SvgIcon name="star-line" size="48rpx" color="#f59e0b" />
            <text class="dev-icon-label">star</text>
          </view>
          <view class="dev-icon-demo">
            <SvgIcon name="trending-up-line" size="48rpx" color="#22c55e" />
            <text class="dev-icon-label">trending-up</text>
          </view>
          <view class="dev-icon-demo">
            <SvgIcon name="trending-down-line" size="48rpx" color="#f43f5e" />
            <text class="dev-icon-label">trending-down</text>
          </view>
        </view>
        <view class="dev-row">
          <view class="dev-icon-demo">
            <SvgIcon name="home-line" size="48rpx" color="#0b5fff" />
            <text class="dev-icon-label">home</text>
          </view>
          <view class="dev-icon-demo">
            <SvgIcon name="chart-line" size="48rpx" color="#0b5fff" />
            <text class="dev-icon-label">chart</text>
          </view>
          <view class="dev-icon-demo">
            <SvgIcon name="trade-line" size="48rpx" color="#0b5fff" />
            <text class="dev-icon-label">trade</text>
          </view>
          <view class="dev-icon-demo">
            <SvgIcon name="user-line" size="48rpx" color="#0b5fff" />
            <text class="dev-icon-label">user</text>
          </view>
          <view class="dev-icon-demo">
            <SvgIcon name="settings" size="48rpx" color="#0b5fff" />
            <text class="dev-icon-label">settings</text>
          </view>
        </view>
      </view>
    </view>

    <!-- LoadingState 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">LoadingState 加载状态</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <LoadingState text="加载中..." size="sm" />
          <LoadingState text="加载中..." size="md" />
          <LoadingState text="加载中..." size="lg" />
        </view>
        <view class="dev-row">
          <LoadingState text="垂直加载" size="md" layout="vertical" />
        </view>
      </view>
    </view>

    <!-- StatCard 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">StatCard 统计卡片</text>
      <view class="dev-section-body">
        <view class="dev-stat-grid">
          <StatCard label="总资产" value="1,234,567" trend="+12.3%" trendType="up" valueType="gold" />
          <StatCard label="今日盈亏" value="+8,920" trend="+0.72%" trendType="up" valueType="up" />
          <StatCard label="持仓市值" value="856,200" trend="-2.1%" trendType="down" valueType="down" />
          <StatCard label="可用资金" value="378,367" trend="持平" trendType="flat" valueType="primary" />
        </view>
      </view>
    </view>

    <!-- ListCell 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">ListCell 列表单元格</text>
      <view class="dev-section-body">
        <ListCell title="账户安全" value="已认证" showArrow clickable />
        <ListCell title="消息通知" value="已开启" showArrow clickable />
        <ListCell title="清除缓存" value="23.5 MB" showArrow clickable />
        <ListCell title="关于我们" description="版本 v1.0.0" showArrow clickable />
        <ListCell title="不可点击项" value="禁用" disabled />
      </view>
    </view>

    <!-- PageCard & SubPageCard 组件展示 -->
    <view class="dev-section">
      <text class="dev-section-title">PageCard & SubPageCard 页面卡片</text>
      <view class="dev-section-body">
        <view class="dev-page-demo">
          <PageCard title="主页面卡片" subtitle="带标题栏的页面容器">
            <text class="card-content">PageCard 用于主页面布局，包含标题栏和内容区域，支持底部插槽。</text>
          </PageCard>
        </view>
        <view class="dev-gap" />
        <view class="dev-page-demo">
          <SubPageCard title="子页面卡片" :showBack="false">
            <text class="card-content">SubPageCard 用于子页面布局，默认带返回按钮（此处关闭展示）。</text>
          </SubPageCard>
        </view>
      </view>
    </view>

    <!-- RadarChart 雷达图 -->
    <view class="dev-section">
      <text class="dev-section-title">RadarChart 雷达图</text>
      <view class="dev-section-body">
        <RadarChart title="多维度评分" :dimensions="radarDims" :score="78.4" />
      </view>
    </view>

    <!-- Gauge 仪表盘 -->
    <view class="dev-section">
      <text class="dev-section-title">Gauge 仪表盘</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <Gauge :value="86" label="综合评分" :size="160" />
          <Gauge :value="65" label="技术面" :size="160" />
          <Gauge :value="45" label="资金面" :size="160" />
          <Gauge :value="28" label="风险度" :size="160" />
        </view>
      </view>
    </view>

    <!-- Sparkline 迷你走势图 -->
    <view class="dev-section">
      <text class="dev-section-title">Sparkline 迷你走势图</text>
      <view class="dev-section-body">
        <view class="dev-spark-row">
          <view class="dev-spark-item">
            <text class="dev-label">上涨</text>
            <Sparkline :data="sparkUp" />
          </view>
          <view class="dev-spark-item">
            <text class="dev-label">下跌</text>
            <Sparkline :data="sparkDown" />
          </view>
          <view class="dev-spark-item">
            <text class="dev-label">持平(line)</text>
            <Sparkline :data="sparkFlat" type="line" />
          </view>
        </view>
      </view>
    </view>

    <!-- RelationGraph 关系图谱 -->
    <view class="dev-section">
      <text class="dev-section-title">RelationGraph 关系图谱</text>
      <view class="dev-section-body">
        <RelationGraph :nodes="relationNodes" :links="relationLinks" @node-click="onNodeClick" />
        <text v-if="clickedNode" class="dev-spark-tip">已点击节点：{{ clickedNode }}</text>
      </view>
    </view>

    <!-- Segmented 分段控制器 -->
    <view class="dev-section">
      <text class="dev-section-title">Segmented 分段控制器</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <Segmented v-model="segValue" :items="segItems" />
        </view>
        <view class="dev-row">
          <Segmented v-model="segValue" :items="segItems" full-width />
        </view>
        <text class="dev-label">当前选中：{{ segValue }}</text>
      </view>
    </view>

    <!-- QuoteHeader 行情头部 -->
    <view class="dev-section">
      <text class="dev-section-title">QuoteHeader 行情头部</text>
      <view class="dev-section-body">
        <QuoteHeader
          name="贵州茅台"
          code="600519.SH"
          market="SH"
          :price="1689.50"
          :change="12.30"
          :change-pct="0.73"
          status="normal"
          :metrics="quoteMetrics"
        />
      </view>
    </view>

    <!-- NavBar 导航栏 -->
    <view class="dev-section">
      <text class="dev-section-title">NavBar 顶部导航栏</text>
      <view class="dev-section-body">
        <view class="dev-device-frame">
          <NavBar title="趋势股评分" subtitle="2026-07-28" show-back />
        </view>
        <view class="dev-gap-sm" />
        <view class="dev-device-frame">
          <NavBar title="仅标题无返回" :show-back="false" />
        </view>
      </view>
    </view>

    <!-- Footer 页脚 -->
    <view class="dev-section">
      <text class="dev-section-title">Footer 页脚</text>
      <view class="dev-section-body">
        <Footer />
        <Footer text="自定义页脚文案 · v2.0" />
      </view>
    </view>

    <!-- TabBar 底部标签栏 -->
    <view class="dev-section">
      <text class="dev-section-title">TabBar 底部标签栏</text>
      <view class="dev-section-body">
        <view class="dev-device-frame tab-frame">
          <TabBar :items="tabItems" v-model:value="activeTab" />
        </view>
        <text class="dev-label">当前选中：{{ tabItems[activeTab]?.label }}</text>
      </view>
    </view>

    <!-- GlobalChatBar 全局对话栏 -->
    <view class="dev-section">
      <text class="dev-section-title">GlobalChatBar 全局 AI 对话栏</text>
      <view class="dev-section-body">
        <view class="dev-device-frame chat-frame">
          <GlobalChatBar placeholder="问点什么…" :unread-count="3" show-back />
        </view>
        <view class="dev-gap-sm" />
        <view class="dev-device-frame chat-frame">
          <GlobalChatBar placeholder="无返回箭头模式" :show-back="false" :show-disclaimer="false" />
        </view>
      </view>
    </view>

    <!-- BottomSheet 底部弹窗 -->
    <view class="dev-section">
      <text class="dev-section-title">BottomSheet 底部弹窗</text>
      <view class="dev-section-body">
        <Button type="primary" @click="showBottomSheet = true">打开 BottomSheet</Button>
        <BottomSheet v-model:open="showBottomSheet" title="筛选条件">
          <view class="dev-sheet-content">
            <text class="dev-label">市场</text>
            <Segmented :items="[
              { label: '沪市', value: 'sh' },
              { label: '深市', value: 'sz' },
              { label: '全部', value: 'all' }
            ]" full-width />
            <view class="dev-gap" />
            <text class="dev-label">排序方式</text>
            <Segmented :items="[
              { label: '涨幅', value: 'up' },
              { label: '跌幅', value: 'down' },
              { label: '成交额', value: 'volume' }
            ]" full-width />
          </view>
          <template #footer>
            <Button type="primary" class="dev-btn-full" @click="showBottomSheet = false">确定</Button>
          </template>
        </BottomSheet>
      </view>
    </view>

    <!-- ActionSheet 操作菜单 -->
    <view class="dev-section">
      <text class="dev-section-title">ActionSheet 操作菜单</text>
      <view class="dev-section-body">
        <Button type="secondary" @click="showActionSheet = true">打开 ActionSheet</Button>
        <ActionSheet
          v-model:open="showActionSheet"
          :actions="actionItems"
          cancel-text="取消"
          @select="onActionSelect"
        />
      </view>
    </view>

    <!-- SubPageCard2 子页面容器 -->
    <view class="dev-section">
      <text class="dev-section-title">SubPageCard2 白色导航栏子页面</text>
      <view class="dev-section-body">
        <Button type="primary" @click="showSubPage = true">打开 SubPageCard2 全屏演示</Button>
        <SubPageCard2
          v-if="showSubPage"
          title="个股详情"
          subtitle="600519.SH 贵州茅台"
          show-back
          @back="showSubPage = false"
        >
          <view class="dev-subpage-content">
            <QuoteHeader
              name="贵州茅台"
              code="600519.SH"
              market="SH"
              :price="1689.50"
              :change="12.30"
              :change-pct="0.73"
              status="normal"
              :metrics="quoteMetrics"
            />
            <view class="dev-gap" />
            <RadarChart title="五维评分" :dimensions="radarDims" :score="78.4" />
            <view class="dev-gap" />
            <StatCard label="总市值" value="21,210亿" trend="+1.2%" trend-type="up" value-type="gold" />
            <view class="dev-gap" />
            <Button type="ghost" class="dev-btn-full" @click="showSubPage = false">关闭演示</Button>
          </view>
        </SubPageCard2>
      </view>
    </view>

    <!-- ===== 新增组件预览 ===== -->

    <!-- Rate 星级评分 -->
    <view class="dev-section">
      <text class="dev-section-title">Rate 星级评分</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <view class="dev-rate-demo">
            <text class="dev-label">金(只读)</text>
            <Rate :model-value="4" type="gold" show-text />
          </view>
          <view class="dev-rate-demo">
            <text class="dev-label">蓝(只读)</text>
            <Rate :model-value="3" type="primary" />
          </view>
          <view class="dev-rate-demo">
            <text class="dev-label">红(只读)</text>
            <Rate :model-value="5" type="up" />
          </view>
        </view>
        <view class="dev-row">
          <view class="dev-rate-demo">
            <text class="dev-label">可交互</text>
            <Rate v-model="rateInteractive" :readonly="false" show-text />
          </view>
        </view>
      </view>
    </view>

    <!-- Timeline 时间线 -->
    <view class="dev-section">
      <text class="dev-section-title">Timeline 时间线</text>
      <view class="dev-section-body">
        <Timeline :items="timelineItems" />
      </view>
    </view>

    <!-- DataTable 数据表格 -->
    <view class="dev-section">
      <text class="dev-section-title">DataTable 数据表格</text>
      <view class="dev-section-body">
        <DataTable title="贵州茅台 600519.SH" :data="stockTableData" :columns="3" />
      </view>
    </view>

    <!-- IndexCard 大盘指数 -->
    <view class="dev-section">
      <text class="dev-section-title">IndexCard 大盘指数</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <IndexCard
            v-for="item in marketIndices"
            :key="item.code"
            :name="item.name"
            :code="item.code"
            :value="item.value"
            :change="item.change"
            :change-percent="item.changePercent"
            :trend="item.changePercent > 0 ? 'up' : item.changePercent < 0 ? 'down' : 'flat'"
          />
        </view>
      </view>
    </view>

    <!-- ChatBubble 聊天气泡 -->
    <view class="dev-section">
      <text class="dev-section-title">ChatBubble 聊天气泡</text>
      <view class="dev-section-body">
        <ChatBubble role="user" content="帮我分析一下贵州茅台最近的走势" />
        <ChatBubble role="assistant" content="贵州茅台近期走势分析如下：资金面持续流入，技术面多头排列，建议关注1700元支撑位。">
          <template #card>
            <view class="dev-bubble-card">
              <text class="dev-bubble-card-title">分析摘要</text>
              <text class="dev-bubble-card-desc">技术面评分 82/100，资金面评分 75/100</text>
            </view>
          </template>
        </ChatBubble>
      </view>
    </view>

    <!-- StreamingText 流式文字 -->
    <view class="dev-section">
      <text class="dev-section-title">StreamingText 流式打字</text>
      <view class="dev-section-body">
        <view class="dev-streaming-box">
          <StreamingText :text="streamingText" :speed="50" />
        </view>
      </view>
    </view>

    <!-- AudioPlayer 音频播放器 -->
    <view class="dev-section">
      <text class="dev-section-title">AudioPlayer 音频播放器</text>
      <view class="dev-section-body">
        <AudioPlayer title="早点听 · 7月28日市场早报" src="" />
      </view>
    </view>

    <!-- Modal 模态框 -->
    <view class="dev-section">
      <text class="dev-section-title">Modal 模态框</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <Button type="primary" @click="showModal = true">打开 Modal</Button>
        </view>
        <Modal v-model="showModal" title="确认操作">
          <text class="card-content">确定要将贵州茅台加入自选股吗？加入后将实时推送异动提醒。</text>
          <template #footer>
            <view class="dev-modal-footer">
              <Button type="ghost" @click="showModal = false">取消</Button>
              <Button type="primary" @click="showModal = false">确定</Button>
            </view>
          </template>
        </Modal>
      </view>
    </view>

    <!-- Toast 轻提示 -->
    <view class="dev-section">
      <text class="dev-section-title">Toast 轻提示</text>
      <view class="dev-section-body">
        <view class="dev-row">
          <Button type="primary" @click="showToast('success', '操作成功')">Success</Button>
          <Button type="danger" @click="showToast('error', '操作失败')">Error</Button>
          <Button type="secondary" @click="showToast('warning', '请注意风险')">Warning</Button>
          <Button type="ghost" @click="showToast('info', '这是一条信息')">Info</Button>
        </view>
        <Toast v-model:visible="toastVisible" :message="toastMessage" :type="toastType" :duration="2000" position="top" />
      </view>
    </view>

    <!-- Collapse 折叠面板 -->
    <view class="dev-section">
      <text class="dev-section-title">Collapse 折叠面板</text>
      <view class="dev-section-body">
        <Collapse v-model="collapseKeys" :items="[
          { key: 'panel1', title: '基本面分析' },
          { key: 'panel2', title: '技术面分析' },
          { key: 'panel3', title: '资金面分析', disabled: true }
        ]">
          <template #panel1>
            <text class="card-content">贵州茅台基本面稳健，品牌溢价显著，2024年Q1营收同比增长15%。</text>
          </template>
          <template #panel2>
            <text class="card-content">MACD金叉，KDJ超卖区回升，短期技术面偏多。</text>
          </template>
          <template #panel3>
            <text class="card-content">资金面数据加载中...</text>
          </template>
        </Collapse>
      </view>
    </view>

    <!-- Steps 步骤条 -->
    <view class="dev-section">
      <text class="dev-section-title">Steps 步骤条</text>
      <view class="dev-section-body">
        <text class="dev-label">水平方向</text>
        <view class="dev-gap-sm" />
        <Steps :steps="stepList" :current="currentStep" direction="horizontal" />
        <view class="dev-gap" />
        <text class="dev-label">垂直方向</text>
        <view class="dev-gap-sm" />
        <Steps :steps="stepList" :current="currentStep" direction="vertical" />
        <view class="dev-gap" />
        <view class="dev-row">
          <Button type="ghost" size="sm" @click="currentStep = Math.max(0, currentStep - 1)">上一步</Button>
          <Button type="primary" size="sm" @click="currentStep = Math.min(stepList.length - 1, currentStep + 1)">下一步</Button>
        </view>
      </view>
    </view>

    <!-- Footer 组件作为页面结尾 -->
    <Footer text="AiStock 组件库 · 蓝白金融设计系统" />
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
import Avatar from '@/components/Avatar.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import LoadingState from '@/components/LoadingState.vue'
import StatCard from '@/components/StatCard.vue'
import ListCell from '@/components/ListCell.vue'
import PageCard from '@/components/PageCard.vue'
import SubPageCard from '@/components/SubPageCard.vue'
import RadarChart from '@/components/RadarChart.vue'
import RelationGraph from '@/components/RelationGraph.vue'
import Sparkline from '@/components/Sparkline.vue'
import Gauge from '@/components/Gauge.vue'
import Segmented from '@/components/Segmented.vue'
import QuoteHeader from '@/components/QuoteHeader.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import TabBar from '@/components/TabBar.vue'
import GlobalChatBar from '@/components/GlobalChatBar.vue'
import BottomSheet from '@/components/BottomSheet.vue'
import ActionSheet from '@/components/ActionSheet.vue'
import SubPageCard2 from '@/components/SubPageCard2.vue'
import Rate from '@/components/Rate.vue'
import Timeline from '@/components/Timeline.vue'
import DataTable from '@/components/DataTable.vue'
import IndexCard from '@/components/IndexCard.vue'
import ChatBubble from '@/components/ChatBubble.vue'
import StreamingText from '@/components/StreamingText.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import Modal from '@/components/Modal.vue'
import Toast from '@/components/Toast.vue'
import Collapse from '@/components/Collapse.vue'
import Steps from '@/components/Steps.vue'

const stockCode = ref('600740.SH')
const searchText = ref('')
const switch1 = ref(true)
const switch2 = ref(false)

// 数据可视化组件示例数据
const radarDims = [
  { label: '成长性', value: 82 },
  { label: '盈利能力', value: 75 },
  { label: '偿债能力', value: 68 },
  { label: '运营效率', value: 90 },
  { label: '现金流', value: 60 }
]

const relationNodes = [
  { key: 'main', label: '宁德时代', category: 'core' as const },
  { key: 'u1', label: '锂矿', category: 'upstream' as const },
  { key: 'u2', label: '正极材料', category: 'upstream' as const },
  { key: 'd1', label: '新能源车', category: 'downstream' as const },
  { key: 'd2', label: '储能', category: 'downstream' as const },
  { key: 'r1', label: '锂电池', category: 'downstream' as const },
  { key: 'r2', label: '创业板', category: 'downstream' as const }
]
const relationLinks = [
  { from: 'main', to: 'u1', label: '采购' },
  { from: 'main', to: 'u2', label: '采购' },
  { from: 'main', to: 'd1', label: '供应' },
  { from: 'main', to: 'd2', label: '供应' },
  { from: 'main', to: 'r1', label: '所属' },
  { from: 'main', to: 'r2', label: '所属' }
]
const clickedNode = ref('')
function onNodeClick(node: { id: string; label: string }) {
  clickedNode.value = node.label
}

function onActionSelect(action: { key: string; label: string; danger?: boolean }) {
  clickedNode.value = `ActionSheet: ${action.label}`
}

const sparkUp = [10, 12, 11, 14, 13, 16, 15, 18, 17, 21]
const sparkDown = [21, 19, 20, 17, 18, 15, 16, 13, 14, 10]
const sparkFlat = [15, 15, 14, 15, 16, 15, 15, 14, 15, 15]

// ===== Segmented 分段控制器 =====
const segValue = ref('1day')
const segItems = [
  { label: '分时', value: '1min' },
  { label: '日K', value: '1day' },
  { label: '周K', value: '1week' },
  { label: '月K', value: '1month' }
]

// ===== QuoteHeader 行情头部 =====
const quoteMetrics = [
  { label: '成交量', value: '2.3万手', trend: 'up' as const },
  { label: '成交额', value: '4.56亿', trend: 'up' as const },
  { label: '换手率', value: '0.89%' },
  { label: '市盈率', value: '32.5' }
]

// ===== TabBar 底部标签栏 =====
const activeTab = ref(0)
const tabItems = [
  { key: 'home', label: '首页', icon: 'home-line' },
  { key: 'market', label: '行情', icon: 'chart-line' },
  { key: 'trade', label: '交易', icon: 'trade-line' },
  { key: 'mine', label: '我的', icon: 'user-line' }
]

// ===== BottomSheet 底部弹窗 =====
const showBottomSheet = ref(false)

// ===== ActionSheet 操作菜单 =====
const showActionSheet = ref(false)
const actionItems = [
  { key: 'favorite', label: '加入自选' },
  { key: 'alert', label: '设置提醒' },
  { key: 'share', label: '分享给好友' },
  { key: 'delete', label: '删除', danger: true }
]

// ===== SubPageCard2 子页面容器 =====
const showSubPage = ref(false)

// ===== Rate 星级评分 =====
const rateInteractive = ref(3)

// ===== Timeline 时间线 =====
const timelineItems = [
  { time: '2024-Q1', title: '新能源车补贴延续', description: '国务院发布延续新能源车补贴政策', type: 'up' as const, extra: '+3.2%' },
  { time: '2024-Q2', title: '芯片供应紧张加剧', description: '全球芯片短缺影响汽车产能', type: 'down' as const, extra: '-1.8%' },
  { time: '2024-Q3', title: '行业规范调整', description: '新规出台，市场观望情绪浓厚', type: 'neutral' as const, extra: '+0.1%' }
]

// ===== DataTable 数据表格 =====
const stockTableData = [
  { label: '总市值', value: 21210, unit: '亿', formatter: 'raw' as const },
  { label: '市盈率', value: 32.5, formatter: 'price' as const },
  { label: '市净率', value: 8.7, formatter: 'price' as const },
  { label: '成交量', value: 23000, formatter: 'volume' as const },
  { label: '成交额', value: 456000000, formatter: 'amount' as const },
  { label: '换手率', value: 0.89, formatter: 'percent' as const, trend: true }
]

// ===== IndexCard 大盘指数 =====
const marketIndices = [
  { name: '上证指数', code: '000001', value: 3128.42, change: 22.67, changePercent: 0.73 },
  { name: '深证成指', code: '399001', value: 9847.15, change: -31.52, changePercent: -0.32 },
  { name: '创业板指', code: '399006', value: 1923.67, change: 23.84, changePercent: 1.25 }
]

// ===== StreamingText 流式文字 =====
const streamingText = ref('AI 正在分析市场趋势，贵州茅台近期资金流入明显，技术面呈现多头排列，建议关注 1700 元支撑位。')

// ===== Modal 模态框 =====
const showModal = ref(false)

// ===== Toast 轻提示 =====
const toastVisible = ref(false)
const toastMessage = ref('操作成功')
const toastType = ref<'info' | 'success' | 'warning' | 'error'>('success')

function showToast(type: 'info' | 'success' | 'warning' | 'error', msg: string) {
  toastType.value = type
  toastMessage.value = msg
  toastVisible.value = true
}

// ===== Collapse 折叠面板 =====
const collapseKeys = ref<string[]>(['panel1'])

// ===== Steps 步骤条 =====
const currentStep = ref(1)
const stepList = [
  { title: '选择股票', description: '输入或选择目标股票' },
  { title: 'AI 分析', description: '多维度智能分析' },
  { title: '生成报告', description: '输出分析结果' },
  { title: '完成', description: '查看报告详情' }
]
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

.dev-icon-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $s-2;
}

.dev-icon-label {
  font-size: $font-size-xs;
  color: $ink-soft;
}

.dev-stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $s-4;
}

.dev-page-demo {
  border: 1rpx solid $line;
  border-radius: $r-lg;
  overflow: hidden;
}

/* ===== 设备框架：用于在预览中展示 fixed 定位组件 ===== */
.dev-device-frame {
  position: relative;
  overflow: hidden;
  border-radius: $r-lg;
  border: 2rpx solid $line;
  background: $bg-page;

  /* 覆盖子组件的 fixed 定位为 absolute，使其在框架内显示 */
  :deep(.as-tab-bar),
  :deep(.as-global-chat-bar),
  :deep(.as-nav-bar) {
    position: absolute;
  }
}

/* TabBar 框架高度 */
.tab-frame {
  height: 120rpx;
}

/* GlobalChatBar 框架高度 */
.chat-frame {
  height: 140rpx;
}

/* BottomSheet 内容区 */
.dev-sheet-content {
  padding: $s-2 0;
}

/* SubPageCard2 内容区 */
.dev-subpage-content {
  padding: $s-4;
}

/* 提示文字 */
.dev-spark-tip {
  display: block;
  margin-top: $s-2;
  font-size: $font-size-xs;
  color: $primary;
  font-weight: 500;
}

/* 全宽按钮 */
.dev-btn-full {
  width: 100%;
}

/* Rate 评分演示 */
.dev-rate-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $s-1;
}

/* ChatBubble 卡片内容 */
.dev-bubble-card {
  margin-top: $s-2;
  padding: $s-2 $s-3;
  background: $primary-50;
  border-radius: $r-sm;
}

.dev-bubble-card-title {
  display: block;
  font-size: $font-size-sm;
  font-weight: 600;
  color: $primary;
  margin-bottom: 4rpx;
}

.dev-bubble-card-desc {
  font-size: $font-size-xs;
  color: $ink-soft;
}

/* StreamingText 容器 */
.dev-streaming-box {
  padding: $s-3;
  background: $bg-soft;
  border-radius: $r-md;
  min-height: 80rpx;
}

/* Modal 底部按钮 */
.dev-modal-footer {
  display: flex;
  gap: $s-2;
  justify-content: flex-end;
}
</style>