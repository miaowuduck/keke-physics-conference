// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    // 初始化头部弹幕（若页面包含 danmaku-container）
    try { initDanmaku(); } catch (e) { /* 容错 */ }
});

// 初始化导航功能
function initializeNavigation() {
    // 获取当前页面的URL
    const currentUrl = window.location.pathname;
    
    // 更新导航链接的活跃状态
    updateActiveNavLink(currentUrl);
}

// 更新活跃导航链接
function updateActiveNavLink(currentUrl) {
    const navLinks = document.querySelectorAll('.nav-link');

    // 先移除所有已有的 active 类，避免模板渲染与 JS 冲突导致多个高亮
    // 如果没有导航链接就直接返回
    if (!navLinks || navLinks.length === 0) return;

    // 规范化和解码路径（去掉首尾斜杠）
    const strip = s => (s || '').replace(/^\/+|\/+$/g, '');
    const decode = s => {
        try { return decodeURIComponent(s); } catch (e) { return s; }
    };

    const normalizedCurrentUrl = strip(decode(currentUrl || ''));

    // 先移除所有已有的 active 类，确保 JS 控制时不会与模板残留冲突
    navLinks.forEach(link => link.classList.remove('active'));

    // 找到所有与当前路径匹配的候选项，评分规则：匹配路径长度越长优先级越高（避免父路径与子路径同时匹配）
    const candidates = [];

    navLinks.forEach(link => {
        let href = link.getAttribute('href') || '';

        try {
            const url = new URL(href, window.location.origin);
            href = url.pathname;
        } catch (e) {
            // 使用原始 href
        }

        const normalizedHref = strip(decode(href));

        // 根路径特殊处理（href 为根时 normalizedHref === ''）
        if (normalizedHref === '') {
            if (normalizedCurrentUrl === '') {
                candidates.push({ link, score: 0 });
            }
            return;
        }

        // 精确匹配
        if (normalizedCurrentUrl === normalizedHref) {
            candidates.push({ link, score: normalizedHref.length });
            return;
        }

        // 作为父路径（例如 /agenda/ 应匹配 /agenda/xxx）
        if (normalizedCurrentUrl.startsWith(normalizedHref + '/')) {
            candidates.push({ link, score: normalizedHref.length });
            return;
        }
    });

    // 选择评分最高的候选项（最长匹配）；若无候选且当前为根路径，则选择根链接
    if (candidates.length > 0) {
        candidates.sort((a, b) => b.score - a.score);
        candidates[0].link.classList.add('active');
    } else if (normalizedCurrentUrl === '') {
        // 找到根链接并高亮
        const root = Array.from(navLinks).find(l => {
            try { return strip(decode(new URL(l.getAttribute('href') || '', window.location.origin).pathname)) === ''; }
            catch (e) { return (strip(decode(l.getAttribute('href') || '')) === ''); }
        });
        if (root) root.classList.add('active');
    }
}

// 平滑滚动到页面顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加返回顶部按钮功能（可选）
window.addEventListener('scroll', function() {
    // 这里可以添加返回顶部按钮的显示/隐藏逻辑
});

/* ===== 低调斜向上弹幕（danmaku） =====
   - 从容器的 data-src 加载 JSON，默认结构为 { "banners": [{"zh":"...","en":"..."}, ...] }
   - 文本语言根据 document.documentElement.lang 优先选择中文（以 "zh" 开头）
   - 随机大小 / 速度 / 颜色，但保持低透明度与不抢眼
*/
function initDanmaku() {
    const container = document.querySelector('.danmaku-container');
    if (!container) return;

    const src = container.dataset.src || '/assets/data/banner.json';
    fetch(src).then(r => {
        if (!r.ok) throw new Error('failed to fetch banners');
        return r.json();
    }).then(data => {
        const items = Array.isArray(data.banners) ? data.banners : [];
        if (items.length === 0) return;

        const lang = (document.documentElement.lang || navigator.language || 'zh').toLowerCase();
        const useZh = lang.startsWith('zh');

        const maxActive = 28; // 限制同时显示的数量，防止性能问题
        const minInterval = 700; // ms
        const maxInterval = 1600;

        function randomBetween(a, b) { return a + Math.random() * (b - a); }
        function pickText(obj) { return (useZh && obj.zh) ? obj.zh : (obj.en || obj.zh || ''); }

        let spawnTimer = null;

        function spawnOne() {
            // 限制元素数量
            if (container.children.length >= maxActive) return scheduleNext();

            const banner = items[Math.floor(Math.random() * items.length)];
            const text = pickText(banner);
            if (!text) return scheduleNext();

            const el = document.createElement('span');
            el.className = 'danmaku-item';

            // 随机样式（低调）
            const fontSize = Math.round(randomBetween(12, 20)); // px
            el.style.fontSize = fontSize + 'px';
            el.style.left = (randomBetween(10, 85)) + '%'; // 起始横向位置
            el.style.bottom = (randomBetween(4, 18)) + '%'; // 起始垂直偏移

            // 随机颜色：使用 HSL 短色相范围并降低饱和/亮度使其不刺眼
            const hue = Math.round(randomBetween(0, 360));
            const sat = Math.round(randomBetween(30, 65));
            const light = Math.round(randomBetween(40, 68));
            el.style.color = `hsla(${hue}, ${sat}%, ${light}%, 0.85)`;

            // 速度：较短到较长，越长越慢
            const duration = randomBetween(6.0, 14.0); // seconds
            el.style.animationDuration = duration + 's';

            // 轻微随机旋转偏差（在 CSS 已设置 -18deg 基础上微调）
            const rot = randomBetween(-26, -10);
            el.style.transform = `translate3d(0,0,0) rotate(${rot}deg)`;

            el.textContent = text;
            container.appendChild(el);

            // 清理：动画结束后移除节点
            const onEnd = function() {
                el.removeEventListener('animationend', onEnd);
                if (el.parentNode === container) container.removeChild(el);
            };
            el.addEventListener('animationend', onEnd);

            scheduleNext();
        }

        function scheduleNext() {
            const t = Math.max(minInterval, randomBetween(minInterval, maxInterval));
            clearTimeout(spawnTimer);
            spawnTimer = setTimeout(spawnOne, t);
        }

        // 初始批量产生一些弹幕以丰富背景但不突兀
        const initial = 6;
        for (let i = 0; i < initial; i++) {
            setTimeout(spawnOne, i * 350 + Math.random() * 400);
        }

        // 开始循环产生
        scheduleNext();

        // 在页面不可见时暂停产生，以节省性能
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) clearTimeout(spawnTimer);
            else scheduleNext();
        });

        // 清理函数（可选）：在页面卸载时移除定时器
        window.addEventListener('beforeunload', function() { clearTimeout(spawnTimer); });
    }).catch(err => {
        // 静默失败，不影响其他功能
        console.warn('danmaku init failed:', err);
    });
}
