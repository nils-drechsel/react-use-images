"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useImages_1 = require("./useImages");
exports.loadImages = (urls, onload, crossOrigin) => {
    const images = useImages_1.createImageMap(urls);
    const state = useImages_1.getInitialState(images);
    if (Array.from(state.values()).filter(image => image.state !== useImages_1.PreloadedState.NULL).length == 0) {
        onload(state);
        return;
    }
    const checkLoaded = () => {
        if (Array.from(state.values()).every(image => image.state !== useImages_1.PreloadedState.LOADING)) {
            onload(state);
        }
    };
    images.forEach((url, key) => {
        if (!url)
            return;
        const img = document.createElement("img");
        img.onload = () => {
            state.set(key, { image: img, state: useImages_1.PreloadedState.LOADED, url: url });
            img.onload = null;
            checkLoaded();
        };
        img.onerror = () => {
            state.set(key, { image: img, state: useImages_1.PreloadedState.ERROR, url: url });
            img.onload = null;
            checkLoaded();
        };
        if (crossOrigin)
            img.crossOrigin = crossOrigin;
        img.src = url;
    });
};
