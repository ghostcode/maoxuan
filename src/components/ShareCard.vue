<script setup>
import { computed } from 'vue'

const props = defineProps({ work: Object })

// 提要过长时截断，保证分享图排版稳定
const summary = computed(() => {
  if (!props.work) return ''
  const s = props.work.summary || ''
  return s.length > 130 ? s.slice(0, 130) + '…' : s
})
</script>

<template>
  <div class="share-card" v-if="work">
    <div class="sc-frame">
      <div class="sc-header">
        <div class="sc-seal">毛<br />选</div>
        <div class="sc-brand">毛泽东选集 · 经典篇章</div>
      </div>

      <div class="sc-meta">
        <span class="sc-year">{{ work.year }}</span>
        <span class="sc-era">{{ work.era }}</span>
      </div>

      <h2 class="sc-title">{{ work.title }}</h2>

      <div class="sc-divider"><span>❖</span></div>

      <blockquote class="sc-excerpt">“{{ work.excerpt }}”</blockquote>

      <p class="sc-summary">{{ summary }}</p>

      <div class="sc-footer">
        <span class="sc-stamp">读</span>
        <span class="sc-watermark">卡片收藏 · 仅供学习研究</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.share-card {
  width: 1080px;
  height: 1350px;
  padding: 44px;
  box-sizing: border-box;
  background: #f1e8d2;
  background-image: repeating-linear-gradient(0deg, rgba(0, 0, 0, .014) 0 2px, transparent 2px 4px);
  font-family: "Songti SC", "STSong", "SimSun", "Noto Serif SC", serif;
  color: #2b231b;
}

.sc-frame {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding: 56px 60px 46px;
  border: 2px solid #9b2d20;
  box-shadow: 0 0 0 6px #f1e8d2, 0 0 0 8px #9b2d20;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, .10);
}

/* 四角小装饰 */
.sc-frame::before,
.sc-frame::after {
  content: '';
  position: absolute;
  width: 26px;
  height: 26px;
  border: 2px solid #b0894a;
}
.sc-frame::before { top: 14px; left: 14px; border-right: none; border-bottom: none; }
.sc-frame::after { bottom: 14px; right: 14px; border-left: none; border-top: none; }

.sc-header {
  display: flex;
  align-items: center;
  gap: 22px;
}
.sc-seal {
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 2px;
  color: #fff;
  background: #9b2d20;
  border-radius: 8px;
  transform: rotate(-4deg);
}
.sc-brand {
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 4px;
  color: #741b14;
}

.sc-meta {
  margin-top: 34px;
  display: flex;
  align-items: baseline;
  gap: 18px;
}
.sc-year {
  font-size: 56px;
  font-weight: 900;
  color: #9b2d20;
  letter-spacing: 2px;
}
.sc-era {
  font-size: 26px;
  color: #5a4d3b;
  border: 1px solid #b0894a;
  padding: 3px 14px;
  border-radius: 4px;
  background: rgba(176, 137, 74, .08);
}

.sc-title {
  margin: 18px 0 0;
  font-size: 62px;
  font-weight: 900;
  line-height: 1.32;
  letter-spacing: 2px;
  color: #2b231b;
}

.sc-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 30px 0;
  color: #b0894a;
  font-size: 22px;
}
.sc-divider::before,
.sc-divider::after {
  content: '';
  flex: 1;
  height: 2px;
  background: #c9b78f;
}

.sc-excerpt {
  margin: 0;
  padding: 24px 28px;
  font-size: 40px;
  font-style: italic;
  line-height: 1.95;
  color: #741b14;
  background: rgba(155, 45, 32, .07);
  border-left: 8px solid #9b2d20;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sc-summary {
  margin: 28px 0 0;
  font-size: 30px;
  line-height: 1.95;
  color: #5a4d3b;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sc-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid #c9b78f;
}
.sc-stamp {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  background: #9b2d20;
  border-radius: 6px;
  transform: rotate(8deg);
}
.sc-watermark {
  font-size: 24px;
  letter-spacing: 2px;
  color: #5a4d3b;
}
</style>
