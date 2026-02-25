import type { ToolbarAction } from '@/types/toolbar';

/**
 * Inserts Markdown syntax into a textarea based on the given action.
 *
 * - **Wrap actions** (bold, italic, code-inline, code-block, link):
 *   wrap the current selection or insert placeholder text.
 * - **Line-prefix actions** (headings, lists, blockquote):
 *   add a prefix at the start of the current line.
 * - **Block-insert actions** (horizontal-rule):
 *   insert content on a new line.
 *
 * After insertion the textarea value is updated, the cursor is repositioned
 * and an `InputEvent` is dispatched so the preview refreshes automatically.
 */
export function insertMarkdownSyntax(textarea: HTMLTextAreaElement, action: ToolbarAction): void {
  const { selectionStart: start, selectionEnd: end, value } = textarea;
  const selected = value.slice(start, end);

  let result: InsertionResult;

  switch (action) {
    case 'bold':
      result = wrapSelection(value, start, end, selected, '**', '**', 'texto en negrita');
      break;
    case 'italic':
      result = wrapSelection(value, start, end, selected, '*', '*', 'texto en cursiva');
      break;
    case 'code-inline':
      result = wrapSelection(value, start, end, selected, '`', '`', 'código');
      break;
    case 'code-block':
      result = insertCodeBlock(value, start, end, selected);
      break;
    case 'link':
      result = insertLink(value, start, end, selected);
      break;
    case 'image':
      result = insertImage(value, start, end, selected);
      break;
    case 'heading1':
      result = toggleLinePrefix(value, start, '# ');
      break;
    case 'heading2':
      result = toggleLinePrefix(value, start, '## ');
      break;
    case 'heading3':
      result = toggleLinePrefix(value, start, '### ');
      break;
    case 'unordered-list':
      result = toggleLinePrefix(value, start, '- ');
      break;
    case 'ordered-list':
      result = toggleLinePrefix(value, start, '1. ');
      break;
    case 'blockquote':
      result = toggleLinePrefix(value, start, '> ');
      break;
    case 'horizontal-rule':
      result = insertBlock(value, start, '\n---\n');
      break;
    default: {
      const _exhaustive: never = action;
      throw new Error(`Unknown toolbar action: ${_exhaustive}`);
    }
  }

  applyResult(textarea, result);
}

/* ------------------------------------------------------------------ */
/*  Internal types                                                     */
/* ------------------------------------------------------------------ */

interface InsertionResult {
  /** The new full text value for the textarea */
  newValue: string;
  /** Cursor position (selectionStart) after insertion */
  cursorStart: number;
  /** Cursor position (selectionEnd) after insertion */
  cursorEnd: number;
}

/* ------------------------------------------------------------------ */
/*  Wrap helpers                                                       */
/* ------------------------------------------------------------------ */

function wrapSelection(
  value: string,
  start: number,
  end: number,
  selected: string,
  before: string,
  after: string,
  placeholder: string,
): InsertionResult {
  if (selected) {
    // Wrap existing selection
    const wrapped = `${before}${selected}${after}`;
    return {
      newValue: value.slice(0, start) + wrapped + value.slice(end),
      cursorStart: start + before.length,
      cursorEnd: start + before.length + selected.length,
    };
  }
  // Insert placeholder and select it
  const inserted = `${before}${placeholder}${after}`;
  return {
    newValue: value.slice(0, start) + inserted + value.slice(end),
    cursorStart: start + before.length,
    cursorEnd: start + before.length + placeholder.length,
  };
}

function insertLink(value: string, start: number, end: number, selected: string): InsertionResult {
  const text = selected || 'texto del enlace';
  const inserted = `[${text}](url)`;
  const newValue = value.slice(0, start) + inserted + value.slice(end);

  // Position cursor on "url" so the user can type the URL immediately
  const urlStart = start + text.length + 3; // "[text](" = text.length + 3
  const urlEnd = urlStart + 3; // "url" length
  return { newValue, cursorStart: urlStart, cursorEnd: urlEnd };
}

function insertImage(value: string, start: number, end: number, selected: string): InsertionResult {
  const alt = selected || 'descripción';
  const inserted = `![${alt}](url)`;
  const newValue = value.slice(0, start) + inserted + value.slice(end);

  const urlStart = start + alt.length + 4; // "![alt](" = alt.length + 4
  const urlEnd = urlStart + 3;
  return { newValue, cursorStart: urlStart, cursorEnd: urlEnd };
}

function insertCodeBlock(
  value: string,
  start: number,
  end: number,
  selected: string,
): InsertionResult {
  const code = selected || 'código';
  const before = '```\n';
  const after = '\n```';
  const inserted = `${before}${code}${after}`;
  const newValue = value.slice(0, start) + inserted + value.slice(end);

  return {
    newValue,
    cursorStart: start + before.length,
    cursorEnd: start + before.length + code.length,
  };
}

/* ------------------------------------------------------------------ */
/*  Line-prefix helpers                                                */
/* ------------------------------------------------------------------ */

function toggleLinePrefix(value: string, cursorPos: number, prefix: string): InsertionResult {
  // Find the start of the current line
  const lineStart = value.lastIndexOf('\n', cursorPos - 1) + 1;
  const lineEnd = value.indexOf('\n', cursorPos);
  const lineEndPos = lineEnd === -1 ? value.length : lineEnd;
  const line = value.slice(lineStart, lineEndPos);

  if (line.startsWith(prefix)) {
    // Remove prefix (toggle off)
    const newValue =
      value.slice(0, lineStart) + line.slice(prefix.length) + value.slice(lineEndPos);
    return {
      newValue,
      cursorStart: Math.max(lineStart, cursorPos - prefix.length),
      cursorEnd: Math.max(lineStart, cursorPos - prefix.length),
    };
  }

  // Remove any existing heading prefix before adding the new one
  const cleanedLine = line.replace(/^#{1,6}\s|^>\s|^-\s|^\d+\.\s/, '');
  const removedLength = line.length - cleanedLine.length;
  const newLine = prefix + cleanedLine;
  const newValue = value.slice(0, lineStart) + newLine + value.slice(lineEndPos);

  const newCursorPos = cursorPos - removedLength + prefix.length;
  return {
    newValue,
    cursorStart: newCursorPos,
    cursorEnd: newCursorPos,
  };
}

/* ------------------------------------------------------------------ */
/*  Block-insert helpers                                               */
/* ------------------------------------------------------------------ */

function insertBlock(value: string, cursorPos: number, block: string): InsertionResult {
  const newValue = value.slice(0, cursorPos) + block + value.slice(cursorPos);
  const newCursorPos = cursorPos + block.length;
  return {
    newValue,
    cursorStart: newCursorPos,
    cursorEnd: newCursorPos,
  };
}

/* ------------------------------------------------------------------ */
/*  Apply result to textarea                                           */
/* ------------------------------------------------------------------ */

function applyResult(textarea: HTMLTextAreaElement, result: InsertionResult): void {
  textarea.value = result.newValue;
  textarea.selectionStart = result.cursorStart;
  textarea.selectionEnd = result.cursorEnd;
  textarea.focus();

  // Dispatch input event so the preview updates
  textarea.dispatchEvent(new InputEvent('input', { bubbles: true }));
}
