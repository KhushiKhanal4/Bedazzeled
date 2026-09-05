import type { DecoratableObject } from "../types";
import { decoratableObjects } from "../data/objects";
import { useWorkspace } from "../context/WorkspaceContext";
import "./ObjectGallery.css";

export function ObjectGallery() {
  const { state, selectObject } = useWorkspace();

  return (
    <aside className="object-gallery">
      <h2 className="object-gallery__title">Choose an Object</h2>
      <div className="object-gallery__grid">
        {decoratableObjects.map((obj: DecoratableObject) => (
          <button
            key={obj.id}
            className={`object-gallery__item ${
              state.selectedObjectId === obj.id ? "object-gallery__item--selected" : ""
            }`}
            onClick={() => selectObject(obj.id)}
          >
            <img src={obj.imageSrc} alt={obj.name} className="object-gallery__image" />
            <span className="object-gallery__label">{obj.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
