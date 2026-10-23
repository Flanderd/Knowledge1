# 个人知识库（VitePress）

一个用 Markdown 维护的跨学科笔记站点，收录 **数学、语文、经济学、会计学** 四个学科的学习笔记。
界面与正文统一使用简体中文。

已内置：**多级分类侧边栏 / 顶部分学科导航 / 首页学科入口与最近更新 / 本地全文搜索 / 深色模式 / LaTeX 公式渲染 / 统一 frontmatter 规范**。

---

## 一、目录结构

```text
knowledge-base/
├── package.json                     # 依赖与 dev / build / preview 脚本
├── .gitignore
├── index.md                         # 首页（学科入口卡片 + 最近更新）
├── about/
│   └── conventions.md               # 写作与 frontmatter 规范（务必先读）
├── public/
│   └── logo.svg                     # 站点图标
├── subjects/                        # ← 内容根目录，按学科划分
│   ├── math/                        # 数学
│   │   ├── index.md                 # 学科首页（不进"最近更新"列表）
│   │   ├── calculus/
│   │   │   ├── limits-and-continuity.md      ★ 模板：极限与连续
│   │   │   └── derivatives.md
│   │   ├── linear-algebra/
│   │   │   └── matrices.md
│   │   └── probability/
│   │       └── random-variables.md
│   ├── chinese/                     # 语文
│   │   ├── index.md
│   │   ├── classical/
│   │   │   ├── poetry-appreciation.md        ★ 模板：古诗词鉴赏方法
│   │   │   └── classical-words.md
│   │   ├── modern/
│   │   │   └── prose-reading.md
│   │   └── writing/
│   │       └── argumentative-essay.md
│   ├── economics/                   # 经济学
│   │   ├── index.md
│   │   ├── micro/
│   │   │   ├── supply-demand-elasticity.md   ★ 模板：供需与弹性
│   │   │   └── market-structure.md
│   │   └── macro/
│   │       └── gdp-and-national-income.md
│   └── accounting/                  # 会计学
│       ├── index.md
│       ├── fundamentals/
│       │   ├── accounting-elements.md        ★ 模板：会计要素与会计等式
│       │   └── journal-entries.md
│       └── statements/
│           └── balance-sheet.md
└── .vitepress/
    ├── config.mts                   # 站点与主题配置（导航、侧边栏、搜索、公式）
    └── theme/
        ├── index.ts                 # 扩展默认主题，注册全局组件、引入 KaTeX 样式
        ├── custom.css               # 品牌色 / 排版 / 公式样式覆盖
        ├── posts.data.ts            # 「最近更新」数据加载器（构建时扫描 subjects/）
        └── components/
            └── RecentUpdates.vue    # 首页「最近更新」卡片组件
```

构建产物默认输出到 `.vitepress/dist/`，缓存放在 `.vitepress/cache/`，两者都已在 `.gitignore` 中忽略。

> **命名约定**：目录与文件名使用小写英文 + 连字符，中文写在 `title` 与正文里。
> 这样可以避免中文路径在部分静态托管上出现 URL 编码问题。

---

## 二、快速开始

```bash
cd knowledge-base
npm install
```

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器，默认 `http://localhost:5173`，改动热更新 |
| `npm run build` | 生成静态站点到 `.vitepress/dist/` |
| `npm run preview` | 在本地以生产模式预览构建产物（默认 4173 端口） |

**本地预览静态产物**：

```bash
npm run build
npm run preview          # 访问 http://localhost:4173
# 或任意静态服务器
npx serve .vitepress/dist
```

---

## 三、配置文件要点

### `.vitepress/config.mts`

| 配置项 | 说明 |
| --- | --- |
| `lang: 'zh-CN'` | 声明语言，影响 `lang` 属性与本地化文案 |
| `base` | 站点根路径。**部署到子目录时必须改**（见第五节） |
| `cleanUrls: true` | 去掉 URL 中的 `.html`，生成 `xxx/index.html` |
| `lastUpdated: true` | 依据 git 提交时间在页脚显示「最后更新于」 |
| `appearance: true` | 深色模式：默认跟随系统，右上角可手动切换 |
| `themeConfig.nav` | 顶部导航，每学科一项，用 `activeMatch` 保持高亮 |
| `themeConfig.sidebar` | 按路径前缀分组的多侧边栏，支持「分组 → 页面」两级嵌套 |
| `themeConfig.outline` | 右侧「本页目录」，抓取 `##` 与 `###` |
| `themeConfig.search` | `provider: 'local'` 本地全文搜索；含中文分词函数 |
| `markdown.config` | 挂载 KaTeX 插件，实现 LaTeX 渲染 |

多侧边栏的写法（按目录前缀匹配）：

```ts
sidebar: {
  '/subjects/math/': [
    { text: '数学总览', link: '/subjects/math/' },
    {
      text: '微积分',
      collapsed: false,
      items: [
        { text: '极限与连续（模板）', link: '/subjects/math/calculus/limits-and-continuity' },
        { text: '导数与微分应用',     link: '/subjects/math/calculus/derivatives' }
      ]
    }
  ],
  // ……其余三个学科同理
}
```

### `.vitepress/theme/index.ts`

```ts
import DefaultTheme from 'vitepress/theme'
import RecentUpdates from './components/RecentUpdates.vue'
import 'katex/dist/katex.min.css'   // 必须在 custom.css 之前
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('RecentUpdates', RecentUpdates)   // 首页直接 <RecentUpdates />
  }
}
```

### `.vitepress/theme/posts.data.ts`

用 `createContentLoader` 在**构建时**扫描 `subjects/**/*.md`，产出一份 JSON 供首页组件读取。
两个容易踩的坑：

1. 学科首页的 URL 以 `/` 结尾，需要过滤掉；
2. YAML 中 `date: 2026-10-23` 会被解析为 `Date` 对象，
   **必须归一化为 `YYYY-MM-DD` 字符串后再排序**，否则「最近更新」顺序会错乱。

### 主题色：四套配色自由切换

导航栏右侧有一个**齿轮设置图标**（移动端在抽屉菜单顶部），点击弹出主题色面板，
选择后即时切换全站主题色：

| 色板 | 标识 | 浅色模式主色 | 深色模式主色 |
| --- | --- | --- | --- |
| 翡翠绿（默认） | `emerald` | `#067a52` | `#48d6a5` |
| 罗兰紫 | `violet` | `#7c3aed` | `#b4a0fb` |
| 深海蓝 | `ocean` | `#0b5c8e` | `#6cb8e8` |
| 曜石黑 | `obsidian` | `#2b3440` | `#d7dde3` |

实现机制（三件事配合）：

1. **`palettes.css`** 是唯一色源。每个色板只覆盖 `--vp-c-brand-1/2/3/soft` 四个变量，
   按钮、链接、行内代码、tip/note 容器、侧边栏高亮、首页大标题渐变全部自动跟随；
   色板写在 `<html data-palette="...">` 上，与 VitePress 的 `.dark` 类（明暗模式）相互独立，
   **4 色板 × 2 明暗 = 8 种组合**。曜石黑在深色模式下额外压低了背景色（`--vp-c-bg` 等五个变量），
   更接近曜石质感。
2. **`ThemePalette.vue`** 是设置图标组件：齿轮按钮 + 下拉面板（色板圆点 + 中文名 +
   当前项对勾），通过布局插槽 `nav-bar-content-after` 与 `nav-screen-content-after`
   渲染在桌面导航栏和移动端抽屉中；支持点击面板外、按 Esc 关闭，选择后写入
   `localStorage`（键 `kb-palette`）并更新 `data-palette` 属性。
3. **`config.mts` head 里的内联脚本**在首屏渲染前读回上次选择，避免刷新时闪一下默认绿色。

新增一套色板只需三步：

1. 在 `palettes.css` 里照抄一段 `[data-palette='xxx'] { ... }` 与 `.dark[data-palette='xxx']`；
2. 在 `ThemePalette.vue` 的 `palettes` 数组中加一项（含圆点展示色）；
3. 在 `config.mts` 防闪烁脚本的数组里加上 `'xxx'`。

---

## 四、frontmatter 规范

每篇学科笔记统一使用以下字段（模板文件即为范例）：

```yaml
---
title: 极限与连续
date: 2026-10-23
updated: 2026-10-23
subject: math                # math | chinese | economics | accounting
subjectLabel: 数学
category: 微积分              # 与所在目录对应
tags:
  - 极限
  - 连续性
description: 一句话摘要，用于首页卡片与搜索结果。
---
```

| 字段 | 用途 |
| --- | --- |
| `title` | 页面主标题、侧边栏链接、搜索结果、最近更新列表 |
| `date` | 首写日期，决定首页「最近更新」排序 |
| `updated` | 手工维护的修订日期 |
| `subject` / `subjectLabel` | 学科标识与中文名，显示在卡片上 |
| `category` | 所属分类，与目录名对应 |
| `tags` | 3—5 个关键词 |
| `description` | 60—100 字摘要 |

> `subject` 只取四个学科代码之一；正文中不再重复写一级标题，从 `##` 开始。
> 详细规范见站内页面 [写作与 frontmatter 规范](/about/conventions)。

---

## 五、部署到静态托管

### 通用步骤

```bash
npm run build      # 产物在 .vitepress/dist/
```

把 `.vitepress/dist/` 整个目录上传到静态托管即可。**关键是 `base` 要与部署路径一致**。

### 部署在域名根目录（如 example.com）

`config.mts` 中保持 `base: '/'`，直接上传 `dist` 目录内容。

### 部署在子路径（如 GitHub Pages 的 example.com/knowledge-base/）

```bash
BASE_PATH=/knowledge-base/ npm run build
```

等价于把 `config.mts` 里的 `BASE_PATH` 写成 `'/knowledge-base/'`。
**子路径部署时务必带上前后斜杠**，否则资源路径会 404。

生成 sitemap（可选）：

```bash
SITE_HOSTNAME=https://example.com npm run build
```

### GitHub Pages（GitHub Actions）

`.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0          # lastUpdated 需要完整 git 历史
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: 安装依赖
        run: npm ci
      - name: 构建
        run: npm run build
        env:
          BASE_PATH: /${{ github.event.repository.name }}/
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

仓库 Settings → Pages → Source 选择 **GitHub Actions**。
若使用自定义域名，把 `BASE_PATH` 改成 `/` 并在仓库里放一个 `CNAME`。

### Vercel / Netlify

在控制台填入：

| 项 | 值 |
| --- | --- |
| Build Command | `npm run build` |
| Output Directory | `.vitepress/dist` |
| Install Command | `npm install` |
| Node Version | 20 或 18 |

部署在域名根目录时无需设置环境变量；若放在子路径，追加 `BASE_PATH=/子路径/`。

### 自建 Nginx

```nginx
server {
  listen 80;
  server_name notes.example.com;
  root /var/www/knowledge-base;     # dist 目录内容
  index index.html;

  # cleanUrls 生成的目录式 URL
  location / {
    try_files $uri $uri/ $uri.html /404.html;
  }

  # 静态资源长期缓存
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### 部署前自查

- [ ] `base` 与最终访问路径一致；
- [ ] `npm run preview` 下逐页点一遍，确认无 404；
- [ ] 若使用 `lastUpdated`，CI 中 `fetch-depth: 0`（否则显示的时间会不准）；
- [ ] 静态托管需支持"目录式 URL 回退到 index.html"；若不支持，把 `cleanUrls` 改为 `false`。

---

## 六、常见问题

| 现象 | 原因与处理 |
| --- | --- |
| 公式没渲染，页面出现红色内容 | TeX 语法错误；检查是否有未闭合的 `$`、不支持的宏 |
| 公式没渲染，原文里有美元符号 | `$` 是公式起始符，正文里需写成 `\$` |
| 公式不渲染且左右有空格 | `$ x $` 写法默认不支持，去掉两侧空格 |
| 中文搜索不到 | MiniSearch 默认按空格分词，本项目已在 `config.mts` 里配置中文分词函数，勿删除 |
| 「最近更新」顺序错乱 | `date` 被解析成了 Date 对象，参考 `posts.data.ts` 的 `toDateString` |
| 新页面没出现在侧边栏 | 需要在 `config.mts` 的 `sidebar` 中手动登记链接（无 `.md` 后缀） |
| 深色模式下公式颜色发灰 | 已在 `custom.css` 中处理，若自定义主题请保留 `.dark .katex` 规则 |

---

## 七、写作建议

每篇笔记统一按这个骨架组织，便于考前扫读：

1. `## 一句话概括` —— 用引用块放在开头；
2. 分节展开，重要结论与对照优先用**表格**；
3. 公式用 `$...$` / `$$...$$`，中文放进 `\text{}`；
4. 末尾固定给出 `## 常见误区`、`## 速查清单`、`## 参考`。

四个学科的模板文档（左下角标 ★ 的文件）可以直接复制改名使用。
