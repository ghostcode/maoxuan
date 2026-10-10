<script setup>
import { ref, computed } from 'vue'
import { works, eras } from './data/works.js'
import WorkCard from './components/WorkCard.vue'
import WorkDetail from './components/WorkDetail.vue'

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
      />
      <p v-if="filtered.length === 0" class="empty">未寻得相关篇章，请换个关键词试试。</p>
    </main>

    <footer class="foot">
      <span>共 {{ works.length }} 篇 · 资料整理仅供学习研究</span>
    </footer>

    <WorkDetail v-if="selected" :work="selected" @close="closeWork" />
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
</style>
