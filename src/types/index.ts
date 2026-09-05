import type { ReactNode } from "react";

/** A decoratable object the user can select (camera, laptop, mirror, etc.) */
export interface DecoratableObject {
  id: string;
  name: string;
  /** Path to the object's image asset */
  imageSrc: string;
  /** Natural pixel dimensions of the source image */
  naturalWidth: number;
  naturalHeight: number;
}

/** A sticker template the user can drag from the library onto an object */
export interface StickerTemplate {
  id: string;
  name: string;
  /** Path to the sticker's image asset (or SVG data URI) */
  imageSrc: string;
  /** Default width in workspace pixels when first placed */
  defaultWidth: number;
  naturalWidth: number;
  naturalHeight: number;
}

/** A sticker that has been placed on the workspace */
export interface PlacedSticker {
  id: string;
  /** Which sticker template this is an instance of */
  templateId: string;
  /** Center position relative to the workspace, in pixels */
  x: number;
  y: number;
  /** Width in workspace pixels (height derived from aspect ratio) */
  width: number;
  /** Rotation in degrees, 0–360 */
  rotation: number;
  /** Z-order for stacking; higher = on top */
  zIndex: number;
}

/** The complete serializable state of the decorating workspace */
export interface WorkspaceState {
  /** Currently selected object, or null if none selected */
  selectedObjectId: string | null;
  /** All stickers placed on the current object */
  placedStickers: PlacedSticker[];
  /** The sticker currently being interacted with, or null */
  selectedStickerId: string | null;
}

/** Props for the WorkspaceContext provider */
export interface WorkspaceContextValue {
  state: WorkspaceState;
  /** Select a decoratable object by id (clears stickers) */
  selectObject: (objectId: string | null) => void;
  /** Add a sticker template to the workspace at a position */
  placeSticker: (template: StickerTemplate, x: number, y: number) => void;
  /** Update a placed sticker's properties */
  updateSticker: (id: string, updates: Partial<Omit<PlacedSticker, "id" | "templateId">>) => void;
  /** Remove a placed sticker */
  deleteSticker: (id: string) => void;
  /** Select a placed sticker */
  selectSticker: (id: string | null) => void;
  /** Bring a sticker to the front */
  bringToFront: (id: string) => void;
  /** Undo the last action */
  undo: () => void;
  /** Redo a previously undone action */
  redo: () => void;
  /** Whether undo is available */
  canUndo: boolean;
  /** Whether redo is available */
  canRedo: boolean;
}

/** Generic component prop with children */
export interface WithChildren {
  children: ReactNode;
}
