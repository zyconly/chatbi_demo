// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initTimelineNav();
    initCharts();
    initBackToTop();
    initScrollAnimations();
});

// 导航栏滚动效果
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时更新活动链接
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// 时间轴导航
function initTimelineNav() {
    const timelineBtns = document.querySelectorAll('.timeline-btn');
    const periodContents = document.querySelectorAll('.period-content');
    
    timelineBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            
            // 更新按钮状态
            timelineBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            periodContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === period) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// 初始化图表
function initCharts() {
    createOverviewChart();
    createAgeChart();
    createResidenceChart();
    createBeforeChart();
    createDuringChart();
    createAfterChart();
    createDistrictChart();
}

// 创建整体趋势图
function createOverviewChart() {
    const canvas = document.getElementById('overviewChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // 数据
    const data = {
        labels: ['节前14天', '节前7天', '除夕', '初三', '初七', '初八', '十二', '十五'],
        industrial: [100, 85, 20, 15, 18, 45, 82, 95],
        tech: [100, 88, 18, 12, 15, 52, 89, 98],
        finance: [100, 92, 22, 18, 20, 68, 95, 100]
    };
    
    // 绘制背景网格
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = 40 + (height - 80) * i / 5;
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
        
        // Y轴标签
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((100 - i * 20) + '%', 50, y + 4);
    }
    
    // X轴标签
    const xStep = (width - 80) / (data.labels.length - 1);
    data.labels.forEach((label, i) => {
        const x = 60 + i * xStep;
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, height - 10);
    });
    
    // 绘制折线
    drawLine(ctx, data.industrial, '#3b82f6', width, height, xStep);
    drawLine(ctx, data.tech, '#10b981', width, height, xStep);
    drawLine(ctx, data.finance, '#f59e0b', width, height, xStep);
}

// 绘制折线
function drawLine(ctx, dataPoints, color, width, height, xStep) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    dataPoints.forEach((value, i) => {
        const x = 60 + i * xStep;
        const y = 40 + (height - 80) * (100 - value) / 100;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // 绘制数据点
    dataPoints.forEach((value, i) => {
        const x = 60 + i * xStep;
        const y = 40 + (height - 80) * (100 - value) / 100;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

// 创建年龄结构图
function createAgeChart() {
    const canvas = document.getElementById('ageChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // 数据
    const data = [
        { label: '18-25岁', values: [15, 22, 18] },
        { label: '26-35岁', values: [38, 42, 35] },
        { label: '36-45岁', values: [32, 25, 30] },
        { label: '46-55岁', values: [12, 9, 14] },
        { label: '55岁以上', values: [3, 2, 3] }
    ];
    
    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
    const barWidth = 30;
    const groupWidth = barWidth * 3 + 20;
    const startX = 80;
    const maxValue = 50;
    
    // 绘制背景网格
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = 40 + (height - 80) * i / 5;
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
        
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((maxValue - i * 10) + '%', 50, y + 4);
    }
    
    // 绘制柱状图
    data.forEach((item, i) => {
        const groupX = startX + i * groupWidth;
        
        item.values.forEach((value, j) => {
            const x = groupX + j * (barWidth + 5);
            const barHeight = (height - 80) * value / maxValue;
            const y = height - 40 - barHeight;
            
            // 绘制柱子
            ctx.fillStyle = colors[j];
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // 绘制数值
            ctx.fillStyle = '#1f2937';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(value + '%', x + barWidth / 2, y - 5);
        });
        
        // X轴标签
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, groupX + groupWidth / 2 - 10, height - 10);
    });
    
    // 图例
    const legendY = 20;
    const legendItems = ['工业园区', '科技园区', '金融园区'];
    legendItems.forEach((item, i) => {
        const x = width - 280 + i * 90;
        ctx.fillStyle = colors[i];
        ctx.fillRect(x, legendY - 8, 16, 16);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item, x + 20, legendY + 4);
    });
}

// 创建居住地分布图
function createResidenceChart() {
    const canvas = document.getElementById('residenceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // 数据
    const data = [
        { label: '浦东新区', value: 28 },
        { label: '闵行区', value: 18 },
        { label: '嘉定区', value: 15 },
        { label: '松江区', value: 12 },
        { label: '奉贤区', value: 10 },
        { label: '其他', value: 17 }
    ];
    
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];
    const centerX = width / 3;
    const centerY = height / 2;
    const radius = Math.min(width / 3, height / 2) - 40;
    
    let startAngle = -Math.PI / 2;
    
    // 绘制饼图
    data.forEach((item, i) => {
        const sliceAngle = (item.value / 100) * Math.PI * 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        
        startAngle += sliceAngle;
    });
    
    // 绘制图例
    const legendX = width * 0.6;
    let legendY = 40;
    
    data.forEach((item, i) => {
        ctx.fillStyle = colors[i];
        ctx.fillRect(legendX, legendY, 16, 16);
        
        ctx.fillStyle = '#1f2937';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.label} ${item.value}%`, legendX + 24, legendY + 13);
        
        legendY += 30;
    });
}

// 创建节前趋势图
function createBeforeChart() {
    const canvas = document.getElementById('departureChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // 数据
    const data = {
        labels: ['腊月二十', '腊月二十二', '腊月二十四', '腊月二十六', '腊月二十八', '除夕'],
        industrial: [100, 92, 78, 58, 35, 20],
        tech: [100, 95, 85, 68, 45, 25],
        finance: [100, 97, 90, 78, 58, 35]
    };
    
    const xStep = (width - 80) / (data.labels.length - 1);
    
    // 绘制背景网格
    drawGrid(ctx, width, height);
    
    // X轴标签
    data.labels.forEach((label, i) => {
        const x = 60 + i * xStep;
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, height - 10);
    });
    
    // 绘制折线
    drawLine(ctx, data.industrial, '#3b82f6', width, height, xStep);
    drawLine(ctx, data.tech, '#10b981', width, height, xStep);
    drawLine(ctx, data.finance, '#f59e0b', width, height, xStep);
}

// 创建节中趋势图
function createDuringChart() {
    const canvas = document.getElementById('stayChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // 数据
    const data = {
        labels: ['除夕', '初一', '初二', '初三', '初四', '初五', '初六', '初七'],
        industrial: [18, 15, 14, 15, 16, 18, 20, 22],
        tech: [15, 12, 11, 12, 13, 15, 17, 19],
        finance: [12, 10, 9, 10, 11, 13, 15, 18]
    };
    
    const xStep = (width - 80) / (data.labels.length - 1);
    
    // 绘制背景网格
    drawGrid(ctx, width, height, 25);
    
    // X轴标签
    data.labels.forEach((label, i) => {
        const x = 60 + i * xStep;
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, height - 10);
    });
    
    // 绘制折线
    drawLine(ctx, data.industrial, '#3b82f6', width, height, xStep);
    drawLine(ctx, data.tech, '#10b981', width, height, xStep);
    drawLine(ctx, data.finance, '#f59e0b', width, height, xStep);
}

// 创建节后趋势图
function createAfterChart() {
    const canvas = document.getElementById('returnChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // 数据
    const data = {
        labels: ['初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五'],
        industrial: [45, 58, 68, 75, 82, 88, 92, 95],
        tech: [52, 65, 75, 82, 89, 93, 96, 98],
        finance: [68, 78, 85, 90, 95, 97, 99, 100]
    };
    
    const xStep = (width - 80) / (data.labels.length - 1);
    
    // 绘制背景网格
    drawGrid(ctx, width, height);
    
    // X轴标签
    data.labels.forEach((label, i) => {
        const x = 60 + i * xStep;
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, height - 10);
    });
    
    // 绘制折线
    drawLine(ctx, data.industrial, '#3b82f6', width, height, xStep);
    drawLine(ctx, data.tech, '#10b981', width, height, xStep);
    drawLine(ctx, data.finance, '#f59e0b', width, height, xStep);
}

// 绘制网格
function drawGrid(ctx, width, height, maxValue = 100) {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = 40 + (height - 80) * i / 5;
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
        
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((maxValue - i * maxValue / 5) + '%', 50, y + 4);
    }
}

function createDistrictChart() {
    const canvas = document.getElementById('districtChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    const data = {
        labels: ['浦东新区', '奉贤区', '崇明区', '徐汇区', '闵行区'],
        values: [89.2, 82.5, 85.3, 88.6, 86.2]
    };
    
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const barWidth = 50;
    const startX = 80;
    const maxValue = 100;
    const gap = (width - 160) / data.labels.length;
    
    drawGrid(ctx, width, height);
    
    data.values.forEach((value, i) => {
        const x = startX + i * gap;
        const barHeight = (height - 80) * value / maxValue;
        const y = height - 40 - barHeight;
        
        const gradient = ctx.createLinearGradient(x, y, x, height - 40);
        gradient.addColorStop(0, colors[i]);
        gradient.addColorStop(1, colors[i] + '80');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [6, 6, 0, 0]);
        ctx.fill();
        
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value + '%', x + barWidth / 2, y - 10);
        
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.fillText(data.labels[i], x + barWidth / 2, height - 10);
    });
}

// 返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.kpi-card, .feature-card, .insight-card, .district-card, .analysis-card, .insight-card-premium, .premium-table-row, .comparison-card-v2, .recovery-stat-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 窗口大小改变时重绘图表
window.addEventListener('resize', function() {
    // 延迟执行以避免频繁重绘
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(function() {
        initCharts();
    }, 250);
});