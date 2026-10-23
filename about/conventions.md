---
title: 写作与 frontmatter 规范
description: 本站的写作约定：统一的 frontmatter 字段、目录与文件命名规则、新增学科或分类的操作步骤，以及 LaTeX 与特殊字符的书写要求。
---

# 写作与 frontmatter 规范

保持格式统一，才能让"最近更新""搜索""侧边栏"这些自动化功能正常工作。新建笔记前请照抄下面的模板。

## 一、统一 frontmatter 模板

每篇**学科笔记**（不含学科首页）的文件开头必须包含如下字段：

```yaml
---
title: 极限与连续
date: 2026-10-23
updated: 2026-10-23
subject: math
subjectLabel: 数学
category: 微积分
tags:
  - 极限
  - 连续性
  - 等价无穷小
description: 从 ε-δ 语言出发梳理数列与函数极限、极限运算法则、两个重要极限、等价无穷小与连续性判定。
---
```

### 字段说明

| 字段 | 必填 | 取值与用途 |
| --- | --- | --- |
| `title` | ✅ | 文档标题，显示在页面顶部、侧边栏链接、搜索结果与"最近更新"中。**正文中不要再写一级标题**，二级标题起手写 |
| `date` | ✅ | 首次写作日期，格式 `YYYY-MM-DD`。用于"最近更新"排序 |
| `updated` | 推荐 | 最后一次修订日期。手工维护，与 VitePress 依据 git 生成的"最后更新于"互为补充 |
| `subject` | ✅ | 学科标识，只能取 `math` / `chinese` / `economics` / `accounting` 之一。用于样式与扩展筛选 |
| `subjectLabel` | ✅ | 学科中文名，显示在卡片上 |
| `category` | ✅ | 所属分类，需与目录名对应（如"微积分"对应 `calculus/`） |
| `tags` | ✅ | 3—5 个关键词，用 YAML 列表写法。**不要写成** `tags: [a, b]` 以外的中文逗号形式 |
| `description` | ✅ | 60—100 字的一句话摘要，用于首页卡片与 SEO |

> **注意**：正文中第一个 `#` 标题请直接写与 `title` 相同的文字，或干脆不写一级标题——
> VitePress 会把 `title` 作为页面主标题渲染，重复写会显示两次。

## 二、目录与文件命名

```
subjects/<学科代码>/<分类代码>/<文件名>.md
```

| 学科 | 学科代码 | 分类代码 |
| --- | --- | --- |
| 数学 | `math` | `calculus`、`linear-algebra`、`probability` |
| 语文 | `chinese` | `classical`、`modern`、`writing` |
| 经济学 | `economics` | `micro`、`macro` |
| 会计学 | `accounting` | `fundamentals`、`statements` |

命名规则：

- **目录与文件名一律使用小写英文 + 连字符**（如 `limits-and-continuity.md`）。
  中文路径虽可用，但在部分静态托管上会出现编码问题；中文内容写在 `title` 与 `title` 之外的正文里；
- 文件名要能概括主题，避免 `note1.md` 这种命名；
- 分类目录下可以再建一层子目录，形成"学科 → 分类 → 子分类 → 页面"的四级结构（见第五节）。

## 三、新增一篇笔记

1. 在对应分类目录下新建 `.md` 文件，复制上面的 frontmatter 模板；
2. 填写字段内容；
3. 打开 `.vitepress/config.mts`，在对应学科的 `sidebar` 分组里加一行
   `{ text: '标题', link: '/subjects/<学科>/<分类>/<文件名>' }`（**不带 `.md` 后缀**）；
4. 保存后开发服务器会自动刷新，首页"最近更新"与搜索索引同步更新。

## 四、新增学科或分类

### 新增分类

在 `config.mts` 的 `sidebar` 中，往对应学科数组里追加一个分组对象：

```ts
{
  text: '离散数学',
  collapsed: true,
  items: [{ text: '图论基础', link: '/subjects/math/discrete/graph-theory' }]
}
```

### 新增学科

1. 建立 `subjects/<新学科代码>/` 目录，并放入 `index.md`；
2. 在 `themeConfig.nav` 中追加一项：
   `{ text: '法学', link: '/subjects/law/', activeMatch: '/subjects/law/' }`；
3. 在 `themeConfig.sidebar` 中追加同名 key：`'/subjects/law/': [ ... ]`；
4. 在 `index.md` 的 `features` 中补一张学科入口卡片；
5. 新增笔记的 `subject` / `subjectLabel` 字段使用新代码与中文名。

## 五、多级章节导航

侧边栏支持"分组 → 子分组"两层嵌套，写法如下：

```ts
'/subjects/math/': [
  {
    text: '微积分',
    collapsed: false,
    items: [
      { text: '极限与连续', link: '/subjects/math/calculus/limits-and-continuity' },
      {
        text: '一元微分学',
        collapsed: true,
        items: [
          { text: '导数与微分', link: '/subjects/math/calculus/derivatives' },
          { text: '中值定理', link: '/subjects/math/calculus/mean-value-theorem' }
        ]
      }
    ]
  }
]
```

页面内的章节导航由右侧"本页目录"自动生成，抓取 `##` 与 `###` 两级标题，
无需手工维护。

## 六、LaTeX 公式

| 场景 | 写法 | 示例 |
| --- | --- | --- |
| 行内公式 | `$ ... $` 或 `\( ... \)` | `$E = mc^2$` |
| 独立公式 | `$$ ... $$` 或 `\[ ... \]` | 前后各空一行，见下 |
| 带编号 | `\tag{1}` 配合 `$$` | `$$a^2 + b^2 = c^2 \tag{1}$$` |

$$
\int_a^b f(x)\,dx = F(b) - F(a)
$$

书写注意：

- **数学中的中文**请放在 `\text{}` 里，例如 `$\text{资产} = \text{负债}$`；
- 公式写错不会中断构建，KaTeX 会把出错的片段标红；
- `$` 与 `$$` 之间**不要留空格**，否则不会被识别为公式；
- 正文中确实需要美元符号时，必须转义为 `\$`，例如"售价 100 \$"。

## 七、正文排版约定

1. 每个二级标题下的第一段先写"**这一节讲什么**"，再展开细节；
2. 重要结论用 `> **提示**：` 或 `> **一句话概括**：` 的引用块开头；
3. 对照、举例、速查三类内容优先用**表格**；
4. 会计分录、代码、配置片段用**代码块**保持对齐；
5. 全文末尾统一给出「**常见误区**」与「**速查清单**」，便于考前扫读；
6. 引用他人观点或教材结论时，在文末「参考」中列出出处。

可用的提示容器：

::: tip 提示
一般性的补充说明。
:::

::: info 说明
需要额外注意的背景信息。
:::

::: warning 注意
容易出错的地方。
:::

::: details 展开查看
默认折叠的长内容。
:::

## 八、文档自检清单

发布前快速检查一遍：

- [ ] `title`、`date`、`subject`、`category`、`tags`、`description` 六项齐全；
- [ ] `subject` 取值在四个学科代码之内；
- [ ] 链接不带 `.md` 后缀（站内链接统一省略扩展名）；
- [ ] 已在 `config.mts` 的侧边栏中登记；
- [ ] 公式渲染正常，无红色报错；
- [ ] 表格在移动端不会严重挤压（列数尽量不超过 4 列）。
