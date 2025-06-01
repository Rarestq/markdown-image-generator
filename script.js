document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const textInput = document.getElementById('text-input');
    const authorInput = document.getElementById('author-input');
    const fontSelect = document.getElementById('font-select');
    const fontSizeSlider = document.getElementById('font-size');
    const sizeValue = document.getElementById('size-value');
    const fontExample = document.getElementById('font-example');
    const textColor = document.getElementById('text-color');
    const previewText = document.getElementById('preview-text');
    const authorSignature = document.getElementById('author-signature');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const previewContent = document.getElementById('preview-content');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    // 获取所有样式选项和背景选项
    const styleOptions = document.querySelectorAll('.style-option');
    const bgOptions = document.querySelectorAll('.bg-option');
    
    // 当前样式状态
    let currentStyle = 'normal';
    let currentBg = bgOptions[0].style.background;
    
    // 初始化字数统计
    function updateCharCount() {
        const text = textInput.value;
        // 计算字符数（包括空格和标点）
        const count = text.replace(/\n/g, ' ').length;
        charCount.textContent = count;
        wordCount.textContent = `字数：${count}`;
    }
    
    // 更新Markdown预览
    function updateMarkdownPreview() {
        const markdownText = textInput.value;
        const htmlText = marked.parse(markdownText);
        previewText.innerHTML = htmlText;
    }
    
    // 初始化
    updateCharCount();
    updateMarkdownPreview();
    
    // 字体选择变化时更新示例
    fontSelect.addEventListener('change', function() {
        fontExample.style.fontFamily = this.value;
        updatePreview();
    });
    
    // 字体大小变化
    fontSizeSlider.addEventListener('input', function() {
        const size = this.value;
        sizeValue.textContent = `${size}px`;
        previewText.style.fontSize = `${size}px`;
    });
    
    // 文本输入变化时更新预览
    textInput.addEventListener('input', function() {
        updateMarkdownPreview();
        updateCharCount();
    });
    
    // 作者输入变化
    authorInput.addEventListener('input', function() {
        authorSignature.textContent = this.value || '@作者';
    });
    
    // 文字颜色变化
    textColor.addEventListener('input', function() {
        previewText.style.color = this.value;
    });
    
    // 样式选项点击事件
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有active类
            styleOptions.forEach(opt => opt.classList.remove('active'));
            // 添加active类到当前选项
            this.classList.add('active');
            currentStyle = this.dataset.style;
            applyTextStyle();
        });
    });
    
    // 背景选项点击事件
    bgOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有active类
            bgOptions.forEach(opt => opt.classList.remove('active'));
            // 添加active类到当前选项
            this.classList.add('active');
            currentBg = this.style.background;
            previewContent.style.background = currentBg;
        });
    });
    
    // 应用文本样式
    function applyTextStyle() {
        previewText.style.fontStyle = 'normal';
        previewText.style.fontWeight = 'normal';
        
        switch(currentStyle) {
            case 'italic':
                previewText.style.fontStyle = 'italic';
                break;
            case 'bold':
                previewText.style.fontWeight = '700';
                break;
        }
    }
    
    // 更新预览
    function updatePreview() {
        previewText.style.fontFamily = fontSelect.value;
        fontExample.style.fontFamily = fontSelect.value;
        applyTextStyle();
    }
    
    // 初始化
    function init() {
        fontExample.style.fontFamily = fontSelect.value;
        previewContent.style.background = currentBg;
        previewText.style.fontSize = `${fontSizeSlider.value}px`;
        updatePreview();
    }
    
    // 生成图片
    generateBtn.addEventListener('click', function() {
        updateMarkdownPreview();
        updatePreview();
        
        // 添加动画效果
        previewContent.style.transform = 'scale(0.95)';
        setTimeout(() => {
            previewContent.style.transform = 'scale(1)';
        }, 300);
        
        // 更新字数统计
        updateCharCount();
    });
    
    // 下载图片
    downloadBtn.addEventListener('click', function() {
        html2canvas(previewContent, {
            scale: 2,
            backgroundColor: null,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = '精美文本图片.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // 添加下载动画效果
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> 下载成功!';
            this.style.background = 'linear-gradient(to right, #00b09b, #96c93d)';
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = 'linear-gradient(to right, #00c9ff, #92fe9d)';
            }, 2000);
        });
    });
    
    // 初始化
    init();
});