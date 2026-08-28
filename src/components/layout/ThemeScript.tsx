export function ThemeScript() {
  const code = `
    (function() {
      try {
        var theme = localStorage.getItem('cebeci_theme') || 'navy';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
