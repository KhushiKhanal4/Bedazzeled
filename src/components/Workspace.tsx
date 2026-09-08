import { landscapeBackground, workspaceBackground } from "../data/objects";
import { useEffect } from "react";
import { useWorkspace } from "../context/WorkspaceContext";
import { getObjectById } from "../data/objects";
import { getStickerTemplateById } from "../data/stickers";
import { PlacedStickerLayer } from "./PlacedStickerLayer";
import "./Workspace.css";

export function Workspace() {
  const { state, placeSticker, selectSticker } = useWorkspace();
  const selectedObject = state.selectedObjectId ? getObjectById(state.selectedObjectId) : null;

  useEffect(() => {
    const clearSelection = (event: PointerEvent) => {
      if (!(event.target as Element).closest(".sticker-layer__item")) selectSticker(null);
    };
    document.addEventListener("pointerdown", clearSelection);
    return () => document.removeEventListener("pointerdown", clearSelection);
  }, [selectSticker]);

  return (
    <main
      className="scene"
      style={{ backgroundImage: `url("${landscapeBackground}")` }}
      onDragOver={(event) => event.preventDefault()}
      onClick={() => selectSticker(null)}
      onDrop={(event) => {
        const template = getStickerTemplateById(event.dataTransfer.getData("application/x-bedazzle-sticker"));
        if (!template) return;
        const lost = document.createElement("img");
        lost.src = template.imageSrc;
        lost.className = "scene__lost-stone";
        lost.style.left = `${event.clientX - 30}px`;
        lost.style.top = `${event.clientY - 30}px`;
        document.body.appendChild(lost);
        window.setTimeout(() => lost.remove(), 900);
      }}
    >
      <img className="scene__platform" src={workspaceBackground} alt="" aria-hidden="true" />
      <div
        key={selectedObject?.id ?? "empty"}
        className={`scene__object-wrap scene__object-wrap--${selectedObject?.id ?? "empty"}`}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const template = getStickerTemplateById(event.dataTransfer.getData("application/x-bedazzle-sticker"));
          if (!template || !selectedObject) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const objectImage = event.currentTarget.querySelector<HTMLImageElement>(".scene__object");
          const imageRect = objectImage?.getBoundingClientRect();
          const objectHitRect = imageRect && {
            left: imageRect.left + imageRect.width * .30,
            right: imageRect.right - imageRect.width * .30,
            top: imageRect.top + imageRect.height * .08,
            bottom: imageRect.bottom - imageRect.height * .08,
          };
          if (
            objectHitRect &&
            (event.clientX < objectHitRect.left || event.clientX > objectHitRect.right ||
              event.clientY < objectHitRect.top || event.clientY > objectHitRect.bottom)
          ) return;
          event.stopPropagation();
          placeSticker(template, event.clientX - rect.left, event.clientY - rect.top);
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="scene__object-shadow" aria-hidden="true" />
        {selectedObject && (
          <img
            src={selectedObject.imageSrc}
            alt={selectedObject.name}
            className="scene__object"
            draggable={false}
          />
        )}
        <PlacedStickerLayer />
      </div>
      <div className="scene__soft-glow" aria-hidden="true" />
    </main>
  );
}
