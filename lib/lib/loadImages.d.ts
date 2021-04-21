import { PreloadedImage } from "./useImages";
export declare const loadImages: (urls: Array<string | null> | object, onload: (images: Map<string, PreloadedImage>) => void, crossOrigin?: string | undefined) => void;
