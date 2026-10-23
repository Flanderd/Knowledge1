import { createContentLoader } from 'vitepress'
import type { ContentData } from 'vitepress'

/**
 * 最近更新数据源
 * ------------------------------------------------------------------
 * createContentLoader 会在构建时扫描 srcDir 下匹配的 Markdown，
 * 产出一份 JSON，供组件运行时读取（不参与客户端打包）。
 * 只扫描 subjects/，因此首页与「写作规范」页不会出现在列表里。
 */
export interface Post {
  title: string
  url: string
  date: string
  subject: string
  subjectLabel: string
  category: string
  tags: string[]
  description: string
}

declare const data: Post[]
export { data }

/**
 * 关键：YAML 里的 `date: 2026-10-23` 会被 gray-matter 解析成 Date 对象，
 * 直接 String() 会得到 "Wed Oct 23 2026 ..."，按它排序必然错乱。
 * 这里统一归一化为 YYYY-MM-DD 字符串（取 UTC 日期，与书写值一致）。
 */
function toDateString(value: unknown): string {
  if (!value) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

export default createContentLoader('subjects/**/*.md', {
  includeSrc: false,
  render: false,
  transform(pages: ContentData[]): Post[] {
    return pages
      // 学科首页（URL 以 / 结尾）不进入列表
      .filter((page) => !page.url.endsWith('/') && !!page.frontmatter.title)
      .map(({ url, frontmatter }) => ({
        title: String(frontmatter.title ?? ''),
        url,
        date: toDateString(frontmatter.date),
        subject: String(frontmatter.subject ?? ''),
        subjectLabel: String(frontmatter.subjectLabel ?? ''),
        category: String(frontmatter.category ?? ''),
        tags: (frontmatter.tags as string[]) ?? [],
        description: String(frontmatter.description ?? '')
      }))
      .sort((a, b) => (a.date === b.date ? 0 : a.date > b.date ? -1 : 1))
  }
})
