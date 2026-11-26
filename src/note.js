import { Marked } from './vendor/marked.esm.js';

const marked = new Marked({
  breaks: true,
  gfm: true,
});

const colorizeJs = (codeEl) => {
  const html = codeEl.innerHTML;
  codeEl.innerHTML = html.replace(
    /(\/\/[^\n]*)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|\b(const|let|var|function|return|if|else|for|while|in|of|new|delete|typeof|true|false|null|undefined)\b|\b(\d+)\b/g,
    (m, com, str, kw, num) => {
      if (com) return '<span style="color:#64748B;font-style:italic">' + com + '</span>';
      if (str) return '<span style="color:#86EFAC">' + str + '</span>';
      if (kw) return '<span style="color:#C084FC">' + kw + '</span>';
      if (num) return '<span style="color:#FDBA74">' + num + '</span>';
      return m;
    }
  );
};

const renderObsidianBlock = (md) => {
  if (!md.trim()) return '<div class="cm-lp-blank"></div>';
  const container = document.createElement('div');
  container.innerHTML = marked.parse(md);

  container.querySelectorAll('pre').forEach((pre) => {
    const codeEl = pre.querySelector('code');
    const langClass = codeEl ? Array.from(codeEl.classList).find((c) => c.startsWith('language-')) : '';
    const lang = langClass ? langClass.replace('language-', '') : '';
    if (codeEl && (lang === 'js' || lang === 'javascript')) {
      colorizeJs(codeEl);
    }

    const wrap = document.createElement('div');
    wrap.className = 'cm-code-wrap';
    if (lang) {
      const badge = document.createElement('span');
      badge.className = 'cm-code-lang';
      badge.textContent = lang;
      wrap.appendChild(badge);
    }
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
  });

  container.querySelectorAll('blockquote').forEach((bq) => {
    const firstP = bq.querySelector('p');
    if (!firstP) return;
    const text = firstP.textContent.trim();
    const match = text.match(/^\[!([a-zA-Z0-9_-]+)\]\s*(.*)/);
    if (!match) return;

    const type = match.at(1) || 'tip';
    const customTitle = (match.at(2) || '').trim();
    const title = customTitle || type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

    const callout = document.createElement('div');
    callout.className = 'cm-callout';

    const titleEl = document.createElement('div');
    titleEl.className = 'cm-callout-title';
    titleEl.textContent = '💡 ' + title;
    callout.appendChild(titleEl);

    firstP.remove();
    while (bq.firstChild) {
      callout.appendChild(bq.firstChild);
    }
    bq.replaceWith(callout);
  });

  return container.innerHTML.replace(/\[\[([^\]]+)\]\]/g, '<span class="cm-wiki-link">$1</span>');
};

const splitIntoBlocks = (md) => {
  const clean = md.replaceAll(String.fromCharCode(13), '');
  if (!clean.trim()) return [];
  const lines = clean.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines.at(i);
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      const codeLines = [line];
      i++;
      while (i < lines.length) {
        codeLines.push(lines.at(i));
        if (lines.at(i).trim().startsWith('```')) {
          i++;
          break;
        }
        i++;
      }
      blocks.push(codeLines.join('\n'));
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quoteLines = [line];
      i++;
      while (i < lines.length && lines.at(i).trim().startsWith('>')) {
        quoteLines.push(lines.at(i));
        i++;
      }
      blocks.push(quoteLines.join('\n'));
      continue;
    }

    blocks.push(line);
    i++;
  }

  return blocks;
};

export const createObsidianNote = (noteContent, initialMarkdown = '') => {
  let rawMarkdown = initialMarkdown;
  let blocks = [];
  let activeIndex = -1;

  const syncRaw = () => {
    rawMarkdown = blocks.join('\n');
  };

  const commitAndClose = () => {
    if (activeIndex === -1) return;
    blocks = splitIntoBlocks(blocks.join('\n'));
    syncRaw();
    render(-1);
  };

  const render = (focusIndex = -1, caretPos = null) => {
    activeIndex = focusIndex;
    noteContent.innerHTML = '';

    if (blocks.length === 0 && focusIndex === -1) {
      const empty = document.createElement('div');
      empty.className = 'cm-note-empty';
      empty.textContent = 'Нажми сюда или вставь конспект из Obsidian...';
      noteContent.appendChild(empty);
      return;
    }

    blocks.forEach((blockMd, idx) => {
      const row = document.createElement('div');
      row.className = 'cm-lp-block';

      if (idx === focusIndex) {
        const editor = document.createElement('textarea');
        editor.className = 'cm-lp-input';
        editor.spellcheck = false;
        editor.value = blockMd;
        row.appendChild(editor);
        noteContent.appendChild(row);

        const autoGrow = () => {
          editor.style.height = 'auto';
          editor.style.height = editor.scrollHeight + 'px';
        };
        autoGrow();
        editor.focus();
        if (caretPos !== null) {
          const safePos = Math.min(caretPos, editor.value.length);
          editor.setSelectionRange(safePos, safePos);
        }

        editor.addEventListener('input', () => {
          blocks[idx] = editor.value;
          syncRaw();
          autoGrow();
        });

        editor.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            commitAndClose();
            return;
          }

          const isMultilineBlock = blockMd.trim().startsWith('```') || blockMd.trim().startsWith('>');

          if (e.key === 'Enter' && !e.shiftKey && !isMultilineBlock) {
            e.preventDefault();
            const pos = editor.selectionStart || 0;
            const before = editor.value.slice(0, pos);
            const after = editor.value.slice(pos);

            const emptyListMatch = before.match(/^(\s*[-*]\s+)$/);
            if (emptyListMatch && !after.trim()) {
              blocks[idx] = '';
              syncRaw();
              render(idx, 0);
              return;
            }

            const listMatch = before.match(/^(\s*[-*]\s+)/);
            const nextPrefix = listMatch ? listMatch.at(1) : '';
            blocks.splice(idx, 1, before, nextPrefix + after);
            syncRaw();
            render(idx + 1, nextPrefix.length);
            return;
          }

          if (e.key === 'Backspace' && editor.value === '' && blocks.length > 0) {
            e.preventDefault();
            blocks.splice(idx, 1);
            syncRaw();
            if (blocks.length === 0) {
              render(-1);
            } else {
              const prevIdx = Math.max(0, idx - 1);
              render(prevIdx, blocks.at(prevIdx).length);
            }
            return;
          }

          if (e.key === 'ArrowUp' && editor.selectionStart === 0 && idx > 0) {
            e.preventDefault();
            blocks = splitIntoBlocks(blocks.join('\n'));
            syncRaw();
            const prevIdx = Math.min(idx - 1, blocks.length - 1);
            render(prevIdx, blocks.at(prevIdx).length);
            return;
          }

          if (e.key === 'ArrowDown' && editor.selectionEnd === editor.value.length && idx < blocks.length - 1) {
            e.preventDefault();
            blocks = splitIntoBlocks(blocks.join('\n'));
            syncRaw();
            const nextIdx = Math.min(idx + 1, blocks.length - 1);
            render(nextIdx, 0);
          }
        });

        editor.addEventListener('blur', () => {
          setTimeout(() => {
            if (!noteContent.contains(document.activeElement)) {
              commitAndClose();
            }
          }, 0);
        });
      } else {
        row.innerHTML = renderObsidianBlock(blockMd);
        row.addEventListener('click', (e) => {
          const sel = window.getSelection();
          if (sel && sel.toString().length > 0) return;
          e.stopPropagation();
          render(idx);
        });
        noteContent.appendChild(row);
      }
    });
  };

  const setMarkdown = (md) => {
    blocks = splitIntoBlocks(md);
    syncRaw();
    render(-1);
  };

  noteContent.addEventListener('click', (e) => {
    const sel = window.getSelection();
    if (sel && sel.toString().length > 0) return;
    if (e.target === noteContent || e.target.classList.contains('cm-note-empty')) {
      if (blocks.length === 0) {
        blocks = [''];
        render(0, 0);
      } else if (activeIndex === -1) {
        if (blocks.at(-1).trim() === '') {
          render(blocks.length - 1, 0);
        } else {
          blocks.push('');
          render(blocks.length - 1, 0);
        }
      }
    }
  });

  noteContent.addEventListener('paste', (e) => {
    const pasted = (e.clipboardData || window.clipboardData).getData('text/plain');
    if (!pasted) return;
    if (activeIndex === -1 || pasted.includes('\n')) {
      e.preventDefault();
      setMarkdown(pasted);
    }
  });

  setMarkdown(initialMarkdown);

  return {
    setMarkdown,
    getMarkdown: () => rawMarkdown,
    isEditing: () => activeIndex !== -1,
    closeEditor: commitAndClose,
  };
};