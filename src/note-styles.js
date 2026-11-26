export const noteStyles = /*css*/ `
  .cm-note-content {
    flex: 1;
    margin-right: 22px;
    padding-block: 8px 28px;
    padding-inline: 20px 8px;
    overflow-y: auto;
    font-family: var(--cm-font);
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--cm-text-primary);
    cursor: text;
    word-break: break-word;
  }

  .cm-note-empty {
    color: rgba(255, 255, 255, 0.24);
    font-size: 13px;
    user-select: none;
  }

  .cm-lp-block {
    position: relative;
    min-height: 1.4em;
    border-radius: 4px;
  }

  .cm-lp-blank {
    height: 10px;
  }

  .cm-lp-input {
    display: block;
    width: 100%;
    padding: 2px 5px;
    margin: -2px -5px;
    border: 0;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
    color: #F4F4F5;
    font-family: var(--cm-mono);
    font-size: 12.5px;
    line-height: 1.6;
    resize: none;
    overflow: hidden;
    outline: none;
    box-sizing: border-box;
  }

  .cm-lp-block h1 {
    margin: 14px 0 6px;
    font-size: 19px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.015em;
    color: #FFFFFF;
  }

  .cm-lp-block h2 {
    margin: 16px 0 6px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.01em;
    color: #F4F4F5;
  }

  .cm-lp-block h3 {
    margin: 12px 0 4px;
    font-size: 14.5px;
    font-weight: 650;
    color: #E4E4E7;
  }

  .cm-lp-block h4 {
    margin: 12px 0 4px;
    font-size: 13.5px;
    font-weight: 650;
    color: #D4D4D8;
  }

  .cm-lp-block h5,
  .cm-lp-block h6 {
    margin: 4px 0 6px;
    font-size: 13.5px;
    font-weight: 600;
    line-height: 1.5;
    color: #E4E4E7;
  }

  .cm-lp-block p {
    margin: 0 0 4px;
  }

  .cm-lp-block strong {
    color: #FFFFFF;
    font-weight: 650;
  }

  .cm-lp-block em {
    color: #D4D4D8;
    font-style: italic;
  }

  .cm-wiki-link {
    color: #A78BFA;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid rgba(167, 139, 250, 0.35);
    transition: color 0.15s, border-color 0.15s;
  }

  .cm-wiki-link:hover {
    color: #C4B5FD;
    border-bottom-color: #C4B5FD;
  }

  .cm-lp-block hr {
    border: 0;
    height: 1px;
    margin: 10px 0;
    background: rgba(255, 255, 255, 0.08);
  }

  .cm-lp-block ul {
    margin: 2px 0;
    padding-left: 18px;
  }

  .cm-lp-block li {
    margin-bottom: 2px;
  }

  .cm-lp-block li::marker {
    color: rgba(255, 255, 255, 0.32);
  }

  .cm-lp-block code {
    padding: 1.5px 5px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.07);
    font-family: var(--cm-mono);
    font-size: 12px;
    color: #E4E4E7;
  }

  .cm-code-wrap {
    position: relative;
    margin: 6px 0 8px;
    border-radius: 6px;
    background: #161618;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .cm-code-lang {
    position: absolute;
    top: 5px;
    right: 9px;
    font-family: var(--cm-mono);
    font-size: 10px;
    color: rgba(255, 255, 255, 0.28);
    pointer-events: none;
  }

  .cm-code-wrap pre {
    margin: 0;
    padding: 10px 12px;
    overflow-x: auto;
  }

  .cm-code-wrap pre code {
    padding: 0;
    background: transparent;
    font-family: var(--cm-mono);
    font-size: 12px;
    line-height: 1.55;
    color: #D4D4D8;
  }

  .cm-callout {
    margin: 8px 0 10px;
    padding: 10px 14px;
    border-radius: 6px;
    background: rgba(83, 223, 221, 0.08);
    border: 1px solid rgba(83, 223, 221, 0.16);
  }

  .cm-callout-title {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #53DFDD;
  }

  .cm-callout ul {
    margin: 0;
    padding-left: 18px;
  }

  .cm-callout li {
    margin-bottom: 4px;
    color: #D4D4D8;
  }

  .cm-callout li:last-child {
    margin-bottom: 0;
  }

  .cm-callout li::marker {
    color: rgba(83, 223, 221, 0.6);
  }

  .cm-lp-block blockquote {
    margin: 6px 0 8px;
    padding-left: 12px;
    border-left: 2px solid var(--cm-accent);
    color: #A1A1AA;
  }
`;