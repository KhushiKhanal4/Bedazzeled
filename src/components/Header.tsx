import "./Header.css";

function LineIcon({ type }: { type: "undo" | "redo" | "clear" }) {
  if (type === "clear") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 7h12M9 7V5h6v2M8 7l1 12h6l1-12M10 10v6M14 10v6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={type === "undo" ? "M9 8 5 12l4 4" : "m15 8 4 4-4 4"} />
      <path d={type === "undo" ? "M6 12h7a5 5 0 0 1 5 5" : "M18 12h-7a5 5 0 0 0-5 5"} />
    </svg>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="brand" aria-label="Bedazzle your things">
        <span className="brand__name">bedazzle <b>✧</b></span>
        <span className="brand__tagline">your things <b>♥</b></span>
      </div>

      <div className="tip-pill">+ drag, stick, sparkle <span>✦</span> +</div>

      <nav className="header-actions" aria-label="Visual controls">
        <button type="button" className="header-action">
          <LineIcon type="undo" />
          <span>undo</span>
        </button>
        <button type="button" className="header-action">
          <LineIcon type="redo" />
          <span>redo</span>
        </button>
        <button type="button" className="header-action header-action--clear">
          <LineIcon type="clear" />
          <span>clear all</span>
        </button>
      </nav>
    </header>
  );
}
