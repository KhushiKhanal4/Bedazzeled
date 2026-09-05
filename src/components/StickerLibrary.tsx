import { stickerLibrary } from "../data/stickers";
import { useWorkspace } from "../context/WorkspaceContext";
import "./StickerLibrary.css";

export function StickerLibrary() {
  const { state } = useWorkspace();

  return (
    <aside className="sticker-library">
      <h2 className="sticker-library__title">Stickers</h2>
      {stickerLibrary.length === 0 ? (
        <p className="sticker-library__empty">
          No stickers yet. Add sticker assets to the library to get started.
        </p>
      ) : (
        <div className="sticker-library__grid">
          {stickerLibrary.map((sticker) => (
            <div
              key={sticker.id}
              className="sticker-library__item"
              title={sticker.name}
            >
              <img
                src={sticker.imageSrc}
                alt={sticker.name}
                className="sticker-library__image"
              />
            </div>
          ))}
        </div>
      )}
      {!state.selectedObjectId && (
        <p className="sticker-library__hint">Select an object first to start decorating.</p>
      )}
    </aside>
  );
}
