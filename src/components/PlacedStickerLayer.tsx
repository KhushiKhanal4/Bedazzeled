import { useWorkspace } from "../context/WorkspaceContext";
import { getStickerTemplateById } from "../data/stickers";
import type { PlacedSticker } from "../types";
import "./PlacedStickerLayer.css";

/**
 * Renders all placed stickers on top of the selected object.
 *
 * This component is a structural shell — it renders stickers in their
 * stored position/rotation/size but does not yet wire up drag, resize,
 * rotate, or delete interactions. Those will be added in a later phase.
 */
export function PlacedStickerLayer() {
  const { state } = useWorkspace();

  const sorted = [...state.placedStickers].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="sticker-layer">
      {sorted.map((sticker: PlacedSticker) => {
        const template = getStickerTemplateById(sticker.templateId);
        if (!template) return null;
        const aspectRatio = template.naturalHeight / template.naturalWidth;
        return (
          <div
            key={sticker.id}
            className={`sticker-layer__item ${
              state.selectedStickerId === sticker.id ? "sticker-layer__item--selected" : ""
            }`}
            style={{
              left: `${sticker.x}px`,
              top: `${sticker.y}px`,
              width: `${sticker.width}px`,
              height: `${sticker.width * aspectRatio}px`,
              transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
              zIndex: sticker.zIndex,
            }}
          >
            <img
              src={template.imageSrc}
              alt={template.name}
              className="sticker-layer__image"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
