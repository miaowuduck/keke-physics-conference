# 咯咯物理奇妙夜 - 学术交流会网站（Jekyll + GitHub Pages）

欢迎使用"咯咯物理奇妙夜"学术交流会官方网站项目！本项目是由上海交通大学物理学院致远物理系同学自发组织的学术交流会的官方网站。

## 📋 项目概述

本网站采用 **Jekyll 静态网站生成器** 和 **GitHub Pages** 托管，配合 **GitHub Actions** 自动部署。这种方案具有以下优势：

- ✅ **无需服务器**：完全由 GitHub Pages 免费托管
- ✅ **自动部署**：每次 push 到 GitHub 时自动构建和部署
- ✅ **版本控制**：使用 Git 管理所有内容和配置
- ✅ **Markdown 编写**：使用 Markdown 格式编写内容，易于维护
- ✅ **响应式设计**：支持桌面、平板和手机设备

## 📁 项目结构

```
keke-physics-conference/
├── _config.yml                    # Jekyll 配置文件
├── Gemfile                        # Ruby 依赖文件
├── .gitignore                     # Git 忽略文件
├── .nojekyll                      # 告诉 GitHub 使用 Jekyll 处理
├── README.md                      # 项目说明（本文件）
│
├── index.md                       # 首页
├── pages/agenda.md                # 会议议程页面（已整理到 pages/）
├── pages/organizers.md            # 组织人员页面（已整理到 pages/）
├── pages/contact.md               # 联系方式页面（已整理到 pages/）
├── pages/past-events.md           # 往届回顾页面（已整理到 pages/）
│
├── _layouts/                      # Jekyll 布局模板
│   └── default.html               # 默认页面布局
│
├── assets/                        # 静态资源
│   ├── css/
│   │   └── style.css              # 全局样式文件
│   └── js/
│       └── script.js              # 全局 JavaScript 脚本
│
└── .github/
    └── workflows/
        └── jekyll.yml             # GitHub Actions 工作流配置
```

## 🚀 快速开始

### 1. 本地预览

#### 前置要求

- 安装 Ruby 3.1 或更高版本
- 安装 Bundler

#### 本地运行

在项目根目录执行以下命令：

```bash
# 安装依赖
bundle install

# 启动本地服务器
bundle exec jekyll serve
```

然后在浏览器中访问：`http://localhost:4000`

### 2. 编辑网站内容

所有页面都使用 Markdown 格式，您可以使用任何文本编辑器（如 VS Code、Sublime Text 等）进行编辑：

- **更新首页信息**：编辑 `index.md`
- **更新会议议程**：编辑 `pages/agenda.md`
- **更新组织人员**：编辑 `pages/organizers.md`
- **更新联系方式**：编辑 `pages/contact.md`
- **添加往届信息**：编辑 `pages/past-events.md`

### 3. 修改样式

所有样式都在 `assets/css/style.css` 文件中定义，您可以修改颜色、字体、布局等。主要的颜色变量定义在文件开头的 `:root` 选择器中：

```css
:root {
    --primary-color: #2c3e50;        /* 主色调 */
    --secondary-color: #3498db;      /* 辅助色 */
    --accent-color: #e74c3c;         /* 强调色 */
    --success-color: #27ae60;        /* 成功色 */
    /* ... 其他变量 */
}
```

### 4. 修改 Jekyll 配置

编辑 `_config.yml` 文件来自定义网站设置：

```yaml
title: 咯咯物理奇妙夜
email: contact@example.com
baseurl: "/keke-physics-conference"  # 如果部署在子目录
url: "https://username.github.io"    # 您的 GitHub Pages URL
```

## 📤 部署到 GitHub Pages

### 第一步：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录您的账户
2. 点击右上角的 **+** 按钮，选择 **New repository**
3. 填写仓库信息：
   - **Repository name**：`keke-physics-conference` 或其他名称
   - **Description**：咯咯物理奇妙夜学术交流会官方网站
   - **Public**：选择公开
   - **Initialize this repository with**：不勾选（因为我们已有本地代码）
4. 点击 **Create repository**

### 第二步：初始化本地 Git 仓库

在项目根目录打开终端，执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "初始化咯咯物理奇妙夜网站项目"

# 添加远程仓库
# 将 YOUR_USERNAME 替换为您的 GitHub 用户名
# 将 keke-physics-conference 替换为您的仓库名
git remote add origin https://github.com/YOUR_USERNAME/keke-physics-conference.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 第三步：启用 GitHub Pages 和 GitHub Actions

1. 在 GitHub 仓库页面，点击 **Settings** 选项卡
2. 在左侧菜单中找到 **Pages** 选项
3. 在 **Source** 部分，选择：
   - **Deploy from a branch**：选择此项
   - **Branch**：`main`
   - **Folder**：`/ (root)`
4. 点击 **Save**

**GitHub Actions 会自动配置**：
- 项目中已包含 `.github/workflows/jekyll.yml` 文件
- 每次您 push 代码到 `main` 分支时，GitHub Actions 会自动构建和部署网站
- 您可以在 **Actions** 选项卡中查看构建状态

### 第四步：验证部署

1. 等待 GitHub Actions 完成构建（通常需要 1-2 分钟）
2. 在 **Settings > Pages** 中查看您的网站 URL
3. 访问该 URL，您应该能看到您的网站已成功部署

您的网站地址通常格式为：`https://YOUR_USERNAME.github.io/keke-physics-conference`

## 📝 内容编辑指南

### 编辑首页信息

打开 `index.md`，找到以下部分并修改：

```markdown
# 今年会议信息

<div class="info-card">
<h3>📅 会议时间</h3>
<p><strong>待更新</strong>（请联系组织者获取最新信息）</p>
</div>
```

将 `待更新` 替换为实际的会议时间。

### 编辑会议议程

打开 `pages/agenda.md`，找到议程表格，按照以下格式添加行：

```markdown
| 时间 | 报告名称 | 报告人 |
|------|---------|--------|
| 时间范围 | 报告标题 | 报告人名字 |
```

### 编辑组织人员

打开 `pages/organizers.md`，添加新的人员卡片：

```html
<div class="organizer-card">
<h4>姓名</h4>
<p class="role">角色：职位</p>
</div>
```

### 编辑联系方式

打开 `pages/contact.md`，更新邮箱、微信等联系信息。

### 添加往届回顾

打开 `pages/past-events.md`，参考第一届（2024年）的格式，添加新的往届事件块。

## 🎨 自定义网站

### 修改颜色主题

编辑 `assets/css/style.css` 中的颜色变量：

```css
:root {
    --primary-color: #2c3e50;        /* 改为您喜欢的颜色 */
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --success-color: #27ae60;
}
```

### 修改字体

在 `assets/css/style.css` 中的 `body` 选择器中修改 `font-family`。

### 修改网站标题

编辑 `_config.yml` 中的 `title` 字段。

### 修改导航菜单

编辑 `_layouts/default.html` 中的导航栏代码。

## 🔄 更新网站后部署

每次修改内容后，需要将更改推送到 GitHub：

```bash
# 查看修改的文件
git status

# 添加所有修改
git add .

# 提交更改（用实际的修改说明替换"更新会议信息"）
git commit -m "更新会议信息"

# 推送到 GitHub
git push origin main
```

GitHub Actions 会自动构建和部署您的网站（通常需要 1-2 分钟）。

## 📱 响应式设计

本网站已针对不同屏幕尺寸进行优化，包括：

- **桌面设备** (1200px 及以上)
- **平板设备** (768px - 1199px)
- **手机设备** (480px - 767px)
- **小屏幕手机** (480px 以下)

## 🛠️ 技术栈

- **Jekyll** - 静态网站生成器
- **Markdown** - 内容格式
- **HTML5** - 页面结构
- **CSS3** - 样式和响应式设计
- **Vanilla JavaScript** - 交互功能
- **GitHub Pages** - 免费网站托管
- **GitHub Actions** - 自动构建和部署

## 📞 常见问题

### Q: 如何添加新页面？

A: 在项目根目录创建新的 `.md` 文件，添加以下 Front Matter：

```markdown
---
layout: default
title: 页面标题
permalink: /page-name/
---

# 页面内容
```

然后在 `_layouts/default.html` 中的导航菜单中添加链接。

### Q: 网站部署后没有看到更新？

A: 
1. 检查 GitHub Actions 是否成功完成构建（在 **Actions** 选项卡中查看）
2. 尝试清除浏览器缓存（Ctrl+Shift+Delete）
3. 等待几分钟后重新刷新页面

### Q: 如何添加图片？

A: 
1. 创建一个 `assets/images/` 目录
2. 将图片放入其中
3. 在 Markdown 中引用：

```markdown
![图片描述]({{ '/assets/images/photo.jpg' | relative_url }})
```

或在 HTML 中引用：

```html
<img src="{{ '/assets/images/photo.jpg' | relative_url }}" alt="图片描述">
```

### Q: 可以使用自己的域名吗？

A: 可以。在 GitHub 仓库 Settings > Pages 中，可以配置自定义域名。

### Q: 如何修改网站的基础 URL？

A: 编辑 `_config.yml` 中的 `baseurl` 字段。如果部署在根域名，设置为空字符串 `""`；如果部署在子目录，设置为 `/subdirectory`。

### Q: GitHub Actions 构建失败怎么办？

A: 
1. 检查 **Actions** 选项卡中的错误日志
2. 确保 `Gemfile` 和 `_config.yml` 配置正确
3. 尝试在本地运行 `bundle exec jekyll build` 检查是否有错误

## 📄 许可证

本项目为开源项目，可自由使用和修改。

## 👥 贡献

欢迎提交问题和改进建议！

---

**最后更新**：2025年11月

**维护者**：上海交通大学物理学院致远物理系学术交流会筹备组

## 📚 参考资源

- [Jekyll 官方文档](https://jekyllrb.com/)
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [Markdown 语法指南](https://www.markdownguide.org/)
