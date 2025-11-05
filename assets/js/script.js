// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

// 初始化导航功能
function initializeNavigation() {
    // 获取当前页面的URL
    const currentUrl = window.location.pathname;
    
    // 更新导航链接的活跃状态
    // 先修正导航与语言切换链接，使它们指向当前语言对应的路径
    try { adjustNavForLanguage(); } catch (e) { /* 不阻塞 */ }

    updateActiveNavLink(currentUrl);
}

// 获取 site baseurl（由模板注入），保证以 / 开头但不以 / 结尾（除空字符串）
function getBaseurl() {
    let b = window._SITE_BASEURL || '';
    if (!b) return '';
    // 确保以 '/' 开头
    if (!b.startsWith('/')) b = '/' + b;
    // 去掉尾部 '/'
    if (b.length > 1 && b.endsWith('/')) b = b.slice(0, -1);
    return b;
}

// 将给定的路径按 baseurl 切分，返回相对部分（以 '/' 开头），例如：
// base = '/keke-physics-conference', path='/keke-physics-conference/agenda/' => '/agenda/'
function stripBase(path) {
    const base = getBaseurl();
    if (!base) return path || '/';
    if (path.startsWith(base)) {
        const rest = path.slice(base.length) || '/';
        return rest.startsWith('/') ? rest : '/' + rest;
    }
    return path || '/';
}

// 构造带 base 的路径
function withBase(relPath) {
    const base = getBaseurl();
    if (!relPath.startsWith('/')) relPath = '/' + relPath;
    if (!base) return relPath;
    // 避免重复 //
    return base + relPath;
}

// 将导航链接与语言切换器调整为当前页面对应的语言路径
function adjustNavForLanguage() {
    const pathname = window.location.pathname || '/';
    const base = getBaseurl();
    const rel = stripBase(pathname);

    // 判断当前是否中文页面（相对路径以 /zh/ 开头 或 等于 /zh/）
    const isZh = rel === '/zh' || rel === '/zh/' || rel.startsWith('/zh/');

    // 需要映射的页面相对路径（不带 base），用于构造 counterparts
    // 如果是 zh 页面，去掉前缀 /zh
    const relNoLang = (function() {
        if (isZh) {
            // 把 /zh/agenda/ -> /agenda/
            if (rel === '/zh' || rel === '/zh/') return '/';
            return rel.replace(/^\/zh/, '') || '/';
        }
        return rel || '/';
    })();

    // 更新主导航链接（将所有 .nav-link 的 href 替换为对应语言的版本）
    const navLinks = document.querySelectorAll('.nav-menu > li > a.nav-link');
    if (navLinks && navLinks.length) {
        navLinks.forEach(link => {
            try {
                // 解析链接的相对路径（去掉 base）
                const url = new URL(link.getAttribute('href'), window.location.origin);
                let p = stripBase(url.pathname);

                // Special: root '' or '/' -> '/'
                if (!p || p === '') p = '/';

                // If current page is zh, then produce zh counterpart for this nav href
                if (isZh) {
                    // If link already points inside /zh/, leave it
                    if (p === '/' ) {
                        // root -> /zh/
                        link.setAttribute('href', withBase('/zh/'));
                    } else if (p.startsWith('/zh/')) {
                        link.setAttribute('href', withBase(p));
                    } else {
                        // prepend /zh to the relative path
                        link.setAttribute('href', withBase('/zh' + (p.startsWith('/') ? p : '/' + p)));
                    }
                } else {
                    // English site: ensure link points to non-zh path
                    if (p.startsWith('/zh/')) {
                        // remove /zh
                        const target = p.replace(/^\/zh/, '') || '/';
                        link.setAttribute('href', withBase(target));
                    } else {
                        link.setAttribute('href', withBase(p));
                    }
                }
            } catch (e) {
                // ignore individual link errors
            }
        });
    }

    // 调整语言切换器：如果当前页面有对应翻译页，则跳转到对应路径
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
        // 寻找里面的两个链接（English / 中文）
        const anchors = langSwitcher.querySelectorAll('a');
        // 构造对应的路径
        const enPath = withBase(relNoLang === '/' ? '/' : relNoLang);
        const zhPath = withBase('/zh' + (relNoLang === '/' ? '/' : relNoLang));

        anchors.forEach(a => {
            const t = (a.textContent || '').trim().toLowerCase();
            if (t === 'english' || t === 'en') {
                a.setAttribute('href', enPath);
            } else if (t === '中文' || t === 'zh' || t === '中文' ) {
                a.setAttribute('href', zhPath);
            } else {
                // fallback: if link currently points to /zh/, update accordingly
                const href = a.getAttribute('href') || '';
                if (href.indexOf('/zh') >= 0) a.setAttribute('href', zhPath);
                else a.setAttribute('href', enPath);
            }
        });
    }
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
