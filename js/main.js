// DOM元素
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const startGameBtn = document.getElementById('start-game-btn');
const gameCover = document.getElementById('game-cover');
const gameIframeContainer = document.getElementById('game-iframe-container');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化导航栏
    initNavigation();
    
    // 初始化表单处理
    initContactForm();
    
    // 初始化滚动时的导航栏样式
    initNavbarScroll();
    
    // 初始化游戏展示功能
    initGameDisplay();
});

// 导航栏功能
function initNavigation() {
    // 汉堡菜单切换
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的活动状态
            this.classList.add('active');
            
            // 关闭移动端菜单
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // 平滑滚动到目标部分
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考虑固定导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动时的导航栏样式
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        // 更新活动导航链接
        updateActiveNavLink();
    });
}

// 更新活动导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// 滚动动画
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // 使用Intersection Observer API
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 添加延迟效果，使元素依次出现
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        });
    }, {
        threshold: 0.1, // 当元素10%可见时触发
        rootMargin: '0px 0px -50px 0px' // 提前触发动画
    });
    
    // 为每个元素设置延迟
    fadeElements.forEach((element, index) => {
        // 根据元素类型设置不同的延迟
        if (element.classList.contains('section-title')) {
            element.dataset.delay = 0;
        } else if (element.parentElement.classList.contains('about-text')) {
            element.dataset.delay = index * 100;
        } else if (element.parentElement.classList.contains('project-card')) {
            element.dataset.delay = index * 100;
        } else if (element.parentElement.classList.contains('contact-form-container') || 
                   element.parentElement.classList.contains('contact-info')) {
            element.dataset.delay = index * 100;
        } else {
            element.dataset.delay = index * 50;
        }
        
        observer.observe(element);
    });
}

// 联系表单处理
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // 简单的表单验证
        if (!name || !email || !message) {
            showFormMessage('请填写所有必填字段', 'error');
            return;
        }
        
        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('请输入有效的邮箱地址', 'error');
            return;
        }
        
        // 模拟表单提交（实际应用中应使用真实的表单提交服务）
        simulateFormSubmission({ name, email, message });
    });
}

// 显示表单消息
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // 5秒后自动隐藏消息
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// 模拟表单提交
function simulateFormSubmission(data) {
    // 显示加载状态
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = '发送中...';
    submitButton.disabled = true;
    
    // 模拟网络请求延迟
    setTimeout(() => {
        // 重置按钮状态
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // 显示成功消息
        showFormMessage('感谢您的消息！我会尽快回复您。', 'success');
        
        // 重置表单
        contactForm.reset();
        
        // 在实际应用中，这里应该是真实的API调用，例如：
        // fetch('https://formspree.io/f/your-form-id', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showFormMessage('感谢您的消息！我会尽快回复您。', 'success');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showFormMessage('发送失败，请稍后再试', 'error');
        // })
        // .finally(() => {
        //     submitButton.textContent = originalText;
        //     submitButton.disabled = false;
        // });
    }, 1500);
}

// 项目图片灯箱效果（可选功能）
function initLightbox() {
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;
            
            // 添加灯箱样式
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                width: 100%;
                height: auto;
                display: block;
            `;
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
            `;
            
            document.body.appendChild(lightbox);
            
            // 淡入效果
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // 关闭灯箱
            function closeLightbox() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            }
            
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // ESC键关闭
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
    });
}

// 页面加载完成后初始化灯箱
window.addEventListener('load', function() {
    initLightbox();
});

// 游戏展示功能
function initGameDisplay() {
    if (!startGameBtn || !gameCover || !gameIframeContainer) return;
    
    // 点击开始游戏按钮
    startGameBtn.addEventListener('click', function() {
        // 隐藏游戏封面
        gameCover.classList.add('hidden');
        
        // 显示游戏iframe
        gameIframeContainer.classList.add('visible');
        
        // 聚焦到游戏iframe
        setTimeout(() => {
            const gameIframe = document.getElementById('game-iframe');
            if (gameIframe) {
                gameIframe.focus();
            }
        }, 500);
    });
    
    // 监听游戏iframe加载完成事件
    const gameIframe = document.getElementById('game-iframe');
    if (gameIframe) {
        gameIframe.addEventListener('load', function() {
            // 可以在这里添加游戏加载完成后的处理逻辑
            console.log('游戏已加载完成');
        });
    }
}