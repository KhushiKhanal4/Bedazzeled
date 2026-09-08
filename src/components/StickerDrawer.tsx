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
          <div
            className="sticker-slot"
            key={sticker.id}
            title={sticker.name}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("application/x-bedazzle-sticker", sticker.id);
              event.dataTransfer.effectAllowed = "copy";
              const image = event.currentTarget.querySelector("img");
              if (image) {
                const preview = document.createElement("canvas");
                const previewWidth = 60;
                preview.width = previewWidth;
                preview.height = Math.round(previewWidth * ((image.naturalHeight || 1) / (image.naturalWidth || 1)));
                const context = preview.getContext("2d");
                if (context) {
                  context.drawImage(image, 0, 0, preview.width, preview.height);
                  const pixels = context.getImageData(0, 0, preview.width, preview.height);
                  for (let index = 0; index < pixels.data.length; index += 4) {
                    if (pixels.data[index] > 242 && pixels.data[index + 1] > 242 && pixels.data[index + 2] > 242) {
                      pixels.data[index + 3] = 0;
                    }
                  }
                  context.putImageData(pixels, 0, 0);
                  preview.style.position = "fixed";
                  preview.style.left = "-1000px";
                  document.body.appendChild(preview);
                  event.dataTransfer.setDragImage(preview, preview.width / 2, preview.height / 2);
                  window.setTimeout(() => preview.remove(), 0);
                }
              }
              event.currentTarget.classList.add("sticker-slot--dragging");
            }}
            onDragEnd={(event) => event.currentTarget.classList.remove("sticker-slot--dragging")}
          >
            <img src={sticker.imageSrc} alt={sticker.name} />
          </div>
        ))}
      </div>
      <p className="drawer-footer drawer-footer--link">more sparkles <span>↗</span></p>
    </aside>
  );
}
