<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'

interface Palette {
  id: string
  label: string
  /** 色板圆点展示色（取浅色模式的主色） */
  swatch: string
  /** 深色模式下的展示色，保证圆点在暗色面板上依然可辨 */
  swatchDark: string
  /** 黑灰系色板，圆点需要一圈细边才够醒目 */
  mono?: boolean
}

const STORAGE_KEY = 'kb-palette'

const palettes: Palette[] = [
  { id: 'emerald', label: '翡翠绿', swatch: '#12a06c', swatchDark: '#48d6a5' },
  { id: 'violet', label: '罗兰紫', swatch: '#8b5cf6', swatchDark: '#b4a0fb' },
  { id: 'ocean', label: '深海蓝', swatch: '#1a7ab5', swatchDark: '#6cb8e8' },
  { id: 'obsidian', label: '曜石黑', swatch: '#46525f', swatchDark: '#aab4be', mono: true }
]

const current = ref('emerald')
const open = ref(false)
const root = ref<HTMLElement | null>(null)

onMounted(() => {
  // 防闪烁脚本（config.mts head）已在页面加载前写好 data-palette，这里读取对齐状态
  const attr = document.documentElement.getAttribute('data-palette')
  current.value = attr && palettes.some((p) => p.id === attr) ? attr : 'emerald'
})

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-palette', current.value)
  }
})

function choose(id: string) {
  current.value = id
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* 隐私模式下 localStorage 不可用时忽略，仅本次会话生效 */
  }
}

function toggle() {
  open.value = !open.value
}

function onDocClick(e: MouseEvent) {
  if (open.value && root.value && !root.value.contains(e.target as Node)) {
    open.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="theme-settings">
    <button
      type="button"
      class="settings-btn"
      :class="{ open }"
      aria-label="主题设置"
      :aria-expanded="open"
      aria-haspopup="true"
      title="主题设置"
      @click="toggle"
    >
      <!-- 齿轮图标（lucide settings） -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
        />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>

    <Transition name="palette-pop">
      <div v-if="open" class="palette-panel" role="radiogroup" aria-label="站点主题色">
        <div class="panel-title">主题色</div>

        <button
          v-for="p in palettes"
          :key="p.id"
          type="button"
          role="radio"
          class="palette-option"
          :class="{ active: current === p.id, mono: p.mono }"
          :aria-checked="current === p.id"
          @click="choose(p.id)"
        >
          <span
            class="dot"
            :style="{ '--dot-light': p.swatch, '--dot-dark': p.swatchDark }"
          />
          <span class="label">{{ p.label }}</span>
          <svg
            v-if="current === p.id"
            class="check"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.theme-settings {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 8px;
  margin-left: 2px;
  border-left: 1px solid var(--vp-c-divider);
}

/* ---------- 设置按钮 ---------- */
.settings-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.25s, background-color 0.25s;
}

.settings-btn:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

.settings-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.settings-btn svg {
  transition: transform 0.3s ease;
}

.settings-btn.open {
  color: var(--vp-c-brand-1);
}

.settings-btn.open svg {
  transform: rotate(60deg);
}

/* ---------- 下拉面板 ---------- */
.palette-panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: var(--vp-z-index-nav, 24);
  min-width: 168px;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

.panel-title {
  padding: 4px 10px 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.palette-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 7px 10px;
  border: none;
  border-radius: 7px;
  background-color: transparent;
  color: var(--vp-c-text-1);
  font-size: 13.5px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
}

.palette-option:hover {
  background-color: var(--vp-c-bg-soft);
}

.palette-option:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.palette-option.active {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  background-color: var(--vp-c-brand-soft);
}

.dot {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--dot-light);
}

.dark .dot {
  background-color: var(--dot-dark);
}

.palette-option.mono .dot {
  box-shadow: inset 0 0 0 1px rgba(128, 140, 152, 0.45);
}

.label {
  flex: 1;
}

.check {
  flex-shrink: 0;
}

/* ---------- 弹出动画 ---------- */
.palette-pop-enter-active,
.palette-pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.palette-pop-enter-from,
.palette-pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

/* ---------- 移动端抽屉（nav-screen 插槽） ---------- */
@media (max-width: 959px) {
  .theme-settings {
    padding: 0;
    margin: 0;
    border-left: none;
  }

  .settings-btn {
    width: 40px;
    height: 40px;
  }

  .palette-panel {
    position: static;
    width: 100%;
    min-width: 0;
    margin-top: 10px;
    box-shadow: none;
  }

  .palette-option {
    padding: 10px 12px;
    font-size: 14.5px;
  }

  .dot {
    width: 18px;
    height: 18px;
  }
}
</style>
