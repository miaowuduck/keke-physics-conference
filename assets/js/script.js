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

/* 弹幕逻辑已移除：页面不再生成或显示任何弹幕或静态文本 */

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
