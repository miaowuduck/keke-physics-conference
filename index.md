---
layout: default
title: 首页
permalink: /
---

# 欢迎参加 "咯咯物理奇妙夜" 学术交流会！

<!-- 新增：Hero 视差展示与滚动提示 -->
<section class="hero" aria-hidden="false">
  <div class="hero-layer layer-back" data-speed="0.2"></div>
  <div class="hero-layer layer-mid" data-speed="0.5"></div>
  <div class="hero-layer layer-front" data-speed="0.9">
    <div class="hero-content">
      <h1>咯咯物理奇妙夜 · 第二届</h1>
      <p>专业而不失风趣的夜间实验：用好奇牵引未知。</p>
      <div class="scroll-hint" aria-hidden="true">向下滚动 <span class="arrow">↓</span></div>
    </div>
  </div>
</section>

<div class="info-card animated-card">
<h3><img src="{{ '/assets/images/search.svg' | relative_url }}" alt="信息" class="emoji-svg" /> 关于会议</h3>
“咯咯物理奇妙夜”是致远物理咯咯组织主办的年度学术盛会。致远物理咯咯由二十余位致远学院2023届毕业生及其伙伴共同发起，逐年汇聚起更多对物理怀抱纯粹热爱的同行者。我们彼此以“咯咯”相称——这既是身份的标记，也是对学术初心的温柔致敬：在好奇心的引力场里，持续探索、持续发声。

一年一度的“奇妙夜”，是咯咯们跨越经纬重新会合的时刻。有人带来前沿成果，有人分享灵光一现的想法，也有人只想把这段时间的惶惑与热爱坦诚摆到光下。2024年，我们完成了第一次点亮；今年，是第二次共振。我们期待在更开放的语境里，让问题更尖锐、视角更奇特、交流更自在——让每一次提问都能点燃新的路径，每一次倾听都能生成更深的联结。

欢迎加入这场专业而不失风趣的夜间实验：用严谨推演捍卫真理，用幽默化解复杂，用好奇牵引未知。
</div>

<div class="info-card animated-card">
<h3><img src="{{ '/assets/images/news.svg' | relative_url }}" alt="新闻" class="emoji-svg" /> 新闻</h3>
<!-- 用 HTML 表格以保证在 HTML 块内正确渲染 -->
<div class="table-responsive">
<table class="agenda-table">
  <thead>
    <tr>
      <th class="date">日期</th>
      <th class="item">事项</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2025年11月5日</td>
      <td>欢迎通过 <a href="https://v.wjx.cn/vm/muy9ycH.aspx" target="_blank" rel="noopener noreferrer">问卷</a> 提交偏好与反馈（非报名，仅用于统计与安排）。</td>
    </tr>
    <tr>
      <td>2024年11月4日</td>
      <td><a href="https://miaowuduck.github.io/keke-physics-conference/" target="_blank" rel="noopener noreferrer">会议网站</a> 正式上线！欢迎浏览并分享给有兴趣的同学们！</td>
    </tr>
    <tr>
      <td>2024年10月29日</td>
      <td>第二届 "咯咯物理奇妙夜" 学术交流会启动讨论！</td>
    </tr>
    <!-- 如需添加更多行，可在此处新增 <tr>...</tr> -->
  </tbody>
</table>
</div>
</div>

<!-- 内联样式（新增） -->
<style>
/* hero 基本布局与分层 */
.hero{position:relative;height:60vh;min-height:360px;overflow:hidden;border-radius:12px;margin:1.2rem 0}
.hero-layer{position:absolute;inset:0;background-size:cover;background-position:center;will-change:transform;transform:translateZ(0)}
.layer-back{background:linear-gradient(135deg,#071029 0%,#15223b 60%);opacity:0.9;filter:blur(8px) saturate(1.1)}
.layer-mid{background:
  radial-gradient(600px 200px at 10% 20%, rgba(255,255,255,0.03), transparent 15%),
  radial-gradient(500px 150px at 90% 80%, rgba(255,255,255,0.02), transparent 12%);
mix-blend-mode:overlay;opacity:0.9}
.layer-front{display:flex;align-items:center;justify-content:center;padding:2rem;color:#fff}
.hero-content{max-width:900px;text-align:center;backdrop-filter:blur(2px)}
.hero-content h1{font-size:2.2rem;margin:0 0 .4rem;letter-spacing:0.6px}
.hero-content p{margin:0 0 .8rem;opacity:0.95}

/* 滚动提示 */
.scroll-hint{margin-top:1rem;font-size:.95rem;color:rgba(255,255,255,0.85);opacity:.95}
.scroll-hint .arrow{display:inline-block;margin-left:.6rem;font-weight:700;animation: bounce 1.6s infinite}
@keyframes bounce{0%{transform:translateY(0)}50%{transform:translateY(6px)}100%{transform:translateY(0)}}

/* 信息卡与表格动画 */
.animated-card{transition:transform .6s cubic-bezier(.2,.9,.2,1),box-shadow .4s,opacity .6s;opacity:0;transform:translateY(18px);box-shadow:0 8px 30px rgba(10,18,30,0.08);border-radius:10px;padding:1rem;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))}
.animated-card.in-view{opacity:1;transform:none;box-shadow:0 18px 40px rgba(10,18,30,0.12)}

/* 表格样式微调 */
.agenda-table{width:100%;border-collapse:collapse;font-size:0.95rem}
.agenda-table th, .agenda-table td{padding:.6rem .7rem;text-align:left;border-bottom:1px dashed rgba(255,255,255,0.03)}
.agenda-table .date{width:130px;color:rgba(255,255,255,0.7);font-weight:600}

/* 响应式调整 */
@media (max-width:720px){ .hero{height:46vh} .hero-content h1{font-size:1.6rem} .agenda-table .date{width:110px}}
</style>

<!-- 内联脚本（新增） -->
<script>
(function(){
  // 简单的 parallax：根据 data-speed 平移层
  const hero = document.querySelector('.hero');
  const layers = hero ? Array.from(hero.querySelectorAll('.hero-layer')) : [];

  let lastScroll = window.scrollY;
  let rafId = null;

  function onScroll(){
    lastScroll = window.scrollY;
    if(!rafId) rafId = requestAnimationFrame(updateParallax);
  }

  function updateParallax(){
    const rect = hero.getBoundingClientRect();
    const base = Math.max(0, window.innerHeight - Math.max(rect.top,0));
    layers.forEach(layer=>{
      const speed = parseFloat(layer.getAttribute('data-speed')||'0.5');
      const move = (base * speed) * 0.08; // 缩放系数，避免过度位移
      layer.style.transform = `translateY(${move}px)`;
    });
    rafId = null;
  }

  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', updateParallax);

  // 鼠标滚轮小幅反馈（不替代正常滚动）
  let wheelDelta = 0;
  window.addEventListener('wheel', e=>{
    wheelDelta = (e.deltaY||0)*0.02;
    if(!rafId) rafId = requestAnimationFrame(()=>{
      layers.forEach(l=>{
        const curr = parseFloat((l.dataset._tmp||0));
        const next = curr + wheelDelta;
        l.style.transform = `translateY(${next}px)`;
        l.dataset._tmp = next;
      });
      rafId = null;
    });
  }, {passive:true});

  // 元素进入视口时触发动画
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.animated-card').forEach(el=>io.observe(el));

  // 首次触发 parallax 更新
  updateParallax();
})();
</script>


