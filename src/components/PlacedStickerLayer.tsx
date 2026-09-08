import { useRef } from "react";
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
  const { state, selectSticker, updateSticker } = useWorkspace();
  const dragRef = useRef<{ id: string; x: number; y: number; clientX: number; clientY: number } | null>(null);

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
            onPointerDown={(event) => {
              event.stopPropagation();
              selectSticker(sticker.id);
              dragRef.current = { id: sticker.id, x: sticker.x, y: sticker.y, clientX: event.clientX, clientY: event.clientY };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              const drag = dragRef.current;
              if (!drag || drag.id !== sticker.id) return;
              updateSticker(sticker.id, { x: drag.x + event.clientX - drag.clientX, y: drag.y + event.clientY - drag.clientY });
            }}
            onPointerUp={() => { dragRef.current = null; }}
          >
            <img
              src={template.imageSrc}
              alt={template.name}
              className="sticker-layer__image"
              draggable={false}
            />
            {state.selectedStickerId === sticker.id && (
              <>
                <button
                  type="button"
                  className="sticker-layer__resize"
                  aria-label={`Resize ${template.name}`}
                  onPointerDown={(event) => {
                  event.stopPropagation();
                  const startWidth = sticker.width;
                  const startX = event.clientX;
                  const move = (moveEvent: PointerEvent) => updateSticker(sticker.id, { width: Math.max(24, startWidth + moveEvent.clientX - startX) });
                  const stop = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", stop); };
                  window.addEventListener("pointermove", move);
                  window.addEventListener("pointerup", stop);
                  }}
                />
                <button
                  type="button"
                  className="sticker-layer__rotate"
                  aria-label={`Rotate ${template.name}`}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    const box = event.currentTarget.parentElement!.getBoundingClientRect();
                    const centerX = box.left + box.width / 2;
                    const centerY = box.top + box.height / 2;
                    const startAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
                    const startRotation = sticker.rotation;
                    const move = (moveEvent: PointerEvent) => {
                      const angle = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX);
                      updateSticker(sticker.id, { rotation: startRotation + (angle - startAngle) * 180 / Math.PI });
                    };
                    const stop = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", stop); };
                    window.addEventListener("pointermove", move);
                    window.addEventListener("pointerup", stop);
                  }}
                >
                  ↻
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
