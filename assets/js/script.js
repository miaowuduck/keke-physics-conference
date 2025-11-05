// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
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
