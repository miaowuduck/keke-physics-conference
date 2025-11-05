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
    navLinks.forEach(link => link.classList.remove('active'));

    // 规范化当前路径（去掉首尾斜杠）
    const strip = s => (s || '').replace(/^\/+|\/+$/g, '');
    const normalizedCurrentUrl = strip(currentUrl || '');

    navLinks.forEach(link => {
        let href = link.getAttribute('href') || '';

        try {
            // 使用 URL 解析 href，支持绝对/相对/带域名的 href
            const url = new URL(href, window.location.origin);
            href = url.pathname;
        } catch (e) {
            // 如果解析失败则保留原始 href
        }

        const normalizedHref = strip(href);

        // 首页（href 为根路径）只有在当前路径也是根时才高亮
        if (normalizedHref === '') {
            if (normalizedCurrentUrl === '') {
                link.classList.add('active');
            }
            return;
        }

        // 精确匹配或作为父路径（子页面）匹配时高亮
        if (normalizedCurrentUrl === normalizedHref || normalizedCurrentUrl.startsWith(normalizedHref + '/')) {
            link.classList.add('active');
        }
    });
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
