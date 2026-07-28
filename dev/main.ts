import { createApp, defineComponent, h, ref, computed, onUnmounted } from 'vue'
import App from './App.vue'
import CatalogPage from './CatalogPage.vue'
import './global.scss'

/**
 * 轻量 hash 路由（不引入 vue-router 依赖，dev 环境专用）：
 *   #/         → 组件预览首页（App.vue，所有组件分区分组展示）
 *   #/catalog  → 组件目录页（CatalogPage.vue，搜索 + 分类 + 预览）
 *
 * 通过 App.vue 顶部入口与 CatalogPage 顶部「返回预览」链接互相切换，
 * 也可直接在地址栏修改 hash 访问。
 */
const Root = defineComponent({
  name: 'DevRoot',
  setup() {
    const hash = ref(window.location.hash || '')
    const route = computed(() => hash.value.replace(/^#/, '') || '/')

    const onHashChange = () => {
      hash.value = window.location.hash || ''
    }
    window.addEventListener('hashchange', onHashChange)
    onUnmounted(() => {
      window.removeEventListener('hashchange', onHashChange)
    })

    return () => (route.value === '/catalog' ? h(CatalogPage) : h(App))
  }
})

createApp(Root).mount('#app')
