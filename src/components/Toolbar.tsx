import { useWorkspace } from "../context/WorkspaceContext";
import "./Toolbar.css";

export function Toolbar() {
  const { undo, redo, canUndo, canRedo, state, deleteSticker } = useWorkspace();

  return (
    <div className="toolbar">
      <div className="toolbar__group">
        <button
          className="toolbar__btn"
          onClick={undo}
          disabled={!canUndo}
          title="Undo"
        >
          Undo
        </button>
        <button
          className="toolbar__btn"
          onClick={redo}
          disabled={!canRedo}
          title="Redo"
        >
          Redo
        </button>
      </div>
      <div className="toolbar__group">
        <button
          className="toolbar__btn toolbar__btn--danger"
          onClick={() => state.selectedStickerId && deleteSticker(state.selectedStickerId)}
          disabled={!state.selectedStickerId}
          title="Delete selected sticker"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
