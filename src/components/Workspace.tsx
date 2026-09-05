import { useWorkspace } from "../context/WorkspaceContext";
import { getObjectById } from "../data/objects";
import { PlacedStickerLayer } from "./PlacedStickerLayer";
import { Toolbar } from "./Toolbar";
import "./Workspace.css";

export function Workspace() {
  const { state } = useWorkspace();
  const selectedObject = state.selectedObjectId ? getObjectById(state.selectedObjectId) : null;

  return (
    <main className="workspace">
      <Toolbar />
      <div className="workspace__stage">
        {selectedObject ? (
          <div className="workspace__object-container">
            <img
              src={selectedObject.imageSrc}
              alt={selectedObject.name}
              className="workspace__object-image"
              draggable={false}
            />
            <PlacedStickerLayer />
          </div>
        ) : (
          <div className="workspace__empty-state">
            <p className="workspace__empty-text">
              Select an object from the left to start bedazzling
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
