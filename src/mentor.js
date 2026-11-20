import { styles } from './styles.js';

const trigger = document.createElement('div'); // боковой триггер
trigger.id = 'cm-trigger';
document.body.appendChild(trigger);

const styleTag = document.createElement('style'); // подлкючение css
styleTag.textContent = styles;
document.head.appendChild(styleTag);

const drawer = document.createElement('aside');  // боковая панель
drawer.id = 'cm-drawer';
drawer.innerHTML = `
  <header class="cm-header">
    <span class="cm-title">Code Mentor</span>
  </header>
  <main class="cm-body"></main>
`;
document.body.appendChild(drawer);

trigger.addEventListener('click', () => drawer.classList.toggle('open')); // реакция на клик