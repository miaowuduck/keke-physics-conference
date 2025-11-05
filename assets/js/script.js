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
    
    navLinks.forEach(link => {
        // 获取链接的href属性
        const href = link.getAttribute('href');
        
        // 更严格地规范化 URL：去掉首尾的斜杠，方便精确匹配
        const strip = s => (s || '').replace(/^\/+|\/+$/g, '');
        const normalizedHref = strip(href);
        const normalizedCurrentUrl = strip(currentUrl);

        // 针对首页做特殊处理（避免空字符串导致所有页面都匹配）
        if (normalizedHref === '') {
            // 仅当当前路径也是根路径时才高亮首页
            if (normalizedCurrentUrl === '') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } else {
            // 非首页链接：当当前路径与链接路径相等，或以链接路径开头时视为高亮
            if (normalizedCurrentUrl === normalizedHref || normalizedCurrentUrl.startsWith(normalizedHref + '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
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
