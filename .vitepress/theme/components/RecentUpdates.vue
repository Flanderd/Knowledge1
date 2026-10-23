<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../posts.data'

// 首页展示的条数
const limit = 6

const list = computed(() => posts.slice(0, limit))
</script>

<template>
  <div class="recent-updates">
    <h2 class="recent-title">最近更新</h2>

    <ul class="recent-list">
      <li v-for="post in list" :key="post.url" class="recent-item">
        <a class="recent-link" :href="post.url">{{ post.title }}</a>

        <div class="recent-meta">
          <span class="recent-subject">{{ post.subjectLabel }}</span>
          <span class="recent-dot">·</span>
          <span>{{ post.category }}</span>
          <span class="recent-dot">·</span>
          <time>{{ post.date }}</time>
        </div>

        <p v-if="post.description" class="recent-desc">{{ post.description }}</p>
      </li>
    </ul>

    <p v-if="!list.length" class="recent-empty">
      还没有笔记，先在 <code>subjects/</code> 下新建一篇 Markdown 吧。
    </p>
  </div>
</template>

<style scoped>
.recent-updates {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

.recent-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.recent-list {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.recent-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, transform 0.25s;
}

.recent-item:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.recent-link {
  display: block;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.recent-link:hover {
  color: var(--vp-c-brand-1);
}

.recent-meta {
  margin-top: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.recent-subject {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-radius: 4px;
  padding: 1px 6px;
}

.recent-dot {
  color: var(--vp-c-text-3);
}

.recent-desc {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recent-empty {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

code {
  font-size: 12px;
  background-color: var(--vp-c-default-soft);
  border-radius: 4px;
  padding: 2px 5px;
}
</style>
