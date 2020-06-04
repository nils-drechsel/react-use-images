import { createImageMap, getInitialState, PreloadedImage, PreloadedState } from "./useImages";
import PreloadImages from "./PreloadImages";






export const loadImages = (urls: Array<string | null> | object, onload: (images: Map<string, PreloadedImage>) => void, crossOrigin?: string) => {

    const images = createImageMap(urls);

    const state = getInitialState(images);

    if (Array.from(state.values()).filter(image => image.state !== PreloadedState.NULL).length == 0) {
        onload(state);
        return;
    }

    const checkLoaded = () => {
        if (Array.from(state.values()).every(image => image.state !== PreloadedState.LOADING)) {
            onload(state);
        }
    }

    images.forEach((url, key) => {
        if (!url) return;
        const img = document.createElement("img") as HTMLImageElement;
        img.onload = () => {
            state.set(key, { image: img, state: PreloadedState.LOADED, url: url })
            img.onload = null;
            checkLoaded();
        }

        img.onerror = () => {
            state.set(key, { image: img, state: PreloadedState.ERROR, url: url })
            img.onload = null;
            checkLoaded();
        }

        if (crossOrigin) img.crossOrigin = crossOrigin;
        img.src = url;

    });




}