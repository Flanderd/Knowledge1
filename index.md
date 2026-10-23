---
layout: home
title: 首页

hero:
  name: 个人知识库
  text: 四个学科的学习笔记
  tagline: 数学 · 语文 · 经济学 · 会计学
  image:
    src: /logo.svg
    alt: 个人知识库
  actions:
    - theme: brand
      text: 开始阅读
      link: /subjects/math/
    - theme: alt
      text: 写作规范
      link: /about/conventions

features:
  - title: 数学
    details: 微积分、线性代数、概率统计。全站支持 LaTeX 公式渲染，$ ... $ 与 \[ ... \] 均可书写。
    link: /subjects/math/
  - title: 语文
    details: 古代文学、现代文学与写作方法。沉淀文本细读、文言字词与作文结构的分析框架。
    link: /subjects/chinese/
  - title: 经济学
    details: 微观与宏观两条主线。用图形、公式与现实案例解释供需、弹性、市场结构与国民收入核算。
    link: /subjects/economics/
  - title: 会计学
    details: 从会计要素与会计等式出发，覆盖借贷记账法、会计分录与三大财务报表的勾稽关系。
    link: /subjects/accounting/
---

<RecentUpdates />

::: tip 想立刻开始写？
先读一遍 [写作与 frontmatter 规范](/about/conventions)，照着模板新建文件即可。
:::

## 如何使用这个站点

- **浏览器检索**：右上角「搜索文档」（快捷键 `⌘ / Ctrl + K`），本地索引、离线可用。
- **按学科浏览**：顶部导航直达四个学科首页，左侧栏按分类分组折叠。
- **深色模式**：右上角图标切换，默认跟随系统偏好。
- **公式**：数学与经济学笔记中直接用 `$ ... $` 写行内公式，`$$ ... $$` 写独立公式。
