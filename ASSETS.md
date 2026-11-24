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
- favicon：`public/favicon.svg` 手写 SVG。
- 第二届徽记：`public/images/logo_main.svg`，从本仓库 git 历史恢复的原社区 logo，仅用于 2026 往届卡片。

## 模板

页面版式与动效基于 VibeFather 的 **Design Conference Website** 模板：

- https://vibefather.ai/t/design-conference-website
- CC BY-NC 4.0（非商业使用，需保留署名）
- 页脚保留 “Template by VibeFather” 链接

本网站是上海交通大学学生社区的非商业活动站点。
