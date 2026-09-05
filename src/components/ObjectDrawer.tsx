import { decoratableObjects } from "../data/objects";
import { useWorkspace } from "../context/WorkspaceContext";
import "./ObjectDrawer.css";

export function ObjectDrawer() {
  const { state, selectObject } = useWorkspace();

  return (
    <aside className="drawer object-drawer">
      <div className="drawer-heading">
        <span>pick your victim</span>
        <span className="heading-mark">♡</span>
      </div>
      <div className="object-grid">
        {decoratableObjects.map((object) => (
          <button
            type="button"
            key={object.id}
            className={`object-card ${state.selectedObjectId === object.id ? "object-card--selected" : ""}`}
            onClick={() => selectObject(object.id)}
          >
            <span className="object-card__image-wrap">
              <img src={object.imageSrc} alt={object.name} />
            </span>
            <span className="object-card__name">{object.name}</span>
          </button>
        ))}
      </div>
      <p className="drawer-footer">more coming soon... <span>✧</span></p>
    </aside>
  );
}
