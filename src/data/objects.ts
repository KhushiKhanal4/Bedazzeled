import type { DecoratableObject } from "../types";

/**
 * Catalog of decoratable objects, sourced from the existing repository assets.
 * Images are imported so Vite handles hashing and serving them correctly.
 */
import bgWithPlatform from "../../bedazzeled-assets/objects/bg with platform.png";
import landscapeBackgroundImage from "../../bedazzeled-assets/objects/bg.png";
import cameraImg from "../../bedazzeled-assets/objects/camera.png";
import iphoneImg from "../../bedazzeled-assets/objects/i-phone.png";
import laptopImg from "../../bedazzeled-assets/objects/laptop.png";
import mirrorImg from "../../bedazzeled-assets/objects/mirror.png";
import waterBottleImg from "../../bedazzeled-assets/objects/water-bottle.png";

export const decoratableObjects: DecoratableObject[] = [
  {
    id: "water-bottle",
    name: "Water Bottle",
    imageSrc: waterBottleImg,
    naturalWidth: 3258,
    naturalHeight: 4344,
  },
  {
    id: "laptop",
    name: "Laptop",
    imageSrc: laptopImg,
    naturalWidth: 2352,
    naturalHeight: 2235,
  },
  {
    id: "iphone",
    name: "iPhone",
    imageSrc: iphoneImg,
    naturalWidth: 1482,
    naturalHeight: 2235,
  },
  {
    id: "mirror",
    name: "Mirror",
    imageSrc: mirrorImg,
    naturalWidth: 2097,
    naturalHeight: 2235,
  },
  {
    id: "camera",
    name: "Camera",
    imageSrc: cameraImg,
    naturalWidth: 2097,
    naturalHeight: 2235,
  },
];

/** Full-page landscape image used as the visual backdrop */
export const landscapeBackground = landscapeBackgroundImage;

/** Landscape image with the central pedestal composition */
export const workspaceBackground = bgWithPlatform;

/** Look up an object by id */
export function getObjectById(id: string): DecoratableObject | undefined {
  return decoratableObjects.find((obj) => obj.id === id);
}
