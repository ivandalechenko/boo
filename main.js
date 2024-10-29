import './style.scss'

let mouseX = 0;
let mouseY = 0;
let flashlight = document.getElementById("flashlight");

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

function getMousePosition(e) {
  mouseX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  mouseY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
}

function applyShake() {
  // Определяем случайное смещение для эффекта тряски
  const shakeX = (Math.random() - 0.5) * 4; // смещение по X (-2px до +2px)
  const shakeY = (Math.random() - 0.5) * 4; // смещение по Y (-2px до +2px)

  // Применяем преобразование с учётом тряски
  flashlight.style.transform = `translate(${mouseX - window.innerWidth / 2 + shakeX}px, ${mouseY - window.innerHeight / 2 + shakeY}px)`;

  // Повторяем с небольшой задержкой для постоянного эффекта тряски
  requestAnimationFrame(applyShake);
}

// Настраиваем обработчики событий в зависимости от устройства
if (isTouchDevice()) {
  // На мобильных устройствах обновляем позицию только при начальном касании
  document.addEventListener("touchstart", getMousePosition);
} else {
  // На компьютере продолжаем отслеживать движение мыши
  document.addEventListener("mousemove", getMousePosition);
}

// Запускаем функцию с эффектом тряски
applyShake();




const blinker = document.getElementById('flashlight_blinker');

function blinkFlashlight() {
  blinker.style.opacity = Math.random() / 3;
  setTimeout(blinkFlashlight, Math.random() * 500);
}

blinkFlashlight();



const hero = document.getElementById('hero');
const cave = document.getElementById('cave');
const htb = document.getElementById('htb');
const chest = document.getElementById('chest');

// Добавляем слушатель для движения мыши
document.addEventListener('mousemove', (e) => {
  // Получаем позицию курсора как процентное смещение по оси X и Y
  const offsetX = (e.clientX / window.innerWidth - 0.5) * 10; // до 10% по горизонтали
  const offsetY = (e.clientY / window.innerHeight - 0.5) * 10; // до 10% по вертикали

  // Применяем смещение к фону
  hero.style.backgroundPosition = `${50 + offsetX}% ${50 + offsetY}%`;
  cave.style.backgroundPosition = `${50 + offsetX}% ${50 + offsetY}%`;
  htb.style.backgroundPosition = `${50 + offsetX}% ${50 + offsetY}%`;
  chest.style.backgroundPosition = `${50 + offsetX}% ${50 + offsetY}%`;
});



// Получаем элементы
const audio = document.getElementById('backgroundAudio');
const soundImg = document.getElementById('soundImg');

let isFirstPlayAttempt = true;  // Флаг, указывающий на первый запуск
let isPlaying = false;          // Состояние музыки

// Функция для плавного увеличения громкости
function fadeInAudio() {
  audio.volume = 0;  // Устанавливаем начальную громкость
  audio.play();
  soundImg.src = '/img/music.svg';

  let volumeIncrease = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(audio.volume + 0.05, 1);  // Увеличиваем громкость
    } else {
      clearInterval(volumeIncrease);  // Останавливаем увеличение при достижении полной громкости
    }
  }, 200);  // Интервал плавного повышения громкости
}

// Обработчик первого клика в любом месте документа для запуска музыки
function startMusicOnFirstClick() {
  if (isFirstPlayAttempt) {
    isFirstPlayAttempt = false;  // Сбрасываем флаг, чтобы сработал только один раз
    fadeInAudio();
    isPlaying = true;
    document.removeEventListener('click', startMusicOnFirstClick);  // Удаляем обработчик
  }
}

// Попытка автоматического запуска при загрузке страницы
window.addEventListener('load', () => {
  audio.play().then(() => {
    isPlaying = true;  // Если музыка запустилась, обновляем состояние
  }).catch(() => {
    console.log("Автозапуск заблокирован. Ожидаем взаимодействия.");
    document.addEventListener('click', startMusicOnFirstClick);  // Добавляем обработчик для первого клика
  });
});

// Переключение паузы и воспроизведения по нажатию на soundImg
soundImg.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    soundImg.src = '/img/noMusic.svg';
  } else {
    if (isFirstPlayAttempt) {
      fadeInAudio();
      isFirstPlayAttempt = false;
    } else {
      audio.play();
      soundImg.src = '/img/music.svg';
    }
    isPlaying = true;
  }
});