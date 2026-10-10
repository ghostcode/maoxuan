<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { toPng } from 'html-to-image'
import { works, eras } from './data/works.js'
import WorkCard from './components/WorkCard.vue'
import WorkDetail from './components/WorkDetail.vue'
import ShareCard from './components/ShareCard.vue'

const query = ref('')
const activeEra = ref('all')
const selected = ref(null)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return works.filter((w) => {
    const matchEra = activeEra.value === 'all' || w.era === activeEra.value
    const matchQuery =
      !q ||
      w.title.toLowerCase().includes(q) ||
      w.summary.toLowerCase().includes(q) ||
      w.excerpt.toLowerCase().includes(q)
    return matchEra && matchQuery
  })
})

function openWork(w) { selected.value = w }
function closeWork() { selected.value = null }

/* ===== 图片分享 ===== */
const shareSource = ref(null)
const shareCardRef = ref(null)
const share = reactive({ open: false, preview: '', busy: false })

async function generateShare(work) {
  if (share.busy) return
  share.busy = true
  shareSource.value = work
  await nextTick()
  // 等待离屏卡片完成布局与字体回退
  await new Promise((r) => setTimeout(r, 100))
  try {
    const node = shareCardRef.value?.$el
    if (!node) return
    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      skipFonts: true,
      cacheBust: true,
      backgroundColor: '#f1e8d2',
    })
    share.preview = dataUrl
    share.open = true
  } catch (e) {
    console.error('生成分享图失败', e)
    alert('生成分享图失败，请重试')
  } finally {
    share.busy = false
  }
}

function downloadShare() {
  if (!share.preview || !shareSource.value) return
  const a = document.createElement('a')
  a.download = `${shareSource.value.title}-毛选分享.png`
  a.href = share.preview
  document.body.appendChild(a)
  a.click()
  a.remove()
}

async function copyShare() {
  if (!share.preview) return
  try {
    const blob = await (await fetch(share.preview)).blob()
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    alert('已复制到剪贴板，可粘贴到微信 / 微博等聊天窗口')
  } catch (e) {
    console.error(e)
    alert('当前环境不支持直接复制，请改用「下载图片」')
  }
}
</script>

<template>
  <div class="page">
    <header class="masthead">
      <div class="seal">毛<br />选</div>
      <h1>毛泽东选集</h1>
      <p class="subtitle">经 典 篇 章 · 卡 片 收 藏</p>
      <div class="rule"><span></span>❖<span></span></div>
      <p class="lead">鉴往知来，温故知新 —— 于字里行间，读一个时代的风骨。</p>
    </header>

    <section class="controls">
      <div class="search-wrap">
        <span class="search-icon">⌕</span>
        <input
          v-model="query"
          class="search"
          type="text"
          placeholder="检索篇名、提要或名句…"
        />
      </div>
      <div class="filters">
        <button
          v-for="e in eras"
          :key="e.key"
          :class="['chip', { active: activeEra === e.key }]"
          @click="activeEra = e.key"
        >
          {{ e.label }}
        </button>
      </div>
    </section>

    <main class="grid">
      <WorkCard
        v-for="w in filtered"
        :key="w.id"
        :work="w"
        @open="openWork"
        @share="generateShare"
      />
      <p v-if="filtered.length === 0" class="empty">未寻得相关篇章，请换个关键词试试。</p>
    </main>

    <footer class="foot">
      <span>共 {{ works.length }} 篇 · 资料整理仅供学习研究</span>
    </footer>

    <WorkDetail v-if="selected" :work="selected" @close="closeWork" @share="generateShare" />

    <!-- 离屏渲染分享图模板 -->
    <div class="offscreen">
      <ShareCard v-if="shareSource" ref="shareCardRef" :work="shareSource" />
    </div>

    <!-- 分享弹层：预览 / 下载 / 复制 -->
    <div v-if="share.open" class="share-overlay" @click.self="share.open = false">
      <div class="share-sheet">
        <div class="share-head">
          <span>分享图预览</span>
          <button class="share-x" @click="share.open = false" aria-label="关闭">×</button>
        </div>
        <div class="share-img-wrap">
          <img :src="share.preview" class="share-img" alt="分享图" />
        </div>
        <div class="share-actions">
          <button class="btn primary" @click="downloadShare">下载图片</button>
          <button class="btn" @click="copyShare">复制图片</button>
        </div>
        <p class="share-tip">复制后可一键粘贴到微信 / 微博等社交平台</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 24px 60px;
}

/* ===== 报头 ===== */
.masthead {
  text-align: center;
  position: relative;
  padding: 30px 0 10px;
}
.seal {
  width: 64px;
  height: 64px;
  margin: 0 auto 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Ma Shan Zheng", serif;
  font-size: 1.25rem;
  line-height: 1.05;
  color: #fff;
  background: var(--red);
  border-radius: 6px;
  transform: rotate(-4deg);
  box-shadow: 0 4px 12px rgba(116, 27, 20, .45);
  letter-spacing: 1px;
}
.masthead h1 {
  margin: 0;
  font-size: clamp(2.4rem, 6vw, 3.6rem);
  font-weight: 900;
  letter-spacing: 8px;
  color: var(--ink);
  text-shadow: 2px 2px 0 rgba(155, 45, 32, .12);
}
.subtitle {
  margin: 10px 0 0;
  font-size: 1rem;
  letter-spacing: 4px;
  color: var(--red);
  font-weight: 600;
}
.rule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 18px auto 12px;
  color: var(--gold);
  max-width: 280px;
}
.rule span {
  flex: 1;
  height: 1px;
  background: var(--gold);
}
.lead {
  margin: 6px auto 0;
  max-width: 560px;
  font-style: italic;
  color: var(--ink-soft);
  font-size: .98rem;
}

/* ===== 检索与筛选 ===== */
.controls {
  position: sticky;
  top: 0;
  z-index: 20;
  margin: 30px 0 28px;
  padding: 16px;
  background: rgba(233, 223, 198, .92);
  backdrop-filter: blur(4px);
  border: 1px solid var(--line);
  border-radius: 6px;
  box-shadow: 0 6px 18px var(--shadow);
}
.search-wrap {
  position: relative;
  margin-bottom: 14px;
}
.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--red);
}
.search {
  width: 100%;
  padding: 12px 14px 12px 40px;
  font-family: inherit;
  font-size: 1rem;
  color: var(--ink);
  background: var(--paper-light);
  border: 1px solid var(--line);
  border-radius: 4px;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.search:focus {
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(155, 45, 32, .15);
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.chip {
  font-family: inherit;
  font-size: .92rem;
  padding: 6px 16px;
  color: var(--ink-soft);
  background: var(--paper-light);
  border: 1px solid var(--line);
  border-radius: 20px;
  cursor: pointer;
  transition: all .2s ease;
}
.chip:hover { border-color: var(--red); color: var(--red); }
.chip.active {
  color: #fff;
  background: var(--red);
  border-color: var(--red);
  box-shadow: 0 3px 8px rgba(116, 27, 20, .35);
}

/* ===== 卡片网格 ===== */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 26px;
}
.empty {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--ink-soft);
  padding: 40px 0;
}

/* ===== 页脚 ===== */
.foot {
  margin-top: 46px;
  text-align: center;
  font-size: .85rem;
  color: var(--ink-soft);
  letter-spacing: 1px;
  border-top: 1px solid var(--line);
  padding-top: 20px;
}

/* ===== 离屏分享卡片（仅供导出，不在视口内） ===== */
.offscreen {
  position: fixed;
  left: -10000px;
  top: 0;
  pointer-events: none;
}

/* ===== 分享弹层 ===== */
.share-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(43, 35, 27, .62);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fade .2s ease;
}
.share-sheet {
  width: min(440px, 100%);
  background: var(--paper-light);
  border: 1px solid var(--line);
  box-shadow: 0 0 0 5px var(--paper-light), 0 0 0 6px var(--red), 0 24px 60px rgba(0,0,0,.45);
  animation: rise .28s ease;
  overflow: hidden;
}
.share-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--ink);
  border-bottom: 1px solid var(--line);
}
.share-x {
  width: 32px;
  height: 32px;
  font-size: 1.4rem;
  line-height: 1;
  color: var(--ink-soft);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 50%;
  cursor: pointer;
  transition: all .2s ease;
}
.share-x:hover { color: #fff; background: var(--red); border-color: var(--red); }
.share-img-wrap {
  padding: 16px;
  background: var(--paper);
  max-height: 60vh;
  overflow: auto;
}
.share-img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--line);
}
.share-actions {
  display: flex;
  gap: 12px;
  padding: 16px 18px;
}
.btn {
  flex: 1;
  padding: 11px 0;
  font-family: inherit;
  font-size: .98rem;
  letter-spacing: 1px;
  color: var(--ink-soft);
  background: var(--paper-light);
  border: 1px solid var(--line);
  border-radius: 4px;
  cursor: pointer;
  transition: all .2s ease;
}
.btn:hover { border-color: var(--red); color: var(--red); }
.btn.primary {
  color: #fff;
  background: var(--red);
  border-color: var(--red);
  box-shadow: 0 3px 8px rgba(116, 27, 20, .35);
}
.btn.primary:hover { background: var(--red-deep); border-color: var(--red-deep); color: #fff; }
.share-tip {
  margin: 0;
  padding: 0 18px 16px;
  font-size: .82rem;
  color: var(--ink-soft);
  text-align: center;
}
</style>
