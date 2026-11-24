# 咯咯物理奇妙夜 2027 · Keke Physics Night

第三届「咯咯物理奇妙夜」官方网站。中文为主，保留 2024 与 2026 两届完整议程。

- 活动：2026 年 12 月 26 日（周六）19:00
- 地点：上海交通大学致远学院 204-ClassIn 全球教室
- 线上：腾讯会议（会议号会前公布）

## 技术栈

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3.4
- Motion（页面动效）、lucide-react（图标）
- Fontsource 自托管字体（Anybody / Inter / JetBrains Mono）
- 无后端、无数据库、无第三方 API

## 开发

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # 类型检查 + 输出 dist/
npm run preview  # 预览生产构建
```

多页入口：

- `/index.html` — 首页
- `/schedule.html` — 三年议程（2027 / 2026 / 2024）

## 改内容

**所有文案、日期、议程、讲者、报名方式都集中在 `src/content.ts`。**

常见修改：

- **改活动日期**：改 `site.dateISO` 与 `site.dateLabel` / `site.dateLong`。首页倒计时、JSON-LD、日历下载都会跟着变。
- **开放报名**：把 `site.registrationUrl` 填成问卷链接；留空时按钮会打开“报名通道即将开放”弹窗。
- **公布腾讯会议号**：改 `site.online`，以及 `editions` 中 2027 的 `online`。
- **上线 2027 议程**：往 `editions` 里 2027 的 `sessions` 数组添加场次，`status` 改为 `past`（或保留 upcoming），议程页会自动出现年份 tab 内容。
- **换讲者**：改 `speakers`；头像由姓名 hash 生成，不需要图片。
- **改报名卡 / FAQ**：改 `tiers`、`attend`、`faq`。

### 新增一场报告

```ts
{
  id: '2027-01',
  start: '19:00',
  end: '19:30',
  kind: 'talk',            // talk | opening | break | discussion
  topic: 'quantum',        // quantum | astro | photonics | condensed | cross
  titleZh: '中文题目',
  titleEn: 'English title',
  speaker: '讲者姓名',
}
```

## 部署

推送到 `main` 后，GitHub Actions（`.github/workflows/deploy.yml`）会构建 `dist/` 并部署到 GitHub Pages。

首次部署前，在仓库 **Settings → Pages → Build and deployment** 把 Source 设为 **GitHub Actions**。

站点地址：<https://miaowuduck.github.io/keke-physics-conference/>

`vite.config.ts` 使用 `base: './'`，因此子路径部署和本地 `file://` 预览都不会丢资源。

旧链接（`/past-events/`、`/agenda/`、`/contact/`、`/organizers/`、`/zh/…`）通过 `public/` 下的轻量跳转页保留。

## 待确认 / 占位

- 2027 报名问卷链接（当前用 `mailto:phyconf@163.com` 兜底）
- 2027 腾讯会议号与密码
- 2027 议程与讲者
- 公众号二维码、照片直播链接（原素材未存档）

## 目录

```
index.html / schedule.html      两个入口
src/content.ts                  全部内容与数据
src/pages/Home.tsx              首页
src/pages/Schedule.tsx          议程页
src/components/                 导航、标题、星野、倒计时、讲者、场地卡、报名、FAQ…
src/styles.css                  配色、字体、组件类、动效
public/                         favicon、logo、重定向页、robots、sitemap
```

## 设计

基于 VibeFather `design-conference-website`（CC BY-NC 4.0），保留其瑞士海报版式与光标驱动的可变字重标题，改为原 logo 的夜空金蓝配色。页脚保留 “Template by VibeFather” 署名。

字体与素材许可见 [ASSETS.md](./ASSETS.md)。
