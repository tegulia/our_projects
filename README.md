# 一帆智量 - AI效率提升与价值创造

一个专注于AI效率提升与价值创造的个人网站，分享实用的AI工具使用技巧、工作流程优化方案，以及如何将AI转化为生产力，实现收益增长。

## 网站特点

- ✨ 现代简约设计，淡蓝色主题
- 📱 完全响应式，适配手机/平板/桌面
- 🎯 单页应用结构，包含导航栏、关于我、项目展示、联系方式
- ⚡ 性能优化，快速加载
- 🌈 平滑滚动和元素动画效果
- 📝 联系表单
- 🖼️ 项目图片灯箱效果
- ♿ 可访问性友好

## 技术栈

- HTML5 语义化标签
- CSS3 现代特性（CSS变量、Flexbox、Grid）
- 原生 JavaScript（无需框架依赖）
- Inter 字体（通过 Google Fonts）

## 项目结构

```
个人项目展示/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # 交互脚本
├── images/             # 图片文件夹
├── shitou/             # 石头剪刀布游戏项目
└── 蔬食料理课/          # 蔬食料理课管理系统项目
```

## 主要项目

### 1. 石头剪刀布 AI 对战
- **描述**：用原生 JavaScript 打造的经典游戏新体验
- **功能**：实现人机对战逻辑与胜负判定算法，设计手势交互动画，提升游戏沉浸感
- **特点**：响应式布局，手机/桌面无缝切换，本地存储战绩，记录连胜纪录
- **技术栈**：Vanilla JS, HTML5, CSS3, LocalStorage
- **访问路径**：[shitou/index.html](shitou/index.html)

### 2. 蔬食料理课管理系统
- **作者**：梦芯
- **描述**：为蔬食料理课程设计的学员管理系统，提供学员信息管理、签到记录、课程安排和数据统计分析功能
- **功能**：
  - 学员信息管理（支持全课学员和单次学员分类）
  - 签到记录（自动扣减学员课时，支持补课记录）
  - 课程安排（管理十次课程的具体安排）
  - 统计分析（实时统计数据和图表可视化）
- **特点**：响应式设计，支持多设备访问，使用本地存储实现数据持久化
- **技术栈**：HTML5, CSS3, JavaScript, Bootstrap 5.3.0, Chart.js, LocalStorage
- **访问路径**：[蔬食料理课/index.html](蔬食料理课/index.html)

## 快速开始

### 1. 下载项目

```bash
# 克隆仓库
git clone [仓库地址]
# 或直接下载ZIP文件并解压
```

### 2. 本地预览

直接在浏览器中打开 `index.html` 文件，或使用本地服务器：

```bash
# 使用Python 3
python -m http.server 8000

# 使用Node.js (需要安装 http-server)
npx http-server

# 使用PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 内容自定义指南

### 1. 个人信息

在 `index.html` 中找到以下部分并修改：

```html
<!-- 导航栏Logo -->
<div class="nav-logo">
    <a href="#home">一帆智量</a>  <!-- 修改为您的品牌名称 -->
</div>

<!-- 关于我部分 -->
<h1 class="fade-in">欢迎来到一帆智量</h1>  <!-- 修改为您的标题 -->
<p class="subtitle fade-in">AI效率提升与价值创造</p>  <!-- 修改为您的副标题 -->

<!-- 个人简介 -->
<div class="about-description fade-in">
    <p>一帆智量的公众号，专注于教大家如何利用AI技术提高工作效率，创造更多价值。</p>
    <p>我们分享实用的AI工具使用技巧、工作流程优化方案，以及如何将AI转化为生产力，实现收入增长。</p>
</div>
```

### 2. 二维码图片

替换二维码图片：

1. 将您的二维码图片放入 `images` 文件夹
2. 在 `index.html` 中修改图片路径：

```html
<div class="about-image fade-in">
    <img src="images/your-qrcode.jpg" alt="您的二维码" class="profile-img">
</div>
```

### 3. 技能标签

修改技能标签：

```html
<div class="skills fade-in">
    <span class="skill-tag">AI工具应用</span>
    <span class="skill-tag">效率提升</span>
    <span class="skill-tag">工作流程优化</span>
    <span class="skill-tag">收益增长</span>
    <span class="skill-tag">实用技巧</span>
    <span class="skill-tag">案例分析</span>
    <!-- 添加或删除技能标签 -->
</div>
```

### 4. 项目展示

修改项目信息：

```html
<!-- 项目卡片示例 -->
<div class="project-card fade-in">
    <div class="project-image">
        <a href="项目路径/index.html" target="_blank">
            <img src="images/project-image.jpg" alt="项目名称" loading="lazy">
        </a>
    </div>
    <div class="project-content">
        <h3>项目名称</h3>
        <p class="project-author">作者：作者名</p>
        <p class="project-subtitle">项目副标题</p>
        <p>项目简短描述</p>
        <div class="project-tech">
            <span class="tech-tag">技术1</span>
            <span class="tech-tag">技术2</span>
        </div>
        <div class="project-links">
            <a href="项目路径/index.html" target="_blank" class="btn btn-small">Live Demo</a>
            <a href="#" class="btn btn-small btn-outline">查看代码</a>
        </div>
    </div>
</div>
```

### 5. 联系方式

修改社交链接和邮箱：

```html
<!-- 社交链接 -->
<div class="social-links">
    <a href="https://github.com/your-username" class="social-link" aria-label="GitHub">
        <!-- GitHub SVG图标 -->
    </a>
    <a href="https://linkedin.com/in/your-profile" class="social-link" aria-label="LinkedIn">
        <!-- LinkedIn SVG图标 -->
    </a>
    <!-- 添加更多社交链接 -->
</div>

<!-- 邮箱地址 -->
<div class="contact-email">
    <p>邮箱: your-email@example.com</p>
</div>
```

### 6. 表单配置

默认情况下，联系表单仅模拟提交。要启用真实提交功能，请修改 `js/main.js` 中的 `simulateFormSubmission` 函数：

```javascript
// 替换模拟提交代码为真实API调用
fetch('https://formspree.io/f/your-form-id', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    showFormMessage('感谢您的消息！我会尽快回复您。', 'success');
    contactForm.reset();
})
.catch(error => {
    showFormMessage('发送失败，请稍后再试', 'error');
})
.finally(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
});
```

推荐表单服务：
- [Formspree](https://formspree.io/) - 免费，简单易用
- [Netlify Forms](https://www.netlify.com/products/forms/) - 如果使用Netlify部署
- [Getform](https://getform.io/) - 另一个简单的表单服务

## 主题自定义

### 修改颜色主题

在 `css/style.css` 顶部修改CSS变量：

```css
:root {
  --primary-color: #4A90E2;      /* 主色调 */
  --primary-light: #E6F2FF;      /* 浅色背景 */
  --primary-dark: #3A7BC8;       /* 深色变体 */
  --text-color: #2D3748;         /* 主文字颜色 */
  --text-light: #718096;         /* 次要文字颜色 */
  --bg-color: #FFFFFF;           /* 背景色 */
  --bg-alt: #FAFBFC;             /* 交替背景色 */
  /* 其他变量... */
}
```

### 修改字体

在 `index.html` 的 `<head>` 部分修改字体链接：

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font+Name:wght@400;500;600;700&display=swap" rel="stylesheet">
```

然后在 `css/style.css` 中修改 `body` 的 `font-family` 属性：

```css
body {
  font-family: 'Your Font Name', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
```

## 部署指南

### 1. GitHub Pages

1. 将代码上传到 GitHub 仓库
2. 进入仓库设置（Settings）
3. 找到 "Pages" 选项
4. 选择 "Deploy from a branch" 和 "main" 分支
5. 保存后，您的网站将在 `https://your-username.github.io/repository-name` 上线

### 2. Netlify

1. 注册 [Netlify](https://www.netlify.com/) 账户
2. 点击 "New site from Git"
3. 连接您的 GitHub 仓库
4. 构建设置保持默认（因为这是静态网站）
5. 点击 "Deploy site"
6. 您将获得一个 `https://random-name.netlify.app` 的临时域名

### 3. Vercel

1. 注册 [Vercel](https://vercel.com/) 账户
2. 点击 "New Project"
3. 导入您的 GitHub 仓库
4. 框架预设选择 "Other"
5. 点击 "Deploy"
6. 您将获得一个 `https://your-project-name.vercel.app` 的域名

### 4. 传统主机

1. 使用FTP客户端（如FileZilla）连接到您的主机
2. 将所有文件上传到主目录（通常是 `public_html` 或 `www`）
3. 访问您的域名

## 性能优化建议

1. **图片优化**
   - 使用 WebP 格式（如果浏览器支持）
   - 压缩图片大小
   - 为图片添加适当的 `alt` 属性

2. **代码优化**
   - 压缩 CSS 和 JavaScript 文件
   - 启用 Gzip 压缩（在服务器配置中）
   - 使用 CDN 加速资源加载

3. **缓存策略**
   - 设置适当的缓存头
   - 考虑使用 Service Worker 实现离线访问

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT License - 您可以自由使用、修改和分发此模板。

## 支持

如果您在使用过程中遇到问题，请：

1. 检查浏览器控制台是否有错误信息
2. 确保所有文件路径正确
3. 尝试在本地服务器环境中运行（而非直接打开HTML文件）

## 更新日志

### v1.0.0 (2025-11-18)
- 初始版本发布
- 基础功能实现
- 响应式设计
- 淡蓝色主题
- 添加石头剪刀布游戏项目
- 添加蔬食料理课管理系统项目
- 添加项目作者信息显示

---

**提示**: 这个网站设计为"开箱即用"，您只需替换文本和图片内容，即可在30分钟内完成个人网站的搭建和上线！