import { defineConfig } from 'vitepress'
import { katex } from '@mdit/plugin-katex'

// 部署到子站点（如 GitHub Pages 的 /仓库名/）时，通过环境变量覆盖：
//   BASE_PATH=/knowledge-base/ npm run build
// 生成 sitemap 时可用：SITE_HOSTNAME=https://example.com npm run build
const BASE_PATH = process.env.BASE_PATH || '/'
const SITE_HOSTNAME = process.env.SITE_HOSTNAME || ''

export default defineConfig({
  lang: 'zh-CN',
  title: '个人知识库',
  description: '数学 · 语文 · 经济学 · 会计学 学习笔记与资料整理',
  base: BASE_PATH,
  // GitHub Pages 静态服务不支持无后缀 URL 重写，链接统一用 .html 形式
  cleanUrls: false,
  lastUpdated: true,
  // README.md 是项目说明，不参与站点构建（否则会被渲染成 /README.html 页面）
  srcExclude: ['README.md'],
  appearance: true, // 跟随系统 + 右上角手动切换浅色/深色
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE_PATH}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#16ab77' }],
    // 主题色防闪烁：渲染首屏前读回用户上次选择的色板（默认翡翠绿）
    [
      'script',
      {},
      `(function(){try{var p=localStorage.getItem('kb-palette');if(['violet','ocean','obsidian'].indexOf(p)>-1){document.documentElement.setAttribute('data-palette',p)}}catch(e){}})()`
    ]
  ],

  // ---------- Markdown：LaTeX 公式 ----------
  markdown: {
    config(md) {
      // 行内：$...$ 或 \(...\)   块级：$$...$$ 或 \[...\]
      md.use(katex, {
        delimiters: 'all',
        throwOnError: false, // 公式写错时只标红，不中断构建
        errorColor: '#cc0000',
        strict: 'ignore',
        output: 'htmlAndMathml' // 无障碍 + 可复制源码
      })
    },
    image: { lazyLoading: true }
  },

  // ---------- 主题配置 ----------
  themeConfig: {
    nav: [
      { text: '首页', link: '/', activeMatch: '^/$' },
      { text: '数学', link: '/subjects/math/', activeMatch: '/subjects/math/' },
      { text: '语文', link: '/subjects/chinese/', activeMatch: '/subjects/chinese/' },
      { text: '经济学', link: '/subjects/economics/', activeMatch: '/subjects/economics/' },
      { text: '会计学', link: '/subjects/accounting/', activeMatch: '/subjects/accounting/' },
      { text: '写作规范', link: '/about/conventions', activeMatch: '/about/' }
    ],

    // 多侧边栏：按学科（目录前缀）分别配置，支持「分组 → 页面」多级结构
    sidebar: {
      '/subjects/math/': [
        { text: '数学总览', link: '/subjects/math/' },
        {
          text: '微积分',
          collapsed: false,
          items: [
            { text: '极限与连续（模板）', link: '/subjects/math/calculus/limits-and-continuity' },
            { text: '导数与微分应用', link: '/subjects/math/calculus/derivatives' }
          ]
        },
        {
          text: '线性代数',
          collapsed: true,
          items: [{ text: '矩阵与行列式', link: '/subjects/math/linear-algebra/matrices' }]
        },
        {
          text: '概率统计',
          collapsed: true,
          items: [{ text: '随机变量与分布', link: '/subjects/math/probability/random-variables' }]
        }
      ],

      '/subjects/chinese/': [
        { text: '语文总览', link: '/subjects/chinese/' },
        {
          text: '古代文学',
          collapsed: false,
          items: [
            { text: '古诗词鉴赏方法（模板）', link: '/subjects/chinese/classical/poetry-appreciation' },
            { text: '文言实词与虚词', link: '/subjects/chinese/classical/classical-words' }
          ]
        },
        {
          text: '现代文学',
          collapsed: true,
          items: [{ text: '现代散文阅读', link: '/subjects/chinese/modern/prose-reading' }]
        },
        {
          text: '写作方法',
          collapsed: true,
          items: [{ text: '议论文结构', link: '/subjects/chinese/writing/argumentative-essay' }]
        }
      ],

      '/subjects/economics/': [
        { text: '经济学总览', link: '/subjects/economics/' },
        {
          text: '微观经济学',
          collapsed: false,
          items: [
            { text: '供需与弹性（模板）', link: '/subjects/economics/micro/supply-demand-elasticity' },
            { text: '市场结构', link: '/subjects/economics/micro/market-structure' }
          ]
        },
        {
          text: '宏观经济学',
          collapsed: true,
          items: [{ text: 'GDP 与国民收入', link: '/subjects/economics/macro/gdp-and-national-income' }]
        }
      ],

      '/subjects/accounting/': [
        { text: '会计学总览', link: '/subjects/accounting/' },
        {
          text: '基础会计',
          collapsed: false,
          items: [
            { text: '会计要素与会计等式（模板）', link: '/subjects/accounting/fundamentals/accounting-elements' },
            { text: '借贷记账法与会计分录', link: '/subjects/accounting/fundamentals/journal-entries' }
          ]
        },
        {
          text: '财务报表',
          collapsed: true,
          items: [{ text: '资产负债表与利润表', link: '/subjects/accounting/statements/balance-sheet' }]
        }
      ],

      '/about/': [
        {
          text: '站点说明',
          items: [{ text: '写作与 frontmatter 规范', link: '/about/conventions' }]
        }
      ]
    },

    outline: { level: [2, 3], label: '本页目录' },

    // ---------- 本地全文搜索 ----------
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        miniSearch: {
          // 中文没有空格分词，这里改为「汉字逐字 + 英数按词」切分
          tokenize: (text: string) => text.match(/[\u4e00-\u9fa5]|[a-zA-Z0-9]+/g) || [],
          options: {
            // 中文不做大小写折叠，英文统一转小写
            processTerm: (term: string) =>
              /[\u4e00-\u9fa5]/.test(term) ? term : term.toLowerCase()
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 1, titles: 2 }
          }
        },
        // 单语言站点直接写 translations，等价作用于当前 locale
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '未找到与',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        }
      }
    },

    // ---------- 界面中文化 ----------
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '目录',
    outlineTitle: '本页目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    langMenuLabel: '语言',
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'medium', timeStyle: 'short' }
    },
    notFound: {
      title: '页面走丢了',
      quote: '这个地址下暂时没有内容，也许它已经被移动或重命名。',
      linkText: '返回首页'
    },
    footer: {
      message: '使用 VitePress 构建 · 全部内容以 Markdown 维护',
      copyright: 'Copyright © 2026 个人知识库'
    }
  },

  // ---------- Sitemap（可选） ----------
  sitemap: SITE_HOSTNAME ? { hostname: SITE_HOSTNAME } : undefined,

  vite: {
    server: { port: 5173 }
  }
})
