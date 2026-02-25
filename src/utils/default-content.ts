/**
 * Default Markdown content loaded when the editor opens.
 * Demonstrates all supported formatting options.
 */
export const DEFAULT_MARKDOWN = `# Welcome to MD2PDF

A simple **Markdown to PDF** converter. Write your content on the left, see the preview on the right, and download it as a PDF when you're ready.

## Formatting Guide

### Text Styles

You can write **bold text**, *italic text*, or combine ***both***. Use \`inline code\` for technical terms.

### Links & Images

- [Visit GitHub](https://github.com)
- ![Placeholder image](https://placehold.co/300x100)

### Lists

**Unordered list:**

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

**Ordered list:**

1. Step one
2. Step two
3. Step three

### Blockquote

> "The best way to predict the future is to invent it."
> — Alan Kay

### Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### Table

| Feature       | Status |
| ------------- | ------ |
| Bold          | ✅     |
| Italic        | ✅     |
| Links         | ✅     |
| Code blocks   | ✅     |
| PDF export    | ✅     |

---

*Start editing to see the live preview!*
`;
