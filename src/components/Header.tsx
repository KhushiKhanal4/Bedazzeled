import "./Header.css";
import { useWorkspace } from "../context/WorkspaceContext";
import { useEffect } from "react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Camera, Download, Redo2, Share2, Trash2, Undo2 } from "lucide-react";

export function Header() {
  const { undo, redo, canUndo, canRedo, state, deleteSticker } = useWorkspace();
  const [captureUrl, setCaptureUrl] = useState<string | null>(null);

  const capture = async () => {
    const scene = document.querySelector<HTMLElement>(".scene");
    if (!scene) return;
    scene.classList.add("scene--capturing");
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const source = await html2canvas(scene, { useCORS: true, backgroundColor: null, scale: 2 });
    scene.classList.remove("scene--capturing");
    const objectWrap = scene.querySelector<HTMLElement>(".scene__object-wrap");
    const objectWidth = objectWrap ? objectWrap.getBoundingClientRect().width * 2.4 : 0;
    const cropWidth = Math.min(source.width, Math.max(Math.round(source.height * .68), Math.round(objectWidth)));
    const portrait = document.createElement("canvas");
    portrait.width = cropWidth;
    portrait.height = source.height;
    portrait.getContext("2d")?.drawImage(source, (source.width - cropWidth) / 2, 0, cropWidth, source.height, 0, 0, cropWidth, source.height);
    setCaptureUrl(portrait.toDataURL("image/png"));
  };

  const shareImage = async () => {
    if (!captureUrl) return;
    const response = await fetch(captureUrl);
    const blob = await response.blob();
    const file = new File([blob], "my-bedazzled-art.png", { type: "image/png" });
    if (!navigator.share) {
      window.alert("OS sharing is not available in this browser. Download the image to share it manually.");
      return;
    }
    if (!navigator.canShare || navigator.canShare({ files: [file] })) {
      await navigator.share({ title: "My bedazzled art", files: [file] });
    } else {
      await navigator.share({ title: "My bedazzled art", text: "Check out my bedazzled art!" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "z") {
        event.preventDefault();
        undo();
      } else if (event.ctrlKey && event.key.toLowerCase() === "y") {
        event.preventDefault();
        redo();
      } else if (event.key === "Delete" && state.selectedStickerId) {
        event.preventDefault();
        deleteSticker(state.selectedStickerId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, deleteSticker, state.selectedStickerId]);

  return (
    <header className="site-header">
      <div className="brand" aria-label="Bedazzle your things">
        <span className="brand__name">bedazzle <b>✧</b></span>
        <span className="brand__tagline">your things <b>♥</b></span>
      </div>

      <div className="tip-pill">+ drag, stick, sparkle <span>✦</span> +</div>

      <nav className="header-actions" aria-label="Visual controls">
        <button type="button" className="header-action capture-button" onClick={capture}>
          <Camera size={20} />
          <span>capture</span>
        </button>
        <button type="button" className="header-action" onClick={undo} disabled={!canUndo}>
          <Undo2 size={21} />
          <span>undo</span>
        </button>
        <button type="button" className="header-action" onClick={redo} disabled={!canRedo}>
          <Redo2 size={21} />
          <span>redo</span>
        </button>
        <button
          type="button"
          className="header-action header-action--clear"
          onClick={() => state.selectedStickerId && deleteSticker(state.selectedStickerId)}
          disabled={!state.selectedStickerId}
          title="Delete selected gem"
        >
          <Trash2 size={21} />
          <span>delete</span>
        </button>
      </nav>
      {captureUrl && (
        <div className="capture-modal" onClick={() => setCaptureUrl(null)}>
          <div className="capture-card" onClick={(event) => event.stopPropagation()}>
            <img src={captureUrl} alt="Your bedazzled artwork" />
            <div className="capture-actions">
              <a href={captureUrl} download="my-bedazzled-art.png" aria-label="Download artwork"><Download size={17} /> <span>download</span></a>
              <button type="button" onClick={shareImage} aria-label="Share artwork"><Share2 size={17} /> <span>share</span></button>
              {/* Native sharing remains available on supported mobile browsers. */}
              {/* <button type="button" onClick={async () => {
                const response = await fetch(captureUrl);
                const blob = await response.blob();
                if (navigator.share && navigator.canShare?.({ files: [new File([blob], "bedazzled-art.png", { type: blob.type })] })) {
                  await navigator.share({ title: "My bedazzled art", files: [new File([blob], "bedazzled-art.png", { type: blob.type })] });
                } else {
                  window.open(`https://wa.me/?text=${encodeURIComponent("Check out my bedazzled art!")}`, "_blank");
                }
              }}>share</button> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
