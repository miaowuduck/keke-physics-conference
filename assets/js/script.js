// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeBarrage();
});

// 初始化导航功能
function initializeNavigation() {
    // 获取当前页面的URL
    const currentUrl = window.location.pathname;
    
    // 更新导航链接的活跃状态
    updateActiveNavLink(currentUrl);
}

/* ===== 弹幕逻辑：从 assets/data/banner.json 读取文本并在 logo/title 背后生成移动弹幕 ===== */
function initializeBarrage(options = {}) {
    const container = document.getElementById('barrage-container');
    if (!container) return;

    const defaultOpt = {
        lang: 'zh', // 使用中文显示（可改为 'en'）
        maxConcurrent: 12, // 同时存在的弹幕数量
        spawnInterval: 1000, // 毫秒：尝试生成新弹幕的间隔
        minDuration: 7000, // 动画最短时长 ms
        maxDuration: 16000 // 动画最长时长 ms
    };

    const cfg = Object.assign({}, defaultOpt, options);

    // 加载 banner 数据
    fetch(getBasePath() + '/assets/data/banner.json')
        .then(resp => resp.json())
        .then(data => {
            const items = (data && data.banners) ? data.banners : [];
            if (!items || items.length === 0) return;

            // 维护当前活动弹幕数，定期尝试生成
            const active = new Set();

            function spawnOne() {
                if (active.size >= cfg.maxConcurrent) return;

                const entry = items[Math.floor(Math.random() * items.length)];
                const text = (entry && entry[cfg.lang]) ? entry[cfg.lang] : (entry && entry.zh) || '';
                if (!text) return;

                const el = document.createElement('div');
                el.className = 'barrage-item barrage-animate';
                el.textContent = text;

                // 随机字体大小与起始位置（在容器垂直范围内随机）
                const fontSize = Math.floor(Math.random() * 12) + 14; // 14-25px
                el.style.fontSize = fontSize + 'px';

                // 先将元素添加到 DOM，以便测量尺寸
                container.appendChild(el);

                const rect = container.getBoundingClientRect();
                const elRect = el.getBoundingClientRect();

                // 随机起始 top（让它在可见区域稍偏下方起始）
                const startTop = Math.random() * (rect.height * 0.6) + rect.height * 0.2; // 20%~80%
                // 从容器左侧偏移一点开始（allow negative left），以便斜上飞出
                const startLeft = - (elRect.width * (Math.random() * 0.4 + 0.1));

                el.style.top = Math.round(startTop) + 'px';
                el.style.left = Math.round(startLeft) + 'px';

                // 动画时长与延迟随机
                const duration = Math.floor(Math.random() * (cfg.maxDuration - cfg.minDuration)) + cfg.minDuration;
                const delay = 0; // 也可随机化延迟
                el.style.animationDuration = (duration / 1000) + 's';
                el.style.animationDelay = (delay / 1000) + 's';

                active.add(el);

                // 清理：动画结束后移除元素
                el.addEventListener('animationend', () => {
                    try { container.removeChild(el); } catch (e) {}
                    active.delete(el);
                });
            }

            // 周期性尝试生成弹幕
            const spawnTimer = setInterval(spawnOne, cfg.spawnInterval);

            // 初始填充若干弹幕，制造即时效果
            for (let i = 0; i < Math.min(4, cfg.maxConcurrent); i++) {
                setTimeout(spawnOne, i * 300);
            }

            // 当页面卸载或容器从 DOM 中移除时清理定时器
            const observer = new MutationObserver(() => {
                if (!document.body.contains(container)) {
                    clearInterval(spawnTimer);
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        })
        .catch(() => {
            // 静默失败，不影响页面其它功能
        });

    function getBasePath() {
        // 在不同部署路径下尽可能选择根路径；Jekyll 的 relative_url 已在模板中处理静态引用，这里保守使用相对根路径
        return '';
    }
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
