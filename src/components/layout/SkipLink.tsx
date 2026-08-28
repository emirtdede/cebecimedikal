export function SkipLink({ text = "İçeriğe Atla" }: { text?: string }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-white font-semibold rounded-md shadow-lg outline-none ring-2 ring-white"
    >
      {text}
    </a>
  );
}
