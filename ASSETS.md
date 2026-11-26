# 素材与许可

## 字体

均通过 npm 安装、由 Vite 打包，不从字体 CDN 加载。

| 包 | 字体 | 许可 | npm |
| --- | --- | --- | --- |
| `@fontsource-variable/anybody` | Anybody Variable（wght + wdth） | OFL-1.1 | https://www.npmjs.com/package/@fontsource-variable/anybody |
| `@fontsource-variable/inter` | Inter Variable | OFL-1.1 | https://www.npmjs.com/package/@fontsource-variable/inter |
| `@fontsource/jetbrains-mono` | JetBrains Mono 400 / 700 | OFL-1.1 | https://www.npmjs.com/package/@fontsource/jetbrains-mono |

中文使用系统字体栈：`PingFang SC`、`Microsoft YaHei`、`Noto Sans SC`，不额外打包 CJK 字体。

## 图标

`lucide-react` — ISC License — https://www.npmjs.com/package/lucide-react

## 图像

- **无照片、无位图人物。**
- 讲者头像：`src/components/Portrait.tsx` 根据姓名 hash 生成的抽象 SVG，同一姓名永远生成同一图案。
- 星野：`src/components/Starfield.tsx` 用确定性随机数生成。
- 场地：**不绘制示意地图**。页面提供高德地图与 OpenStreetMap 的真实搜索链接，避免手绘图误导位置。
- favicon：`public/favicon.svg` 手写 SVG，取自主徽记的星芒、裂痕与金环。
- 主徽记：`public/images/logo_mark.svg`，由 `code_artifact.html` 的金属烤漆徽章扁平化而来，配色对齐站点夜蓝 / 金 / 骨白。站内通过 `src/components/LogoMark.tsx` 内联渲染，并复用其开场与退场动效。
- 第二届徽记：`public/images/logo_2026-128/192.{avif,webp,png}`，由原 `logo_main.svg` 光栅化并压缩，用于 2026 往届卡片 64px 位置；原 SVG 保留作历史存档，页面不再加载。

## 新闻图片

`public/images/news/` 下为新闻页素材：

- AI 生成的编辑插画：`hero`、`four-directions`、`stage-talk`、`registration`、`venue-night`、`poster`。统一深海军蓝 / 金 / 骨白配色，图注均标注“插画：致远物理咯咯”。
- 主办方资料照片：`2025-group.jpg`（2025 年第二届现场合影），图注标注“照片：主办方提供”。
- 徽章报道物料：`logo-hero`、`logo-detail`、`logo-badge`、`logo-ticket`、`logo-poster` 均由 `.shots/logo_scenes.html` 用真实 `logo_mark.svg` 合成后截图，不是 AI 生图；白模拆解图由 `src/components/LogoAnatomy.tsx` 直接以 SVG 绘制。图注标注“视觉：致远物理咯咯设计组”与“工艺示意 / 物料示意”。
- 徽章报道旧稿：`public/designs/old-atomic-chick.html` 与 `public/designs/old-starlight-hatch.html` 为两个未采用方案的原始动效文件，通过 `?embed=1` 以 iframe 直接嵌入报道（只保留画布并自动播放一次）。前者用本地编译的 Tailwind 样式替换了 CDN，二者均无外部字体或脚本依赖，整页标记 `noindex`。
- 压缩策略：每张图提供 AVIF / WebP / JPEG 三套格式与 640 / 960 / 1280 多尺寸（竖版海报为 360 / 720），通过原生 `<picture>` + `srcset` 按视口与 DPR 加载；AVIF 单张 5–78KB，首屏约 50KB。非首屏图片使用 `loading="lazy"`。

## 模板

页面版式与动效基于 VibeFather 的 **Design Conference Website** 模板：

- https://vibefather.ai/t/design-conference-website
- CC BY-NC 4.0（非商业使用，需保留署名）
- 页脚保留 “Template by VibeFather” 链接

本网站是上海交通大学学生社区的非商业活动站点。
