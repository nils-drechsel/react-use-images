"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
var PreloadedState;
(function (PreloadedState) {
    PreloadedState[PreloadedState["LOADING"] = 0] = "LOADING";
    PreloadedState[PreloadedState["LOADED"] = 1] = "LOADED";
    PreloadedState[PreloadedState["ERROR"] = 2] = "ERROR";
    PreloadedState[PreloadedState["NULL"] = 3] = "NULL";
})(PreloadedState = exports.PreloadedState || (exports.PreloadedState = {}));
exports.useImages = (urls, crossOrigin) => {
    const initialState = new Map();
    const images = new Map();
    if (urls instanceof Array) {
        urls.filter(url => !!url)
            .forEach(url => images.set(url, url));
    }
    else {
        Object.keys(urls)
            .filter(key => key in urls)
            .forEach(key => images.set(key, urls[key]));
    }
    images.forEach((url, key) => initialState.set(key, { image: null, state: url ? PreloadedState.LOADING : PreloadedState.NULL }));
    const [imagestates, setImageState] = react_1.useState(initialState);
    react_1.useEffect(() => {
        images.forEach((url, key) => {
            if (!url)
                return;
            const img = document.createElement("Img");
            img.onload = () => {
                setImageState((state) => {
                    const newState = new Map(state);
                    newState.set(key, { image: img, state: PreloadedState.LOADED });
                    return newState;
                });
            };
            img.onerror = () => {
                setImageState((state) => {
                    const newState = new Map(state);
                    newState.set(key, { image: null, state: PreloadedState.ERROR });
                    return newState;
                });
            };
            if (crossOrigin)
                img.crossOrigin = crossOrigin;
            img.src = url;
        });
        return () => {
            images.forEach((url, key) => {
                if (!url)
                    return;
                const img = imagestates.get(key).image;
                if (img) {
                    img.onload = null;
                    img.onerror = null;
                }
            });
        };
    }, []);
    return imagestates;
};
