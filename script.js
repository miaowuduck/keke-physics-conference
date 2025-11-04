// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

// 初始化导航功能
function initializeNavigation() {
    // 获取当前页面的文件名
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 更新导航链接的活跃状态
    updateActiveNavLink(currentPage);
}

// 更新活跃导航链接
function updateActiveNavLink(currentPage) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // 获取链接的href属性
        const href = link.getAttribute('href');
        
        // 获取链接指向的页面名称
        const linkPage = href.split('/').pop();
        
        // 比较当前页面和链接页面
        if (linkPage === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
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
