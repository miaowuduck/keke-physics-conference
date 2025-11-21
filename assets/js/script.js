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
    
    // 背景文字特效
    const bgContainer = document.getElementById('background-text-container');
    if (bgContainer) {
        const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
        const dataUrl = (window._SITE_BASEURL || '') + '/assets/data/background_texts.json';

        fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                const texts = data.clicks;
                
                function createFloatingText() {
                    if (document.hidden) return; // 页面不可见时不生成

                    const item = texts[Math.floor(Math.random() * texts.length)];
                    const textContent = item[lang] || item['en']; 
                    
                    const el = document.createElement('div');
                    el.classList.add('floating-text');
                    el.textContent = textContent;
                    
                    // 随机位置
                    // 容器高度有限，我们在容器内部随机位置生成
                    const rect = bgContainer.getBoundingClientRect();
                    // 宽度上随机，减去一些余量防止太靠右
                    const startX = Math.random() * (rect.width * 0.8); 
                    // 高度上，偏下部生成，以便向上飘
                    const startY = Math.random() * (rect.height * 0.6) + (rect.height * 0.2); 
                    
                    el.style.left = `${startX}px`;
                    el.style.top = `${startY}px`;
                    
                    // 随机字体大小
                    const fontSize = 0.8 + Math.random() * 0.4; // 0.8rem - 1.2rem
                    el.style.fontSize = `${fontSize}rem`;

                    // 随机动画时长
                    const duration = 3 + Math.random() * 3;
                    el.style.animationDuration = `${duration}s`;

                    bgContainer.appendChild(el);
                    
                    // 动画结束后移除
                    setTimeout(() => {
                        el.remove();
                    }, duration * 1000);
                }

                // 启动生成循环
                setInterval(createFloatingText, 1500); // 每1.5秒生成一个，避免太密集
                // 初始生成几个
                createFloatingText();
            })
            .catch(err => console.error('Failed to load background texts:', err));
    }
});
