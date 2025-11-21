// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('Keke Physics Conference site loaded.');
    
    // 简单的滚动效果：导航栏滚动时变色（可选）
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
