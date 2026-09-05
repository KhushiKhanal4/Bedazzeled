import "./StickerDrawer.css";

const placeholderSlots = Array.from({ length: 12 }, (_, index) => index);

export function StickerDrawer() {
  return (
    <aside className="drawer sticker-drawer">
      <div className="drawer-heading">
        <span>things that sparkle</span>
        <span className="heading-mark">✦</span>
      </div>
      <div className="sticker-grid" aria-label="Sticker library coming soon">
        {placeholderSlots.map((slot) => (
          <div className="sticker-slot" key={slot} aria-hidden="true">
            <span />
          </div>
        ))}
      </div>
      <p className="drawer-footer drawer-footer--link">more sparkles <span>↗</span></p>
    </aside>
  );
}
