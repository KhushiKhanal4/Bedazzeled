import { stickerLibrary } from "../data/stickers";
import "./StickerDrawer.css";

export function StickerDrawer() {
  return (
    <aside className="drawer sticker-drawer">
      <div className="drawer-heading">
        <span>things that sparkle</span>
        <span className="heading-mark">✦</span>
      </div>
      <div className="sticker-grid">
        {stickerLibrary.map((sticker) => (
          <div className="sticker-slot" key={sticker.id} title={sticker.name}>
            <img src={sticker.imageSrc} alt={sticker.name} />
          </div>
        ))}
      </div>
      <p className="drawer-footer drawer-footer--link">more sparkles <span>↗</span></p>
    </aside>
  );
}
