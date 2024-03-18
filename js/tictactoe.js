// !TIC-TAC-TOE
// Потрібно створити гру хрестики-нулики.
// 1) Відмалюй розмітку ігрового поля для контейнера з класом "content", для кожної клітинки застосуй клас "item"
// 2) Реалізуй делегування подій на ігровому полі для можливості ходу.
// 3) Скріпт має самостійно визначити переможця гри та виводити модальне вікно з переможцем (х / о).
// 4) Для історії ходів наших гравців (х/о) потрібно, щоб кожна клітинка ігрового поля містила дата атрибут id.
// 5) Створи скріпт для перевірки виграшної комбінації, список всіх можливих виграшних комбінації знаходиться в масиви "combinations".
// 6) Для виводу модального вікна застосуй бібліотеку basicLightbox.
// 7) Після визнчення переможця обов'язково підготуй ігрове поле для наступної гри.

const combinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
  [3, 6, 9],
];

const contentContainer = document.querySelector('.content');
let element = '';
let player = 'X';
let playerX = [];
let playerO = [];
let instance;

contentContainer.addEventListener('click', onClick);

function createMarkup() {
  for (let i = 1; i <= 9; i += 1) {
    element += `<div class="item" data-id=${i}></div>`;
  }
  contentContainer.insertAdjacentHTML('beforeend', element);
}
createMarkup();

function onClick(event) {
  if (!event.target.classList.contains('item') || event.target.textContent) {
    return;
  }
  event.target.textContent = player;

  resultCheck();

  player === 'X' ? (player = 'O') : (player = 'X');
}

function resultCheck() {
  let gameWinner = false;
  if (player === 'X') {
    playerX.push(Number(event.target.dataset.id));
    gameWinner = playerX.length >= 3 && winningCombinationSelect(playerX);
  } else {
    playerO.push(Number(event.target.dataset.id));
    gameWinner = playerO.length >= 3 && winningCombinationSelect(playerO);
  }

  if (gameWinner) {
    instance = basicLightbox.create(
      `<p class="gamewinner-text">Winner<br><span class="accent">Player ${player}</span></p>`,
      {
        onShow: instance => {
          window.addEventListener('keydown', onEscPress);
        },
        onClose: instance => {
          window.removeEventListener('keydown', onEscPress);
          resetGame();
        },
      }
    );
    instance.show();
  }
  // draw
  if (playerX.length + playerO.length === 9 && !gameWinner) {
    instance = basicLightbox.create(
      `<p class="draw-text">DRAW<br><span class="accent">LOOSERS</span><br>😂</p>`,
      {
        onShow: instance => {
          window.addEventListener('keydown', onEscPress);
        },
        onClose: instance => {
          window.removeEventListener('keydown', onEscPress);
          resetGame();
        },
      }
    );
    instance.show();
  }
}

function winningCombinationSelect(arr) {
  return combinations.some(element => element.every(id => arr.includes(id)));
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    console.log(event);
    instance.close();
  }
}

function resetGame() {
  const cellEl = document.querySelectorAll('div.item');
  cellEl.forEach(element => (element.textContent = ''));
  playerX = [];
  playerO = [];
  player = 'X';
}
