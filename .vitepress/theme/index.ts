import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import RecentUpdates from './components/RecentUpdates.vue'
import ThemePalette from './components/ThemePalette.vue'

// KaTeX 样式必须在自定义样式之前引入，方便后续覆盖
import 'katex/dist/katex.min.css'
import './custom.css'
import './palettes.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 桌面端导航栏右侧与移动端抽屉菜单中各放一组色板圆点
      'nav-bar-content-after': () => h(ThemePalette),
      'nav-screen-content-after': () => h(ThemePalette)
    })
  },
  enhanceApp({ app }) {
    // 注册为全局组件，Markdown 首页里直接写 <RecentUpdates /> 即可
    app.component('RecentUpdates', RecentUpdates)
  }
} satisfies Theme
