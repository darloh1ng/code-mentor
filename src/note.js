const escapeHtml = (str) =>
  str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const colorizeJs = (code) =>
  escapeHtml(code).replace(
    /(\/\/[^\n]*)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|\b(const|let|var|function|return|if|else|for|while|in|of|new|delete|typeof|true|false|null|undefined)\b|\b(\d+)\b/g,
    (m, com, str, kw, num) => {
      if (com) return '<span style="color:#64748B;font-style:italic">' + com + '</span>';
      if (str) return '<span style="color:#86EFAC">' + str + '</span>';
      if (kw) return '<span style="color:#C084FC">' + kw + '</span>';
      if (num) return '<span style="color:#FDBA74">' + num + '</span>';
      return m;
    }
  );

const formatInline = (text) => {
  const slots = [];
  const safe = text.replace(/`([^`]+)`/g, (_, code) => {
    const idx = slots.length;
    slots.push('<code>' + escapeHtml(code) + '</code>');
    return '\u0000C' + idx + '\u0000';
  });

  let out = escapeHtml(safe)
    .replace(/\[\[([^\]]+)\]\]/g, '<span class="cm-wiki-link">\$1</span>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>\$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>\$1</em>');

  slots.forEach((html, idx) => {
    out = out.replace('\u0000C' + idx + '\u0000', html);
  });
  return out;
};

const renderBlock = (md) => {
  const trimmed = md.trim();
  if (!trimmed) return '<div class="cm-lp-blank"></div>';

  if (trimmed.startsWith('```')) {
    const lines = md.split('\n');
    const lang = lines.at(0).trim().slice(3).trim();
    const bodyLines = lines.slice(1);
    if (bodyLines.length > 0 && bodyLines.at(-1).trim().startsWith('```')) {
      bodyLines.pop();
    }
    const code = bodyLines.join('\n');
    const highlighted = lang === 'js' || lang === 'javascript' ? colorizeJs(code) : escapeHtml(code);
    const badge = lang ? '<span class="cm-code-lang">' + escapeHtml(lang) + '</span>' : '';
    return '<div class="cm-code-wrap">' + badge + '<pre><code>' + highlighted + '</code></pre></div>';
  }

  if (trimmed.startsWith('>')) {
    const lines = md.split('\n').map((l) => l.trim().replace(/^>\s?/, ''));
    const first = lines.at(0) || '';
    const calloutMatch = first.match(/^\[!([a-zA-Z0-9_-]+)\]\s*(.*)/);
    if (calloutMatch) {
      const type = calloutMatch.at(1) || 'tip';
      const title = (calloutMatch.at(2) || '').trim() || type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
      const items = lines.slice(1).filter(Boolean).map((l) => '<li>' + formatInline(l.replace(/^[-*]\s+/, '')) + '</li>').join('');
      return '<div class="cm-callout"><div class="cm-callout-title">💡 ' + escapeHtml(title) + '</div><ul>' + items + '</ul></div>';
    }
    return '<blockquote>' + lines.map(formatInline).join('<br>') + '</blockquote>';
  }

  if (trimmed === '---' || trimmed === '***') return '<hr>';

  const heading = trimmed.match(/^(#{1,6})\s+(.*)/);
  if (heading) {
    const level = heading.at(1).length;
    return '<h' + level + '>' + formatInline(heading.at(2)) + '</h' + level + '>';
  }

  if (/^[-*]\s+/.test(trimmed)) {
    return '<ul><li>' + formatInline(trimmed.replace(/^[-*]\s+/, '')) + '</li></ul>';
  }

  return '<p>' + formatInline(trimmed) + '</p>';
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

          const isMultiline = blockMd.trim().startsWith('```') || blockMd.trim().startsWith('>');

          if (e.key === 'Enter' && !e.shiftKey && !isMultiline) {
            e.preventDefault();
            const pos = editor.selectionStart || 0;
            const before = editor.value.slice(0, pos);
            const after = editor.value.slice(pos);
            blocks.splice(idx, 1, before, after);
            syncRaw();
            render(idx + 1, 0);
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
        row.innerHTML = renderBlock(blockMd);
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
