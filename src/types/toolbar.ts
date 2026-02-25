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
  { action: 'bold', label: 'B', title: 'Negrita (Ctrl+B)' },
  { action: 'italic', label: 'I', title: 'Cursiva (Ctrl+I)' },
  { action: 'heading1', label: 'H1', title: 'Título 1' },
  { action: 'heading2', label: 'H2', title: 'Título 2' },
  { action: 'heading3', label: 'H3', title: 'Título 3' },
  { action: 'link', label: '🔗', title: 'Enlace' },
  { action: 'image', label: '🖼️', title: 'Imagen' },
  { action: 'unordered-list', label: '• —', title: 'Lista desordenada' },
  { action: 'ordered-list', label: '1.', title: 'Lista ordenada' },
  { action: 'blockquote', label: '❝', title: 'Cita' },
  { action: 'code-inline', label: '<>', title: 'Código inline' },
  { action: 'code-block', label: '</>', title: 'Bloque de código' },
  { action: 'horizontal-rule', label: '──', title: 'Línea horizontal' },
];
