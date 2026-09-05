import { createContext, useCallback, useContext, useMemo } from "react";
import type {
  PlacedSticker,
  StickerTemplate,
  WorkspaceContextValue,
  WorkspaceState,
  WithChildren,
} from "../types";
import { useHistory } from "../hooks/useHistory";

const defaultState: WorkspaceState = {
  selectedObjectId: "water-bottle",
  placedStickers: [],
  selectedStickerId: null,
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

let stickerIdCounter = 0;
function generateStickerId(): string {
  stickerIdCounter += 1;
  return `sticker-${Date.now()}-${stickerIdCounter}`;
}

export function WorkspaceProvider({ children }: WithChildren) {
  const { state, set, undo, redo, canUndo, canRedo } = useHistory<WorkspaceState>(defaultState);

  const selectObject = useCallback(
    (objectId: string | null) => {
      set((prev) => ({
        ...prev,
        selectedObjectId: objectId,
        placedStickers: [],
        selectedStickerId: null,
      }));
    },
    [set],
  );

  const placeSticker = useCallback(
    (template: StickerTemplate, x: number, y: number) => {
      const newSticker: PlacedSticker = {
        id: generateStickerId(),
        templateId: template.id,
        x,
        y,
        width: template.defaultWidth,
        rotation: 0,
        zIndex: state.placedStickers.length,
      };
      set((prev) => ({
        ...prev,
        placedStickers: [...prev.placedStickers, newSticker],
        selectedStickerId: newSticker.id,
      }));
    },
    [set, state.placedStickers.length],
  );

  const updateSticker = useCallback(
    (id: string, updates: Partial<Omit<PlacedSticker, "id" | "templateId">>) => {
      set((prev) => ({
        ...prev,
        placedStickers: prev.placedStickers.map((s) =>
          s.id === id ? { ...s, ...updates } : s,
        ),
      }));
    },
    [set],
  );

  const deleteSticker = useCallback(
    (id: string) => {
      set((prev) => ({
        ...prev,
        placedStickers: prev.placedStickers.filter((s) => s.id !== id),
        selectedStickerId: prev.selectedStickerId === id ? null : prev.selectedStickerId,
      }));
    },
    [set],
  );

  const selectSticker = useCallback(
    (id: string | null) => {
      set((prev) => ({ ...prev, selectedStickerId: id }));
    },
    [set],
  );

  const bringToFront = useCallback(
    (id: string) => {
      set((prev) => {
        const maxZ = prev.placedStickers.reduce((max, s) => Math.max(max, s.zIndex), -1);
        return {
          ...prev,
          placedStickers: prev.placedStickers.map((s) =>
            s.id === id ? { ...s, zIndex: maxZ + 1 } : s,
          ),
        };
      });
    },
    [set],
  );

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      state,
      selectObject,
      placeSticker,
      updateSticker,
      deleteSticker,
      selectSticker,
      bringToFront,
      undo,
      redo,
      canUndo,
      canRedo,
    }),
    [state, selectObject, placeSticker, updateSticker, deleteSticker, selectSticker, bringToFront, undo, redo, canUndo, canRedo],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return ctx;
}
