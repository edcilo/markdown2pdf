export type ToolbarAction =
  | 'bold'
  | 'italic'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'link'
  | 'image'
  | 'unordered-list'
  | 'ordered-list'
  | 'blockquote'
  | 'code-inline'
  | 'code-block'
  | 'horizontal-rule';

export interface ToolbarButton {
  action: ToolbarAction;
  label: string;
  title: string;
}

export const TOOLBAR_BUTTONS: ToolbarButton[] = [
  { action: 'bold', label: 'B', title: 'Bold (Ctrl+B)' },
  { action: 'italic', label: 'I', title: 'Italic (Ctrl+I)' },
  { action: 'heading1', label: 'H1', title: 'Heading 1' },
  { action: 'heading2', label: 'H2', title: 'Heading 2' },
  { action: 'heading3', label: 'H3', title: 'Heading 3' },
  { action: 'link', label: '🔗', title: 'Link (Ctrl+K)' },
  { action: 'image', label: '🖼️', title: 'Image' },
  { action: 'unordered-list', label: '• —', title: 'Unordered list' },
  { action: 'ordered-list', label: '1.', title: 'Ordered list' },
  { action: 'blockquote', label: '❝', title: 'Blockquote' },
  { action: 'code-inline', label: '<>', title: 'Inline code' },
  { action: 'code-block', label: '</>', title: 'Code block' },
  { action: 'horizontal-rule', label: '──', title: 'Horizontal rule' },
];
