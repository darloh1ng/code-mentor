export const styles = /*css*/ `
  #cm-trigger {
    position: fixed;
    top: 0;
    right: 0;
    width: 32px;
    height: 100vh;
    z-index: 999999;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 6px;
  }

  #cm-trigger::after {
    content: '';
    width: 4.4px;
    height: 70px;
    border-radius: 99px;
    background: rgba(148, 163, 184, 0.35);
    backdrop-filter: blur(8px);
    box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.3);
    transition:
      width 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.5s ease,
      transform 0.3s ease;
  }

  #cm-trigger.is-hidden::after {
    opacity: 0;
  }

  #cm-trigger:hover::after {
    width: 5.3px;
    height: 91px;
    background: rgba(148, 163, 184, 0.56);
    box-shadow: 
      inset 0 0 0 0.5px rgba(255, 255, 255, 0.6),
      0 4px 14px rgba(0, 0, 0, 0.13);
  }

  #cm-trigger:active::after {
    transform: scaleY(0.96);
    background: rgba(148, 163, 184, 0.68);
    transition-duration: 0.18s;
  }

  #cm-drawer {
    --cm-bg: linear-gradient(180deg, rgba(28, 28, 30, 0.96) 0%, rgba(19, 19, 21, 0.98) 100%);
    --cm-surface: rgba(255, 255, 255, 0.04);
    --cm-border: rgba(255, 255, 255, 0.08);
    --cm-text-primary: #DADADA;
    --cm-text-secondary: #B4B4B8;
    --cm-accent: #8A5CF5;
    --cm-font: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
    --cm-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

    position: fixed;
    top: 12px;
    right: 12px;
    width: 420px;
    max-width: calc(100vw - 24px);
    height: calc(100vh - 24px);
    z-index: 999998;
    border-radius: 16px;
    background: var(--cm-bg);
    backdrop-filter: blur(24px);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.07),
      inset 0 0 0 1px rgba(255, 255, 255, 0.06),
      0 24px 48px rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    transform: translateX(calc(100% + 24px));
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  #cm-drawer.open {
    transform: translateX(0);
  }

  #cm-drawer.is-swiping {
    transition: none;
  }

  .cm-edge-handle {
    position: absolute;
    top: 0;
    left: -34px;
    width: 46px;
    height: 100%;
    z-index: 20;
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 18px;
    box-sizing: border-box;
  }

  .cm-edge-handle::after {
    content: '';
    width: 4.4px;
    height: 70px;
    border-radius: 99px;
    background: rgba(148, 163, 184, 0.35);
    backdrop-filter: blur(8px);
    box-shadow: inset 0 0 0 0.5px rgba(255, 255, 255, 0.3);
    transition:
      width 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.3s ease;
  }

  .cm-edge-handle:hover::after {
    width: 5.3px;
    height: 91px;
    background: rgba(148, 163, 184, 0.56);
    box-shadow: 
      inset 0 0 0 0.5px rgba(255, 255, 255, 0.6),
      0 4px 14px rgba(0, 0, 0, 0.13);
  }

  .cm-edge-handle:active {
    cursor: grabbing;
  }

  .cm-edge-handle:active::after {
    transform: scaleY(0.96);
    background: rgba(148, 163, 184, 0.68);
    transition-duration: 0.18s;
  }

  .cm-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 16px;
    padding-inline: 20px;
    border-bottom: 1px solid var(--cm-border);
    flex-shrink: 0;
  }

  .cm-title {
    font-family: var(--cm-font);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--cm-text-primary);
  }

  .cm-workspace {
    position: relative;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .cm-note {
    height: 65%;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.02);
    overflow: hidden;
    flex-shrink: 0;
  }

  .cm-note-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 10px 4px;
    padding-inline: 20px;
    flex-shrink: 0;
  }

  .cm-note-label {
    font-family: var(--cm-font);
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.35);
  }

  .cm-copy-btn {
    padding-block: 3px;
    padding-inline: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    font-family: var(--cm-font);
    font-size: 11px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .cm-copy-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.16);
    color: #F8FAFC;
  }

  .cm-resizer {
    position: relative;
    height: 9px;
    margin-block: -4px;
    z-index: 10;
    cursor: row-resize;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .cm-resizer::before {
    content: '';
    position: absolute;
    inset-inline: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.07);
    transition: background-color 0.25s ease, height 0.2s ease;
  }

  .cm-resizer:hover::before,
  .cm-resizer.is-dragging::before {
    height: 2px;
    background: rgba(255, 255, 255, 0.28);
  }

  .cm-resizer.is-snapped::before {
    background: rgba(255, 255, 255, 0.55);
  }

  .cm-default-tick {
    position: absolute;
    top: 65%;
    left: 6px;
    width: 6px;
    height: 2px;
    border-radius: 99px;
    background: rgba(255, 255, 255, 0.28);
    opacity: 0;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 11;
    transition:
      opacity 0.35s ease,
      width 0.3s cubic-bezier(0.22, 1, 0.36, 1),
      background-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .cm-workspace.is-dragging .cm-default-tick {
    opacity: 0.55;
  }

  .cm-default-tick.is-snapped {
    opacity: 1;
    width: 10px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }

  .cm-body {
    flex: 1;
    min-height: 0;
    margin-right: 22px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-block: 12px;
    padding-inline: 20px 8px;
    overflow-y: auto;
    font-family: var(--cm-font);
    color: var(--cm-text-secondary);
  }

  .cm-body > :first-child {
    margin-top: auto;
  }

  .cm-msg-user {
    align-self: flex-end;
    max-width: 82%;
    padding-block: 7px;
    padding-inline: 12px;
    border-radius: 14px 14px 4px 14px;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.09);
    color: var(--cm-text-primary);
    font-size: 13px;
    line-height: 1.45;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .cm-msg-ai {
    align-self: flex-start;
    width: 100%;
    padding-block: 4px;
    color: var(--cm-text-secondary);
    font-size: 13px;
    line-height: 1.55;
    word-break: break-word;
  }

  .cm-msg-ai p {
    margin: 0 0 8px;
  }

  .cm-msg-ai p:last-child {
    margin-bottom: 0;
  }

  .cm-msg-ai strong {
    color: var(--cm-text-primary);
    font-weight: 600;
  }

  .cm-msg-ai code {
    padding-block: 1px;
    padding-inline: 5px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.06);
    font-family: var(--cm-mono);
    font-size: 12px;
    color: #E2E8F0;
  }

  .cm-msg-ai ul {
    margin: 4px 0 8px;
    padding-left: 18px;
  }

  .cm-msg-ai li {
    margin-bottom: 4px;
  }

  .cm-footer {
    padding-block: 8px 16px;
    padding-inline: 20px 16px;
    flex-shrink: 0;
  }

  .cm-composer {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 38px;
    padding-block: 6px;
    padding-inline: 14px 6px;
    border-radius: 19px;
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(255, 255, 255, 0.07);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    cursor: text;
    transition:
      background-color 0.75s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .cm-composer:focus-within {
    background: rgba(255, 255, 255, 0.065);
    border-color: rgba(255, 255, 255, 0.16);
  }

  .cm-composer.is-sending {
    background: rgba(255, 255, 255, 0.085);
    border-color: rgba(255, 255, 255, 0.26);
    transition-duration: 0.35s;
  }

  .cm-input {
    flex: 1;
    display: block;
    height: 18px;
    max-height: 140px;
    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;
    color: var(--cm-text-primary);
    font-family: var(--cm-font);
    font-size: 13px;
    line-height: 18px;
    overflow-y: hidden;
    resize: none;
    outline: none;
  }

  .cm-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
    line-height: 18px;
  }

  .cm-send {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.65);
    cursor: pointer;
    flex-shrink: 0;
    transition:
      background-color 0.75s cubic-bezier(0.22, 1, 0.36, 1),
      color 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .cm-send:hover {
    background: rgba(255, 255, 255, 0.16);
    color: rgba(255, 255, 255, 0.95);
  }

  .cm-composer.is-sending .cm-send {
    background: rgba(255, 255, 255, 0.24);
    color: #FFFFFF;
    transition-duration: 0.35s;
  }

  .cm-input,
  .cm-body,
  .cm-note-content,
  .cm-code-wrap pre {
    scrollbar-width: auto;
    scrollbar-color: rgba(255, 255, 255, 0.24) transparent;
  }

  .cm-input::-webkit-scrollbar,
  .cm-body::-webkit-scrollbar,
  .cm-note-content::-webkit-scrollbar,
  .cm-code-wrap pre::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .cm-input::-webkit-scrollbar-track,
  .cm-body::-webkit-scrollbar-track,
  .cm-note-content::-webkit-scrollbar-track,
  .cm-code-wrap pre::-webkit-scrollbar-track {
    background: transparent;
  }

  .cm-input::-webkit-scrollbar-thumb,
  .cm-body::-webkit-scrollbar-thumb,
  .cm-note-content::-webkit-scrollbar-thumb,
  .cm-code-wrap pre::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.24);
    border-radius: 99px;
  }

  .cm-input::-webkit-scrollbar-thumb:hover,
  .cm-body::-webkit-scrollbar-thumb:hover,
  .cm-note-content::-webkit-scrollbar-thumb:hover,
  .cm-code-wrap pre::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.42);
  }
`;