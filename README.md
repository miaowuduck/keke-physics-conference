# 咯咯物理奇妙夜 - 学术交流会网站

欢迎使用"咯咯物理奇妙夜"学术交流会官方网站项目！本项目是由上海交通大学物理学院致远物理系同学自发组织的学术交流会的官方网站。

## 📋 项目概述

本网站采用**多页面结构**，每个功能模块独立为一个HTML文件，便于后期管理和维护。网站包含以下主要页面：

- **首页 (index.html)** - 今年会议的基本信息
- **会议议程 (pages/agenda.html)** - 详细的会议日程安排
- **组织人员 (pages/organizers.html)** - 组织团队成员信息
- **联系方式 (pages/contact.html)** - 联系邮箱、微信等信息
- **往届回顾 (pages/past-events.html)** - 历届会议的详细记录

## 📁 项目结构

```
keke-physics-conference/
├── index.html                 # 首页
├── style.css                  # 全局样式文件
├── script.js                  # 全局JavaScript脚本
├── .gitignore                 # Git忽略文件
├── README.md                  # 项目说明（本文件）
└── pages/                     # 其他页面目录
    ├── agenda.html            # 会议议程页面
    ├── organizers.html        # 组织人员页面
    ├── contact.html           # 联系方式页面
    └── past-events.html       # 往届回顾页面
```

## 🚀 快速开始

### 1. 本地预览

#### 方法一：使用Python内置服务器（推荐）

如果您的计算机已安装Python，可以在项目根目录执行：

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然后在浏览器中访问：`http://localhost:8000`

#### 方法二：使用Node.js

如果您已安装Node.js和npm，可以使用`http-server`：

```bash
npm install -g http-server
http-server
```

#### 方法三：直接打开

也可以直接在浏览器中打开`index.html`文件（某些功能可能受限）。

### 2. 编辑网站内容

所有HTML文件都使用标准的HTML5格式，您可以使用任何文本编辑器（如VS Code、Sublime Text等）进行编辑：

- **更新首页信息**：编辑 `index.html` 中的会议时间、地点等
- **更新会议议程**：编辑 `pages/agenda.html` 中的议程表格
- **更新组织人员**：编辑 `pages/organizers.html` 中的人员信息
- **更新联系方式**：编辑 `pages/contact.html` 中的联系信息
- **添加往届信息**：编辑 `pages/past-events.html` 中的历届会议记录

### 3. 修改样式

所有样式都在 `style.css` 文件中定义，您可以修改颜色、字体、布局等。主要的颜色变量定义在文件开头的`:root`选择器中：

```css
:root {
    --primary-color: #2c3e50;        /* 主色调 */
    --secondary-color: #3498db;      /* 辅助色 */
    --accent-color: #e74c3c;         /* 强调色 */
    --success-color: #27ae60;        /* 成功色 */
    /* ... 其他变量 */
}
```

## 📤 部署到GitHub Pages

### 第一步：创建GitHub仓库

1. 访问 [GitHub](https://github.com) 并登录您的账户
2. 点击右上角的 **+** 按钮，选择 **New repository**
3. 填写仓库信息：
   - **Repository name**：`keke-physics-conference` 或其他名称
   - **Description**：咯咯物理奇妙夜学术交流会官方网站
   - **Public**：选择公开
   - **Initialize this repository with**：不勾选（因为我们已有本地代码）
4. 点击 **Create repository**

### 第二步：初始化本地Git仓库

在项目根目录打开终端，执行以下命令：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "初始化咯咯物理奇妙夜网站项目"

# 添加远程仓库（将YOUR_USERNAME替换为您的GitHub用户名，仓库名替换为实际名称）
git remote add origin https://github.com/YOUR_USERNAME/keke-physics-conference.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 第三步：启用GitHub Pages

1. 在GitHub仓库页面，点击 **Settings** 选项卡
2. 在左侧菜单中找到 **Pages** 选项
3. 在 **Source** 部分，选择：
   - **Branch**：`main`
   - **Folder**：`/ (root)`
4. 点击 **Save**

GitHub会自动生成您的网站URL，通常格式为：`https://YOUR_USERNAME.github.io/keke-physics-conference`

### 第四步：验证部署

等待几分钟后，访问上述URL，您应该能看到您的网站已成功部署。

## 📝 内容编辑指南

### 编辑首页信息

打开 `index.html`，找到以下部分并修改：

```html
<div class="info-card">
    <h3>📅 会议时间</h3>
    <p><strong>待更新</strong>（请联系组织者获取最新信息）</p>
</div>
```

将 `待更新` 替换为实际的会议时间。

### 编辑会议议程

打开 `pages/agenda.html`，找到议程表格，按照以下格式添加行：

```html
<tr>
    <td>时间范围</td>
    <td>报告标题</td>
    <td>报告人</td>
</tr>
```

### 编辑组织人员

打开 `pages/organizers.html`，在 `.organizers-grid` 中添加新的人员卡片：

```html
<div class="organizer-card">
    <h4>姓名</h4>
    <p class="role">角色：职位</p>
</div>
```

### 编辑联系方式

打开 `pages/contact.html`，更新邮箱、微信等联系信息。

### 添加往届回顾

打开 `pages/past-events.html`，参考第一届（2024年）的格式，添加新的往届事件块。

## 🎨 自定义网站

### 修改颜色主题

编辑 `style.css` 中的颜色变量：

```css
:root {
    --primary-color: #2c3e50;        /* 改为您喜欢的颜色 */
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --success-color: #27ae60;
}
```

### 修改字体

在 `body` 选择器中修改 `font-family`：

```css
body {
    font-family: '您喜欢的字体', sans-serif;
}
```

### 修改网站标题

编辑所有HTML文件中的 `<title>` 标签。

## 🔄 更新网站后部署

每次修改内容后，需要将更改推送到GitHub：

```bash
# 查看修改的文件
git status

# 添加所有修改
git add .

# 提交更改（用实际的修改说明替换"更新会议信息"）
git commit -m "更新会议信息"

# 推送到GitHub
git push origin main
```

GitHub Pages会自动更新您的网站（通常需要几分钟）。

## 📱 响应式设计

本网站已针对不同屏幕尺寸进行优化，包括：

- **桌面设备** (1200px及以上)
- **平板设备** (768px - 1199px)
- **手机设备** (480px - 767px)
- **小屏幕手机** (480px以下)

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和响应式设计
- **Vanilla JavaScript** - 交互功能
- **GitHub Pages** - 免费网站托管

## 📞 常见问题

### Q: 如何添加新页面？

A: 在 `pages/` 目录中创建新的HTML文件，参考现有页面的结构，然后在导航栏中添加链接。

### Q: 网站部署后没有看到更新？

A: GitHub Pages可能需要几分钟来更新。您也可以尝试清除浏览器缓存（Ctrl+Shift+Delete）。

### Q: 如何添加图片？

A: 创建一个 `images/` 目录，将图片放入其中，然后在HTML中引用：
```html
<img src="../images/photo.jpg" alt="描述">
```

### Q: 可以使用自己的域名吗？

A: 可以。在GitHub仓库Settings > Pages中，可以配置自定义域名。

## 📄 许可证

本项目为开源项目，可自由使用和修改。

## 👥 贡献

欢迎提交问题和改进建议！

---

**最后更新**：2025年11月

**维护者**：上海交通大学物理学院致远物理系学术交流会筹备组
