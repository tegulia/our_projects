// 游戏状态
let playerScore = 0;
let computerScore = 0;
let isPlaying = false;

// DOM元素
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const playerChoiceElement = document.getElementById('player-choice');
const computerChoiceElement = document.getElementById('computer-choice');
const resultTextElement = document.getElementById('result-text');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetButton = document.getElementById('reset-btn');

// 选择图标映射
const choiceIcons = {
    rock: '✊',
    scissors: '✌️',
    paper: '✋'
};

// 选择名称映射
const choiceNames = {
    rock: '石头',
    scissors: '剪刀',
    paper: '布'
};

// 初始化游戏
function initGame() {
    // 添加事件监听器
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!isPlaying) {
                const playerChoice = button.getAttribute('data-choice');
                playGame(playerChoice);
            }
        });
    });

    resetButton.addEventListener('click', resetGame);
}

// 游戏主逻辑
function playGame(playerChoice) {
    isPlaying = true;
    
    // 重置结果显示
    resetResultDisplay();
    
    // 显示玩家选择
    displayChoice(playerChoiceElement, playerChoice, true);
    
    // 添加思考延迟，模拟电脑思考过程
    setTimeout(() => {
        // 获取电脑随机选择
        const computerChoice = getComputerChoice();
        
        // 显示电脑选择
        displayChoice(computerChoiceElement, computerChoice, false);
        
        // 判断胜负
        const result = determineWinner(playerChoice, computerChoice);
        
        // 更新分数和显示结果
        updateScore(result);
        displayResult(result, playerChoice, computerChoice);
        
        // 重置游戏状态
        isPlaying = false;
    }, 1000);
}

// 获取电脑随机选择
function getComputerChoice() {
    const choices = ['rock', 'scissors', 'paper'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// 显示选择
function displayChoice(element, choice, isPlayer) {
    const choiceIcon = element.querySelector('.choice-icon');
    choiceIcon.textContent = choiceIcons[choice];
    
    // 添加动画效果
    element.classList.add('show-choice');
    
    // 如果是玩家选择，添加额外效果
    if (isPlayer) {
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }
}

// 判断胜负
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        return 'win';
    }
    
    return 'lose';
}

// 更新分数
function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
        
        // 添加分数动画
        playerScoreElement.parentElement.classList.add('winner');
        setTimeout(() => {
            playerScoreElement.parentElement.classList.remove('winner');
        }, 1000);
    } else if (result === 'lose') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
        
        // 添加分数动画
        computerScoreElement.parentElement.classList.add('winner');
        setTimeout(() => {
            computerScoreElement.parentElement.classList.remove('winner');
        }, 1000);
    }
}

// 显示结果
function displayResult(result, playerChoice, computerChoice) {
    // 清除之前的结果类
    resultTextElement.classList.remove('win', 'lose', 'draw');
    
    let resultMessage = '';
    
    if (result === 'win') {
        resultMessage = `你赢了！${choiceNames[playerChoice]}战胜了${choiceNames[computerChoice]}`;
        resultTextElement.classList.add('win');
        playerChoiceElement.classList.add('winner');
        computerChoiceElement.classList.add('loser');
    } else if (result === 'lose') {
        resultMessage = `你输了！${choiceNames[computerChoice]}战胜了${choiceNames[playerChoice]}`;
        resultTextElement.classList.add('lose');
        playerChoiceElement.classList.add('loser');
        computerChoiceElement.classList.add('winner');
    } else {
        resultMessage = `平局！你们都选择了${choiceNames[playerChoice]}`;
        resultTextElement.classList.add('draw');
    }
    
    resultTextElement.textContent = resultMessage;
    
    // 清除动画类
    setTimeout(() => {
        playerChoiceElement.classList.remove('winner', 'loser');
        computerChoiceElement.classList.remove('winner', 'loser');
    }, 2000);
}

// 重置结果显示
function resetResultDisplay() {
    playerChoiceElement.classList.remove('show-choice', 'winner', 'loser');
    computerChoiceElement.classList.remove('show-choice', 'winner', 'loser');
    resultTextElement.classList.remove('win', 'lose', 'draw');
    resultTextElement.textContent = '电脑正在思考...';
}

// 重置游戏
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    
    playerChoiceElement.querySelector('.choice-icon').textContent = '?';
    computerChoiceElement.querySelector('.choice-icon').textContent = '?';
    
    playerChoiceElement.classList.remove('show-choice', 'winner', 'loser');
    computerChoiceElement.classList.remove('show-choice', 'winner', 'loser');
    
    resultTextElement.classList.remove('win', 'lose', 'draw');
    resultTextElement.textContent = '请选择你的出拳';
    
    isPlaying = false;
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', initGame);