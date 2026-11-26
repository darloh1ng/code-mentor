import { styles } from './styles.js';

const trigger = document.createElement('div');
trigger.id = 'cm-trigger';
document.body.appendChild(trigger);

const styleTag = document.createElement('style');
styleTag.textContent = styles;
document.head.appendChild(styleTag);

const drawer = document.createElement('aside');
drawer.id = 'cm-drawer';
drawer.innerHTML = /*html*/ `
  <div class="cm-edge-handle" title="Кликнуть или потянуть вправо, чтобы закрыть"></div>
  <header class="cm-header">
    <span class="cm-title">Code Mentor</span>
  </header>

  <div class="cm-workspace">
    <section class="cm-note">
      <div class="cm-note-head">
        <span class="cm-note-label">Конспект</span>
        <button class="cm-copy-btn" type="button" title="Скопировать в Obsidian">Copy</button>
      </div>
      <div class="cm-note-content" contenteditable="true" spellcheck="false">Здесь появится твой конспект...</div>
    </section>

    <div class="cm-resizer" title="Тянуть — изменить размер • Двойной клик — сбросить"></div>
    <div class="cm-default-tick"></div>

    <main class="cm-body"></main>
  </div>

  <footer class="cm-footer">
    <label class="cm-composer">
      <textarea class="cm-input" rows="1" placeholder="Спросить Code Mentor"></textarea>
      <button class="cm-send" type="button" title="Отправить">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M12.5 4.5V8.5C12.5 9.6 11.6 10.5 10.5 10.5H3.5M3.5 10.5L6.5 7.5M3.5 10.5L6.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </label>
  </footer>
`;
document.body.appendChild(drawer);

const edgeHandle = drawer.querySelector('.cm-edge-handle');
const header = drawer.querySelector('.cm-header');
const workspace = drawer.querySelector('.cm-workspace');
const noteSection = drawer.querySelector('.cm-note');
const resizer = drawer.querySelector('.cm-resizer');
const defaultTick = drawer.querySelector('.cm-default-tick');
const noteContent = drawer.querySelector('.cm-note-content');
const copyBtn = drawer.querySelector('.cm-copy-btn');
const body = drawer.querySelector('.cm-body');
const composer = drawer.querySelector('.cm-composer');
const input = drawer.querySelector('.cm-input');
const sendBtn = drawer.querySelector('.cm-send');

let closeMorphTimer = null;

const setDrawerOpen = (isOpen) => {
  clearTimeout(closeMorphTimer);
  drawer.style.transform = '';

  if (isOpen) {
    drawer.classList.remove('is-closing');
    drawer.classList.add('open');
    trigger.classList.add('is-hidden');
  } else {
    drawer.classList.add('is-closing');
    drawer.classList.remove('open');
    closeMorphTimer = setTimeout(() => {
      trigger.classList.remove('is-hidden');
      drawer.classList.remove('is-closing');
    }, 320);
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) {
    setDrawerOpen(false);
  }
});

let swipeStartX = 0;
let swipeStartTime = 0;
let currentDeltaX = 0;
let isSwiping = false;
let wasOpenAtStart = false;
let hasMoved = false;

const startSwipe = (e) => {
  if (e.button !== 0) return;
  isSwiping = true;
  hasMoved = false;
  wasOpenAtStart = drawer.classList.contains('open');
  swipeStartX = e.clientX;
  swipeStartTime = performance.now();
  currentDeltaX = 0;
  drawer.classList.add('is-swiping');
  e.currentTarget.setPointerCapture(e.pointerId);
  document.body.style.userSelect = 'none';
};

const moveSwipe = (e) => {
  if (!isSwiping) return;
  currentDeltaX = e.clientX - swipeStartX;
  if (Math.abs(currentDeltaX) > 4) hasMoved = true;

  if (wasOpenAtStart) {
    const offset = Math.max(0, currentDeltaX);
    drawer.style.transform = `translateX(${offset}px)`;
  } else {
    const closedOffset = drawer.offsetWidth + 24;
    const offset = Math.min(closedOffset, Math.max(0, closedOffset + currentDeltaX));
    drawer.style.transform = `translateX(${offset}px)`;
  }
};

const endSwipe = (e) => {
  if (!isSwiping) return;
  isSwiping = false;
  drawer.classList.remove('is-swiping');
  document.body.style.userSelect = '';

  if (!hasMoved && (e.currentTarget === trigger || e.currentTarget === edgeHandle)) {
    setDrawerOpen(!wasOpenAtStart);
    return;
  }

  const elapsed = Math.max(1, performance.now() - swipeStartTime);
  const distance = Math.abs(currentDeltaX);
  const velocity = distance / elapsed;
  const isFling = velocity > 0.45 && distance > 28;
  const isFarEnough = distance > drawer.offsetWidth * 0.28;

  if (wasOpenAtStart) {
    const closing = currentDeltaX > 0 && (isFling || isFarEnough);
    setDrawerOpen(!closing);
  } else {
    const opening = currentDeltaX < 0 && (isFling || isFarEnough);
    setDrawerOpen(opening);
  }
};

[trigger, edgeHandle, header].forEach((zone) => {
  zone.addEventListener('pointerdown', startSwipe);
  zone.addEventListener('pointermove', moveSwipe);
  zone.addEventListener('pointerup', endSwipe);
  zone.addEventListener('pointercancel', endSwipe);
});

const DEFAULT_RATIO = 65;
let isResizing = false;
let wasSnapped = true;

resizer.addEventListener('pointerdown', (e) => {
  isResizing = true;
  resizer.classList.add('is-dragging');
  workspace.classList.add('is-dragging');
  resizer.setPointerCapture(e.pointerId);
  document.body.style.userSelect = 'none';
});

resizer.addEventListener('pointermove', (e) => {
  if (!isResizing) return;
  const rect = workspace.getBoundingClientRect();
  let percent = ((e.clientY - rect.top) / rect.height) * 100;
  percent = Math.min(Math.max(percent, 20), 85);

  const isNearDefault = Math.abs(percent - DEFAULT_RATIO) <= 2.5;

  if (isNearDefault) {
    percent = DEFAULT_RATIO;
    resizer.classList.add('is-snapped');
    if (!wasSnapped) {
      defaultTick.classList.add('is-snapped');
      setTimeout(() => defaultTick.classList.remove('is-snapped'), 350);
      wasSnapped = true;
    }
  } else {
    resizer.classList.remove('is-snapped');
    wasSnapped = false;
  }

  noteSection.style.height = percent + '%';
  body.scrollTop = body.scrollHeight;
});

const stopResize = () => {
  if (!isResizing) return;
  isResizing = false;
  resizer.classList.remove('is-dragging', 'is-snapped');
  workspace.classList.remove('is-dragging');
  document.body.style.userSelect = '';
};

resizer.addEventListener('pointerup', stopResize);
resizer.addEventListener('pointercancel', stopResize);

resizer.addEventListener('dblclick', () => {
  noteSection.style.height = DEFAULT_RATIO + '%';
  body.scrollTop = body.scrollHeight;
  defaultTick.classList.add('is-snapped');
  setTimeout(() => defaultTick.classList.remove('is-snapped'), 350);
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(noteContent.innerText);
  copyBtn.textContent = 'Copied';
  setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
});

const sendMessage = () => {
  const text = input.value.trim();
  if (!text) return;

  composer.classList.add('is-sending');
  setTimeout(() => composer.classList.remove('is-sending'), 280);

  const userMsg = document.createElement('div');
  userMsg.className = 'cm-msg-user';
  userMsg.textContent = text;
  body.appendChild(userMsg);

  input.value = '';
  input.style.height = '18px';
  input.style.overflowY = 'hidden';
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    noteContent.textContent = `# Тема: ${text}\n\n- Основная мысль зафиксирована в верхнем блоке\n- Текст можно редактировать прямо кликом внутри`;

    const aiMsg = document.createElement('div');
    aiMsg.className = 'cm-msg-ai';
    aiMsg.innerHTML = `
      <p>Обновил конспект сверху по запросу <strong>«${text}»</strong>.</p>
      <ul>
        <li>Используй <code>contenteditable</code>, чтобы поправить любую строчку руками.</li>
        <li>Нажми <code>Copy</code> справа сверху для переноса в Obsidian.</li>
      </ul>
    `;
    body.appendChild(aiMsg);
    body.scrollTop = body.scrollHeight;
  }, 450);
};

input.addEventListener('input', () => {
  input.style.height = '18px';
  const nextHeight = Math.min(input.scrollHeight, 140);
  input.style.height = nextHeight + 'px';
  input.style.overflowY = input.scrollHeight > 140 ? 'auto' : 'hidden';
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);