import type { StickerTemplate } from "../types";

import blueCircle from "../../bedazzeled-assets/stickers/blue circle.png";
import blueHeart from "../../bedazzeled-assets/stickers/blue heart.png";
import bow from "../../bedazzeled-assets/stickers/bow.png";
import butterfly from "../../bedazzeled-assets/stickers/Butterfly.png";
import darkPinkCircle from "../../bedazzeled-assets/stickers/dark pink circle.png";
import darkPinkFlower from "../../bedazzeled-assets/stickers/dark pink flower.png";
import goldenStar from "../../bedazzeled-assets/stickers/golden star.png";
import greenFlower from "../../bedazzeled-assets/stickers/green flower.png";
import lightPinkFlower from "../../bedazzeled-assets/stickers/light pink flower.png";
import pearl from "../../bedazzeled-assets/stickers/pearl.png";
import pinkCircle from "../../bedazzeled-assets/stickers/pink circle.png";
import pinkHeart from "../../bedazzeled-assets/stickers/pink heart.png";
import purpleHeart from "../../bedazzeled-assets/stickers/purple heart.png";
import purpleStar from "../../bedazzeled-assets/stickers/purple star.png";
import silverCircle from "../../bedazzeled-assets/stickers/silver circle.png";
import silverStar from "../../bedazzeled-assets/stickers/silver star.png";
import smiley from "../../bedazzeled-assets/stickers/Smiley.png";

export const stickerLibrary: StickerTemplate[] = [
  { id: "blue-circle", name: "Blue Circle", imageSrc: blueCircle, defaultWidth: 60, naturalWidth: 658, naturalHeight: 388 },
  { id: "blue-heart", name: "Blue Heart", imageSrc: blueHeart, defaultWidth: 60, naturalWidth: 658, naturalHeight: 542 },
  { id: "bow", name: "Bow", imageSrc: bow, defaultWidth: 60, naturalWidth: 658, naturalHeight: 542 },
  { id: "butterfly", name: "Butterfly", imageSrc: butterfly, defaultWidth: 60, naturalWidth: 658, naturalHeight: 602 },
  { id: "dark-pink-circle", name: "Dark Pink Circle", imageSrc: darkPinkCircle, defaultWidth: 60, naturalWidth: 658, naturalHeight: 482 },
  { id: "dark-pink-flower", name: "Dark Pink Flower", imageSrc: darkPinkFlower, defaultWidth: 60, naturalWidth: 658, naturalHeight: 542 },
  { id: "golden-star", name: "Golden Star", imageSrc: goldenStar, defaultWidth: 60, naturalWidth: 658, naturalHeight: 602 },
  { id: "green-flower", name: "Green Flower", imageSrc: greenFlower, defaultWidth: 60, naturalWidth: 658, naturalHeight: 482 },
  { id: "light-pink-flower", name: "Light Pink Flower", imageSrc: lightPinkFlower, defaultWidth: 60, naturalWidth: 658, naturalHeight: 648 },
  { id: "pearl", name: "Pearl", imageSrc: pearl, defaultWidth: 60, naturalWidth: 658, naturalHeight: 602 },
  { id: "pink-circle", name: "Pink Circle", imageSrc: pinkCircle, defaultWidth: 60, naturalWidth: 658, naturalHeight: 602 },
  { id: "pink-heart", name: "Pink Heart", imageSrc: pinkHeart, defaultWidth: 60, naturalWidth: 628, naturalHeight: 654 },
  { id: "purple-heart", name: "Purple Heart", imageSrc: purpleHeart, defaultWidth: 60, naturalWidth: 658, naturalHeight: 602 },
  { id: "purple-star", name: "Purple Star", imageSrc: purpleStar, defaultWidth: 60, naturalWidth: 658, naturalHeight: 482 },
  { id: "silver-circle", name: "Silver Circle", imageSrc: silverCircle, defaultWidth: 60, naturalWidth: 658, naturalHeight: 542 },
  { id: "silver-star", name: "Silver Star", imageSrc: silverStar, defaultWidth: 60, naturalWidth: 658, naturalHeight: 648 },
  { id: "smiley", name: "Smiley", imageSrc: smiley, defaultWidth: 60, naturalWidth: 658, naturalHeight: 482 },
];

/** Look up a sticker template by id */
export function getStickerTemplateById(id: string): StickerTemplate | undefined {
  return stickerLibrary.find((s) => s.id === id);
}
