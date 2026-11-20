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
    position: fixed;
    top: 12px;
    right: 12px;
    width: 420px;
    max-width: calc(100vw - 24px);
    height: calc(100vh - 24px);
    z-index: 999998;
    border-radius: 16px;
    background: rgba(22, 25, 32, 0.88);
    backdrop-filter: blur(24px);
    box-shadow: 
      inset 0 0 0 1px rgba(255, 255, 255, 0.08),
      0 20px 40px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateX(calc(100% + 24px));
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  #cm-drawer.open {
    transform: translateX(0);
  }
`;