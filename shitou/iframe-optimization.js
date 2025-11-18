// 游戏嵌入环境优化代码
// 确保游戏在iframe中正常工作，并防止全局变量污染

(function() {
    // 检查是否在iframe中运行
    const isInIframe = window.self !== window.top;
    
    // 如果在iframe中，进行特殊处理
    if (isInIframe) {
        // 向父窗口发送游戏开始消息
        function notifyParent(event, data) {
            try {
                window.parent.postMessage({
                    source: 'rock-paper-scissors-game',
                    event: event,
                    data: data || {}
                }, '*');
            } catch (e) {
                console.error('无法向父窗口发送消息:', e);
            }
        }
        
        // 监听来自父窗口的消息
        window.addEventListener('message', function(event) {
            // 验证消息来源
            if (event.data && event.data.target === 'rock-paper-scissors-game') {
                switch (event.data.action) {
                    case 'reset':
                        // 如果父窗口要求重置游戏
                        if (typeof resetGame === 'function') {
                            resetGame();
                        }
                        break;
                    case 'focus':
                        // 如果父窗口要求聚焦游戏
                        document.body.focus();
                        break;
                }
            }
        });
        
        // 重写原始游戏函数，添加消息通知
        const originalPlayGame = window.playGame;
        window.playGame = function(playerChoice) {
            // 调用原始函数
            if (typeof originalPlayGame === 'function') {
                originalPlayGame(playerChoice);
            }
            
            // 通知父窗口游戏已开始
            notifyParent('gameStarted', { playerChoice });
        };
        
        // 重写重置函数
        const originalResetGame = window.resetGame;
        window.resetGame = function() {
            // 调用原始函数
            if (typeof originalResetGame === 'function') {
                originalResetGame();
            }
            
            // 通知父窗口游戏已重置
            notifyParent('gameReset');
        };
        
        // 游戏初始化完成后通知父窗口
        document.addEventListener('DOMContentLoaded', function() {
            // 等待一小段时间确保游戏完全初始化
            setTimeout(() => {
                notifyParent('gameLoaded');
            }, 500);
        });
        
        // 防止游戏中的链接在iframe内打开
        document.addEventListener('click', function(e) {
            const target = e.target.closest('a');
            if (target && target.href) {
                // 通知父窗口处理链接点击
                notifyParent('linkClicked', { url: target.href });
                e.preventDefault();
                return false;
            }
        });
        
        // 调整游戏高度以适应内容
        function adjustGameHeight() {
            const gameHeight = document.body.scrollHeight;
            notifyParent('heightChanged', { height: gameHeight });
        }
        
        // 监听可能导致高度变化的事件
        window.addEventListener('resize', adjustGameHeight);
        
        // 创建一个MutationObserver来监听DOM变化
        const observer = new MutationObserver(function(mutations) {
            let shouldAdjust = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldAdjust = true;
                }
            });
            
            if (shouldAdjust) {
                setTimeout(adjustGameHeight, 100);
            }
        });
        
        // 开始观察
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // 初始调整高度
        setTimeout(adjustGameHeight, 1000);
    }
})();