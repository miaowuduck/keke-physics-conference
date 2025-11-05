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
    // 动态弹幕实现：在 logo 与 title 背后随机斜向上移动文本
    // 配置与数据
    const clicks = [
        {"zh":"探索发现，知晓未来","en":"Explore to Discover, Know the Future"},
        {"zh":"点亮物理之光","en":"Light up the Physics Spark"},
        {"zh":"奇妙夜，科学心","en":"A Magical Night, A Scientific Heart"},
        {"zh":"好奇驱动，真理指引","en":"Driven by Curiosity, Guided by Truth"},
        {"zh":"从微观到宇宙","en":"From Quantum to Cosmos"},
        {"zh":"每一次试验，都是冒险","en":"Every Experiment is an Adventure"},
        {"zh":"科学有趣，物理有料","en":"Science is Fun, Physics is Full of Wonders"},
        {"zh":"咯咯一笑，灵感闪耀","en":"A Giggle, A Spark of Insight"},
        {"zh":"致远同行，向未知出发","en":"Together to ZhiYuan, Into the Unknown"},
        {"zh":"用公式解锁奇迹","en":"Unlock Wonders with Equations"},
        {"zh":"让问题发光","en":"Make Questions Shine"},
        {"zh":"目光所及，皆为物理","en":"Everywhere You Look, It’s Physics"},
        {"zh":"追光少年，逐理之旅","en":"Chasing Light, Chasing Truth"},
        {"zh":"今天的好奇，明天的科技","en":"Today’s Curiosity, Tomorrow’s Technology"},
        {"zh":"实验台上的魔法","en":"Magic on the Lab Bench"},
        {"zh":"物理不难，有趣更燃","en":"Physics isn’t Hard, It’s Fun and Fired Up"},
        {"zh":"一起动手，理解世界","en":"Hands On, Understand the World"},
        {"zh":"小小假设，大大世界","en":"Small Hypotheses, Big World"},
        {"zh":"碰撞思维，火花四射","en":"Colliding Minds, Sparks Fly"},
        {"zh":"观测改变认知","en":"Observation Changes Understanding"},
        {"zh":"让数据说话","en":"Let the Data Speak"},
        {"zh":"你我皆探险家","en":"We Are All Explorers"},
        {"zh":"奇思妙想，精准验证","en":"Wild Ideas, Precise Tests"},
        {"zh":"物理带你看更远","en":"Physics Takes You Further"},
        {"zh":"好奇心不打烊","en":"Curiosity Never Closes"},
        {"zh":"致远2026，燃爆夜空","en":"ZhiYuan 2026, Lighting Up the Night"},
        {"zh":"给世界一个为什么","en":"Give the World a 'Why'"},
        {"zh":"引力不止是拉扯","en":"Gravity Is More Than a Pull"},
        {"zh":"时间的谜题，物理的答案","en":"Time’s Riddle, Physics’ Answer"},
        {"zh":"量子一跃，灵感无限","en":"Quantum Leap, Infinite Inspiration"},
        {"zh":"用心观察，用理解释","en":"Observe with Heart, Explain with Reason"},
        {"zh":"科学家在现场","en":"Scientists in Action"},
        {"zh":"少年与星辰","en":"Youth and the Stars"},
        {"zh":"让知识有温度","en":"Knowledge with Warmth"},
        {"zh":"物理奇妙夜，点亮心中的灯","en":"Physics Night, Light the Lamp Within"},
        {"zh":"好问题，半个答案","en":"A Good Question Is Half the Answer"},
        {"zh":"见证科学的瞬间","en":"Witness the Moment of Science"},
        {"zh":"脑洞与严谨共舞","en":"Imagination Dances with Rigor"},
        {"zh":"让学习更带感","en":"Make Learning Thrilling"},
        {"zh":"把复杂讲简单","en":"Make the Complex Simple"}
    ];

    // 语言选择：优先使用页面语言（<html lang>），回退到 navigator.language
    const siteLang = (document.documentElement && document.documentElement.lang) || navigator.language || 'zh-CN';
    const useZH = siteLang && siteLang.toLowerCase().startsWith('zh');

    container.innerHTML = '';
    container.style.display = ''; // 让容器可见（默认在 CSS 中被设置为 none）

    let maxConcurrent = 8;
    const smallScreen = window.innerWidth <= 768;
    let spawnInterval = smallScreen ? 1600 : 900; // ms
    if (smallScreen) maxConcurrent = 3;

    let active = true;
    let currentCount = 0;

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function pickRandom() { return clicks[Math.floor(Math.random() * clicks.length)]; }

    function createBarrageItem() {
        if (!active) return;
        if (currentCount >= maxConcurrent) return;

        const itemData = pickRandom();
        const text = useZH ? itemData.zh : itemData.en;
        const el = document.createElement('div');
        el.className = 'barrage-item barrage-animate';
        el.setAttribute('aria-hidden', 'true');
        el.textContent = text;

        // 随机起始位置（相对于容器）
        const topPct = rand(40, 95); // 从较低位置开始，让其向上穿过 logo/title
        const leftPct = rand(-30, 10); // 从左侧或略在容器内开始
        el.style.top = topPct + '%';
        el.style.left = leftPct + '%';

        // 字体大小与动画时长随机化以产生层次感
        const fontSize = Math.round(rand(12, 20));
        el.style.fontSize = fontSize + 'px';

        const duration = rand(7.5, 14.0); // 秒
        el.style.animationDuration = duration + 's';

        // 小的随机延迟，避免同时大量出现
        el.style.animationDelay = rand(0, 0.6) + 's';

        // 限制最多同时存在的元素计数
        currentCount += 1;

        el.addEventListener('animationend', () => {
            if (el && el.parentNode) el.parentNode.removeChild(el);
            currentCount = Math.max(0, currentCount - 1);
        });

        container.appendChild(el);
    }

    let timer = setInterval(createBarrageItem, spawnInterval);

    // 当页面不可见时暂停生成，恢复时继续
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            active = false;
            if (timer) { clearInterval(timer); timer = null; }
        } else {
            active = true;
            if (!timer) timer = setInterval(createBarrageItem, spawnInterval);
        }
    });

    // 当窗口大小改变时，调整频率与并发
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const isSmall = window.innerWidth <= 768;
            spawnInterval = isSmall ? 1600 : 900;
            maxConcurrent = isSmall ? 3 : 8;
            if (timer) { clearInterval(timer); timer = setInterval(createBarrageItem, spawnInterval); }
        }, 250);
    });

    // 提供外部选项：如果 options.staticText 存在，则显示静态文本并停止动态弹幕
    if (options.staticText) {
        // 清理已有动态定时器
        if (timer) { clearInterval(timer); timer = null; }
        container.innerHTML = '';
        const el = document.createElement('div');
        el.className = 'barrage-item barrage-static';
        el.textContent = options.staticText;
        container.appendChild(el);
    }
}

// 更新活跃导航链接
function updateActiveNavLink(currentUrl) {
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks || navLinks.length === 0) return;

    const strip = s => (s || '').replace(/^\/+|\/+$/g, '');
    const decode = s => { try { return decodeURIComponent(s); } catch (e) { return s; } };
    const normalizedCurrentUrl = strip(decode(currentUrl || ''));

    // 清除已有状态
    navLinks.forEach(link => link.classList.remove('active'));

    // 将 href 解析为规范化路径（优先用 URL，回退到原始 href）
    const resolvePath = href => {
        let p = href || '';
        try { p = new URL(href, window.location.origin).pathname; } catch (e) { /* 使用原始 href */ }
        return strip(decode(p));
    };

    // 选择最佳匹配（优先精确匹配；否则选择最长的前缀匹配；根路径作为兜底）
    let best = null; // { link, score }

    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const path = resolvePath(href);

        if (path === '') {
            // 根路径：只在当前也是根时作为候选（score 0）
            if (normalizedCurrentUrl === '' && (!best || 0 > best.score)) best = { link, score: 0 };
            return;
        }

        if (normalizedCurrentUrl === path) {
            // 精确匹配优先：直接认为是最佳匹配（根据长度比较以处理多重相同长度链接）
            if (!best || path.length > best.score) best = { link, score: path.length };
            return;
        }

        // 前缀匹配（父路径匹配子路径，例如 /agenda -> /agenda/session）
        if (normalizedCurrentUrl.startsWith(path + '/')) {
            if (!best || path.length > best.score) best = { link, score: path.length };
            return;
        }
    });

    if (best) {
        best.link.classList.add('active');
        return;
    }

    // 兜底：若当前是根路径，则尝试高亮 href 为空或指向根的链接
    if (normalizedCurrentUrl === '') {
        const root = Array.from(navLinks).find(l => resolvePath(l.getAttribute('href') || '') === '');
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
