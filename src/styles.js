export const styles = /*css*/ `
  #cm-trigger {
    position: fixed;
    top: 0;
    right: 0;
    width: 24px;
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
    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  #cm-trigger:hover::after {
    width: 5.3px;
    height: 91px;
    transform: translateX(-2.1px);
    background: rgba(148, 163, 184, 0.56);
    box-shadow: 
      inset 0 0 0 0.5px rgba(255, 255, 255, 0.6),
      0 4px 14px rgba(0, 0, 0, 0.13);
  }

  #cm-trigger:active::after {
    transform: translateX(-2.1px) scaleY(0.958);
    background: rgba(148, 163, 184, 0.68);
    transition-duration: 0.12s;
  }

  #cm-drawer {
    --cm-bg: linear-gradient(180deg, rgba(28, 28, 30, 0.96) 0%, rgba(19, 19, 21, 0.98) 100%);
    --cm-surface: rgba(255, 255, 255, 0.04);
    --cm-border: rgba(255, 255, 255, 0.08);
    --cm-text-primary: #E2E8F0;
    --cm-text-secondary: #CBD5E1;
    --cm-accent: #818CF8;
    --cm-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    position: fixed;
    top: 12px;
    right: 12px;
    width: 420px;
    max-width: calc(100vw - 24px);
    height: calc(100vh - 24px);
    z-index: 999998;
    border-radius: 16px;
    background: var(--cm-bg);
    backdrop-filter: blur(32px) saturate(180%);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.07),
      inset 0 0 0 1px rgba(255, 255, 255, 0.06),
      0 24px 48px rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateX(calc(100% + 24px));
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  #cm-drawer.open {
    transform: translateX(0);
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

  .cm-body {
    flex: 1;
    padding-block: 16px;
    padding-inline: 20px;
    overflow-y: auto;
    font-family: var(--cm-font);
    color: var(--cm-text-secondary);
  }

  .cm-footer {
    padding-block: 8px 16px;
    padding-inline: 16px;
    flex-shrink: 0;
  }

/* от giсюда ничего не разбирал */
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
  .cm-body {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.16) transparent;
  }

  .cm-input::-webkit-scrollbar,
  .cm-body::-webkit-scrollbar {
    width: 4px;
  }

  .cm-input::-webkit-scrollbar-track,
  .cm-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .cm-input::-webkit-scrollbar-thumb,
  .cm-body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.16);
    border-radius: 99px;
  }

  .cm-input::-webkit-scrollbar-thumb:hover,
  .cm-body::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.32);
  }
`;
