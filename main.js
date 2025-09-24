const translation = {
    en:{
        title: "Ruby's Playground",
        rps: "Rock Paper Scissors",
        rock: "Rock",
        paper: "Paper",
        scissors: "Scissors",
        chase: "Mouse Chase",
        evil: "Evil Monkey",
        choice: "Please choose",
        win: "You Win! 🎉",
        lose: "You Lose! 😢",
        tie: "It's a Tie! 😐",
        life: "Life:",
        count: "Count:",
        time: "Time:",
        
        execute: "This monkey embezzled my bananas to my rival, this is your target: ",
        rpsExpl: 
        "Classic rock paper scissors. Rock beats scissors, paper beats rock, scissors beat paper <br> 📄>🪨>✂️<br>🪨>✂️>📄<br>✂️>📄>🪨<br></br>",
        chaseExpl: 
        "You are a hungry mouse trying to catch a cat for dinner. The mouse will zoom around in the grassy area, your job is to catch it as many times as possible within given time. <br>Counts as victory if you catch the mouse three times within the time limit. 🐁🐁🐁",
        evilExpl: "The game will randomly choose between eyes, ears, mouth and will generate monkeys. You will have to eliminate the monkeys with the given attributes (eyes=🙈, ears=🙉, mouth=🙊) <br> You have 30 seconds and 3 lives, try not to eliminate innocent monkeys, you monster.",
    },
    mn: {
        title:"Бадмаарагийн Тоглоомын Талбай",
        rps: "Хайч Чулуу Даавуу",
        rock: "Чулуу",
        paper: "Даавуу",
        scissors: "Хайч",
        chase: "Муур Хулгана",
        evil: "Нүд, чих, ам",
        choice: "Сонголтоо хийнэ үү",
        win: "Та яллаа! 🎉",
        lose: "Та хожигдлоо! 😢",
        tie: "Тэнцлээ! 😐",
        life: "Амь:",
        count: "Тоо:",
        time: "Хугацаа:",
        execute: "Устгах сармагчин: ",
        rpsExpl: 
        "Энгийн хайч чулуу даавуу. Чулуу хайчийг дийлнэ, даавуу чулууг дийлнэ, хайч даавууг дийлнэ <br> 📄>🪨>✂️<br>🪨>✂️>📄<br>✂️>📄>🪨<br></br>",
        chaseExpl: 
        "Та бол хулгана барих гэж буй өлсгөлөн муур. Хулгана өвсөн дээгүүр гялалзтал гүйнэ, өгөгдсөн хугацаанд аль болох олон удаа түүнийг барих. <br>Цаг дуусахаас өмнө гурван хулгана барьж чадвал хожино. 🐁🐁🐁",
        evilExpl: "Нүд, чих, ам аль нэг сонгогдож, сармагчин хэвлэгдэнэ. Сонгогдсон сармагчинг устгана (нүд=🙈, чих=🙉, ам=🙊) <br> 3 амьтай байх ба 30 секундэд гүйцэтгэнэ.",
    
    }
};
//feti
function endLose(){
    const duration = 2 * 1000,
    animationEnd = Date.now() + duration;

    let skew = 1;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
    const timeLeft = animationEnd - Date.now(),
        ticks = Math.max(200, 500 * (timeLeft / duration));

    skew = Math.max(0.8, skew - 0.001);

    confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
        },
        colors: ["#008cff5b"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
        requestAnimationFrame(frame);
    }
    })();
}

// // const language = document.getElementById('language');
// language.addEventListener('change', ()=>{
//     const currentlang = language.value;
//     document.querySelectorAll('[data-key]').forEach(el => {
//         const key = el.getAttribute('data-key');
//         if(translation[currentlang][key]){
//             el.textContent = translation[currentlang][key];
//         }
//     })
// });
// // language.value = localStorage.getItem('lang') || 'en';
// language.dispatchEvent(new Event('change'));
// language.addEventListener('change', () => {
//     const currentlang = language.value;
//     localStorage.setItem('lang', currentlang);
// });

const language = document.getElementById('language');
language.value = localStorage.getItem('lang') || 'en';

function updateLanguage(lang) {
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translation[lang][key]) {
      el.innerHTML = translation[lang][key];
    }
  });
  localStorage.setItem('lang', lang);
}

updateLanguage(language.value);
language.addEventListener('change', () => {
  updateLanguage(language.value);
});

//rps

function gameRps(){
    const userCard = document.querySelectorAll('.userCard');
    const compCard = document.querySelectorAll('.compCard');
    const resultTxt = document.getElementById('rpsResult');
    const currentLang = language.value || 'en';
    const moves = ['rock', 'paper', 'scissors'];
    const emojis = {
        rock: '🪨',
        paper: '📄',
        scissors: '✂️'
    };
    userCard.forEach(card => {
    card.addEventListener('click', () => {
        const userMove = card.dataset.move;
        compCard.forEach(c => c.textContent = '❓');
        let count = 0;
        const shuffle = setInterval(() => {
            compCard.forEach(c => {
                const randomMove = moves[Math.floor(Math.random() * 3)];
                c.textContent = emojis[randomMove];
            });
            count++;
            if (count > 3) {
                clearInterval(shuffle);
                const compMove = moves[Math.floor(Math.random() * 3)];
                compCard.forEach(c => c.textContent = '❓'); // clean
                const randomCard = compCard[Math.floor(Math.random() * compCard.length)];
                randomCard.textContent = emojis[compMove];

                let result = '';
                if (userMove === compMove) {
                    result = translation[currentLang].tie;
                } else if (
                    (userMove === 'rock' && compMove === 'scissors') ||
                    (userMove === 'paper' && compMove === 'rock') ||
                    (userMove === 'scissors' && compMove === 'paper')
                ) {
                    result = translation[currentLang].win;
                    confetti({
                        particleCount: 200,
                        spread: 120,
                        origin: { x: 0, y: 0.7 },
                    });
                    confetti({
                        particleCount: 200,
                        spread: 120,
                        origin: { x: 1, y: 0.7 },
                    });
                } else {
                    result = translation[currentLang].lose;
                }

            resultTxt.textContent = result;
            }
        }, 150);
    });
  });
    
}

//mouse chase

function gameChase(){
    const mouse = document.getElementById('mouse');
    const grass = document.getElementById('grass');
    const count = document.getElementById('count');
    const life = document.getElementById('life');
    const time = document.getElementById('time');
    const resultTxt = document.getElementById('chaseResult')
    const currentLang = language.value || 'en';

    let lives = 3;
    let caught = 0;
    let timeLeft = 30;
    let gameOver = false;

    count.textContent = caught;
    life.textContent = lives;
    time.textContent = timeLeft;

    function moveMouse(){
        if(gameOver) return;
        const max = 400-108; // x& y same, so taking same values at max x & y
        const x = Math.floor(Math.random()*max);
        const y = Math.floor(Math.random()*max);
        mouse.style.left = x + 'px';
        mouse.style.top = y + 'px';
    }
    const moveInterval = setInterval(moveMouse, 760);

    mouse.addEventListener('click', (e)=>{
        e.stopPropagation();
        if (gameOver) return;
        caught++;
        count.textContent = caught;
    })
    grass.addEventListener('click', (e) =>{
        if (gameOver) return;
        if(e.target.id !== 'mouse'){
            lives--;    
            life.textContent = lives;
            if(lives===0){
                if (caught>=3){
                    endGame(true);
                }else{
                    endGame(false)
                }
            }
        }
    });

    const timer = setInterval(() =>{
        if (gameOver) return;
        timeLeft--;
        time.textContent = timeLeft;
        if (timeLeft <= 0 ){
            endGame(caught >= 3)
                
        }
        resultTxt.textContent = result 
    }, 1000);

    function endGame(won){
        gameOver = true;
        clearInterval(timer);
        clearInterval(moveInterval);
        if(won){
            resultTxt.textContent = translation[currentLang].win
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { x: 0, y: 0.7 },
            });
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { x: 1, y: 0.7 },
            });
        }else{
            resultTxt.textContent = translation[currentLang].lose
        }
    }
    
}

//evil monke

function gameEvil(){
    const canvas = document.getElementById('canvas');
    const count = document.getElementById("ecount");
    const life = document.getElementById('elife');
    const time = document.getElementById('etime');
    const resultTxt = document.getElementById('evilResult')

    const currentLang = language.value || 'en';
    canvas.innerHTML = '';  
    const emojis = {
        ear: '🙉',
        eye: '🙈',
        mouth: '🙊',
    };
    let lives = 3;
    let caught = 0;
    let timeLeft = 30;
    let gameOver = false;

    const keys = Object.keys(emojis);
    const evilValue = keys[Math.floor(Math.random()*3)];
    const cols = 10;
    const space = 40;
    const size = 30;
    const mX = 10;  // margin
    const mY = 10;
    let evilCount = 0;

    count.textContent = caught; 
    time.textContent = timeLeft;
    life.textContent = lives;
    resultTxt.textContent = translation[currentLang].execute + evilValue.toUpperCase() + ' ' + emojis[evilValue];
    for(let i=0; i<36; i++){
        let evil = keys[Math.floor(Math.random()*3)];
        let monkey = document.createElement('div');
        let placeHolder = document.createElement('div');

        monkey.textContent = emojis[evil];
        monkey.classList.add('col-2', 'text-center');
        monkey.style.fontSize = '2.5rem';
        monkey.style.cursor = 'pointer';

        placeHolder.textContent = ' ';
        placeHolder.classList.add('col-2', 'text-center');
        placeHolder.style.fontSize = '2.5rem';
        placeHolder.style.backgroundColor = 'rgb(255, 0, 0, 0.5)';

        const row = Math.floor(i / cols);
        const col = i % cols;

        monkey.style.left = (col * (size + space) + mX) + 'px';
        monkey.style.top = (row * (size + space) + mY) + 'px';
        

        monkey.dataset.type = evil;
        if(evil === evilValue) {
            evilCount++;
            placeHolder.style.backgroundColor = 'rgb(255, 198, 166, 0.5)';
        }

        monkey.addEventListener('click', function() {
            if (gameOver) return;
            if (monkey.dataset.type === evilValue) {
                caught++;
                evilCount--;
                count.textContent = caught;
                // monkey.remove();
                canvas.replaceChild(placeHolder, monkey);
                if(evilCount === 0){
                    endGame(true);
                }
            } else {
                lives--;
                life.textContent = lives;
                canvas.replaceChild(placeHolder, monkey);
                // monkey.remove();
                if (lives === 0) {
                
                    endGame(false);
                }
            }
        });

    canvas.appendChild(monkey);
    }
    const timer = setInterval(() =>{
        if (gameOver) return;
        timeLeft--;
        time.textContent = timeLeft;
        if (timeLeft === 0) {
            endGame(evilCount === 0);
        }
    }, 1000);

    function endGame(won) {
        gameOver = true;
        clearInterval(timer);
        canvas.innerHTML = '';
        if (won) {
            resultTxt.textContent = translation[currentLang].win;
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { x: 0, y: 0.7 },
            });
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { x: 1, y: 0.7 },
            });
        } else {
            resultTxt.textContent = translation[currentLang].lose;
        }
    }

}

if (document.getElementById('mouse')) {
    gameChase();
}

if (document.getElementById('canvas')) {
    gameEvil();
}

if (document.querySelector('.userCard')) {
    gameRps();
}

