import type { StickerTemplate } from "../types";

/**
 * Sticker library — placeholder structure.
 *
 * No sticker image assets exist in the repository yet, so this array is
 * intentionally empty. When sticker assets are added (PNGs, SVGs, or inline
 * data URIs), append StickerTemplate entries here and they will automatically
 * appear in the StickerLibrary component.
 */
export const stickerLibrary: StickerTemplate[] = [];

/** Look up a sticker template by id */
export function getStickerTemplateById(id: string): StickerTemplate | undefined {
  return stickerLibrary.find((s) => s.id === id);
}
