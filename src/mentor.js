import { styles } from './styles.js';

const trigger = document.createElement('div'); // боковой триггер
trigger.id = 'cm-trigger';
document.body.appendChild(trigger);

const styleTag = document.createElement('style'); // подлкючение css
styleTag.textContent = styles;
document.head.appendChild(styleTag);

const drawer = document.createElement('aside');  // боковая панель
drawer.id = 'cm-drawer';
drawer.innerHTML = /*html*/ `
  <header class="cm-header">
    <span class="cm-title">Code Mentor</span>
  </header>

  <main class="cm-body"></main>

  <footer class="cm-footer">
    <div class="cm-composer">
      <textarea class="cm-input" rows="1" placeholder="Спросить Code Mentor"></textarea>
      <button class="cm-send" type="button" title="Отправить">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M12.5 4.5V8.5C12.5 9.6 11.6 10.5 10.5 10.5H3.5M3.5 10.5L6.5 7.5M3.5 10.5L6.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

`;
document.body.appendChild(drawer);

trigger.addEventListener('click', () => drawer.classList.toggle('open')); // реакция на клик

const composer = drawer.querySelector('.cm-composer'); // с этой строчки я нечего не разбирал
const input = drawer.querySelector('.cm-input');
const sendBtn = drawer.querySelector('.cm-send');

const triggerSendEffect = () => {
  composer.classList.add('is-sending');
  setTimeout(() => composer.classList.remove('is-sending'), 280);
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
    triggerSendEffect();
  }
});

sendBtn.addEventListener('click', triggerSendEffect);

