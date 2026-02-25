import DOMPurify from 'dompurify';
import { marked } from 'marked';

marked.use({ async: false });

/**
 * Parses a raw Markdown string into sanitized HTML.
 * Returns an empty string when the input is blank.
 */
export function parseMarkdown(raw: string): string {
  if (!raw.trim()) return '';

  const html = marked.parse(raw) as string;

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}
