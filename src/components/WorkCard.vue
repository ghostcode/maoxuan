<script setup>
defineProps({ work: Object })
defineEmits(['open', 'share'])
</script>

<template>
  <article class="card" @click="$emit('open', work)" tabindex="0"
           @keydown.enter="$emit('open', work)">
    <div class="card-frame">
      <button class="share-btn" title="生成分享图" @click.stop="$emit('share', work)">⤴ 分享</button>

      <div class="card-top">
        <span class="year">{{ work.year }}</span>
        <span class="era">{{ work.era }}</span>
      </div>

      <h2 class="title">{{ work.title }}</h2>
      <p class="summary">{{ work.summary }}</p>

      <div class="excerpt">“{{ work.excerpt }}”</div>

      <div class="card-foot">
        <span class="read">展卷阅读 →</span>
        <span class="stamp">读</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  cursor: pointer;
  outline: none;
  transition: transform .25s ease, box-shadow .25s ease;
}
.card:hover,
.card:focus-visible {
  transform: translateY(-6px) rotate(-0.4deg);
}
.card-frame {
  position: relative;
  height: 100%;
  padding: 22px 22px 18px;
  background: var(--paper-light);
  border: 1px solid var(--line);
  /* 双线做旧边框 */
  box-shadow:
    0 0 0 4px var(--paper-light),
    0 0 0 5px var(--red),
    0 10px 22px var(--shadow);
  background-image:
    repeating-linear-gradient(0deg, rgba(0,0,0,.015) 0 2px, transparent 2px 4px);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px dashed var(--line);
  padding-bottom: 10px;
  margin-bottom: 12px;
}
.year {
  font-family: "Ma Shan Zheng", "Noto Serif SC", serif;
  font-size: 1.5rem;
  color: var(--red);
  letter-spacing: 1px;
}
.era {
  font-size: .8rem;
  color: var(--ink-soft);
  border: 1px solid var(--gold);
  padding: 1px 8px;
  border-radius: 2px;
  background: rgba(176, 137, 74, .08);
}
.title {
  margin: 0 0 10px;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.5;
  color: var(--ink);
}
.summary {
  margin: 0 0 14px;
  font-size: .98rem;
  color: var(--ink-soft);
}
.excerpt {
  margin: 0;
  padding: 12px 14px;
  font-size: .95rem;
  font-style: italic;
  color: var(--red-deep);
  background: rgba(155, 45, 32, .06);
  border-left: 3px solid var(--red);
  line-height: 1.75;
}
.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}
.read {
  font-size: .9rem;
  color: var(--red);
  letter-spacing: 1px;
}
.stamp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  font-family: "Ma Shan Zheng", serif;
  font-size: 1.1rem;
  color: #fff;
  background: var(--red);
  border-radius: 4px;
  transform: rotate(8deg);
  box-shadow: 0 2px 6px rgba(116,27,20,.4);
  opacity: .92;
}
.share-btn {
  position: absolute;
  top: -14px;
  right: -14px;
  z-index: 3;
  font-family: inherit;
  font-size: .8rem;
  letter-spacing: 1px;
  color: #fff;
  background: var(--red);
  border: 2px solid var(--paper-light);
  border-radius: 20px;
  padding: 5px 12px;
  cursor: pointer;
  opacity: 0;
  transform: scale(.85);
  transition: opacity .2s ease, transform .2s ease, background .2s ease;
  box-shadow: 0 3px 8px rgba(116, 27, 20, .4);
}
.card:hover .share-btn,
.card:focus-within .share-btn {
  opacity: 1;
  transform: scale(1);
}
.share-btn:hover { background: var(--red-deep); }
</style>
