<script setup>
defineProps({ work: Object })
defineEmits(['close', 'share'])
</script>

<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="sheet" role="dialog" aria-modal="true">
      <button class="close" @click="$emit('close')" aria-label="关闭">×</button>

      <div class="sheet-head">
        <span class="year">{{ work.year }}</span>
        <span class="era">{{ work.era }}</span>
      </div>

      <h2 class="title">{{ work.title }}</h2>

      <blockquote class="excerpt">“{{ work.excerpt }}”</blockquote>

      <p class="summary">{{ work.summary }}</p>

      <div class="divider"><span>背 景 与 要 点</span></div>

      <p class="body">{{ work.background }}</p>

      <div class="sheet-actions">
        <button class="share-btn" @click="$emit('share', work)">⤴ 生成分享图</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(43, 35, 27, .55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 50;
  animation: fade .25s ease;
}
@keyframes fade { from { opacity: 0 } to { opacity: 1 } }

.sheet {
  position: relative;
  width: min(640px, 100%);
  max-height: 86vh;
  overflow-y: auto;
  padding: 34px 38px 40px;
  background: var(--paper-light);
  border: 1px solid var(--line);
  box-shadow:
    0 0 0 5px var(--paper-light),
    0 0 0 6px var(--red),
    0 24px 60px rgba(0,0,0,.4);
  background-image:
    repeating-linear-gradient(0deg, rgba(0,0,0,.015) 0 2px, transparent 2px 4px);
  animation: rise .3s ease;
}
@keyframes rise { from { transform: translateY(18px); opacity: 0 } to { transform: none; opacity: 1 } }

.close {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 36px;
  height: 36px;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--ink-soft);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 50%;
  cursor: pointer;
  transition: all .2s ease;
}
.close:hover { color: #fff; background: var(--red); border-color: var(--red); }

.sheet-head {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}
.year {
  font-family: "Ma Shan Zheng", serif;
  font-size: 1.4rem;
  color: var(--red);
}
.era {
  font-size: .8rem;
  color: var(--ink-soft);
  border: 1px solid var(--gold);
  padding: 1px 8px;
  border-radius: 2px;
}
.title {
  margin: 0 0 16px;
  font-size: 1.9rem;
  font-weight: 900;
  color: var(--ink);
  letter-spacing: 1px;
}
.excerpt {
  margin: 0 0 16px;
  padding: 14px 18px;
  font-size: 1.05rem;
  font-style: italic;
  color: var(--red-deep);
  background: rgba(155, 45, 32, .07);
  border-left: 4px solid var(--red);
  line-height: 1.85;
}
.summary {
  margin: 0 0 18px;
  font-size: 1.02rem;
  color: var(--ink-soft);
}
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--gold);
  font-size: .85rem;
  letter-spacing: 2px;
  margin: 8px 0 18px;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--line);
}
.divider span { padding: 0 14px; }
.body {
  margin: 0;
  font-size: 1.02rem;
  line-height: 2;
  color: var(--ink);
  text-align: justify;
}
.sheet-actions {
  margin-top: 22px;
  display: flex;
  justify-content: flex-end;
}
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  font-family: inherit;
  font-size: .95rem;
  letter-spacing: 1px;
  color: #fff;
  background: var(--red);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(116, 27, 20, .35);
  transition: background .2s ease;
}
.share-btn:hover { background: var(--red-deep); }
</style>
