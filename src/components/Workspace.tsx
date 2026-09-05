import { landscapeBackground, workspaceBackground } from "../data/objects";
import { useWorkspace } from "../context/WorkspaceContext";
import { getObjectById } from "../data/objects";
import { PlacedStickerLayer } from "./PlacedStickerLayer";
import "./Workspace.css";

export function Workspace() {
  const { state } = useWorkspace();
  const selectedObject = state.selectedObjectId ? getObjectById(state.selectedObjectId) : null;

  return (
    <main className="scene" style={{ backgroundImage: `url("${landscapeBackground}")` }}>
      <img className="scene__platform" src={workspaceBackground} alt="" aria-hidden="true" />
      <div className="scene__object-wrap">
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
