/**
 * Triggers the browser's native print dialog, which allows the user
 * to save the page as a PDF.
 *
 * The actual rendering is handled entirely by the browser's CSS engine,
 * which supports all modern colour functions (oklch, lab, etc.).
 * Print-specific layout is controlled by `src/styles/print.css`.
 *
 * @param filename - Used as the document title during printing so the
 *                   browser suggests it as the default PDF file name.
 */
export function downloadPdf(filename: string = 'document.pdf'): void {
  const originalTitle = document.title;

  /*
   * Browsers use `document.title` as the suggested file name when
   * saving as PDF.  Strip the ".pdf" extension because Chrome
   * appends it automatically.
   */
  document.title = filename.replace(/\.pdf$/i, '');

  window.print();

  /*
   * Restore the original title.  `window.print()` is synchronous in
   * terms of blocking the main thread until the dialog closes (in
   * most browsers), so this runs after the user saves or cancels.
   */
  document.title = originalTitle;
}
