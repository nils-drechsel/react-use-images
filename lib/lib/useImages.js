"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const fast_equals_1 = require("fast-equals");
var PreloadedState;
(function (PreloadedState) {
    PreloadedState[PreloadedState["LOADING"] = 0] = "LOADING";
    PreloadedState[PreloadedState["LOADED"] = 1] = "LOADED";
    PreloadedState[PreloadedState["ERROR"] = 2] = "ERROR";
    PreloadedState[PreloadedState["NULL"] = 3] = "NULL";
})(PreloadedState = exports.PreloadedState || (exports.PreloadedState = {}));
const createImageMap = (urls) => {
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
    return images;
};
const getInitialState = (images) => {
    const initialState = new Map();
    images.forEach((url, key) => initialState.set(key, { image: null, state: url ? PreloadedState.LOADING : PreloadedState.NULL, url: url }));
    return initialState;
};
exports.useImages = (urls, crossOrigin) => {
    const initialState = new Map();
    const [images, setImages] = react_1.useState(createImageMap(urls));
    const prevUrlsRef = react_1.useRef(null);
    const [imagestates, setImageState] = react_1.useState(getInitialState(images));
    react_1.useEffect(() => {
        images.forEach((url, key) => {
            if (!url)
                return;
            const img = document.createElement("img");
            img.onload = () => {
                setImageState((state) => {
                    const newState = new Map(state);
                    newState.set(key, { image: img, state: PreloadedState.LOADED, url: url });
                    return newState;
                });
            };
            img.onerror = () => {
                setImageState((state) => {
                    const newState = new Map(state);
                    newState.set(key, { image: null, state: PreloadedState.ERROR, url: url });
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
    }, [images, crossOrigin]);
    react_1.useEffect(() => {
        if (!fast_equals_1.shallowEqual(prevUrlsRef.current, urls)) {
            prevUrlsRef.current = urls;
            setImages(createImageMap(urls));
            setImageState(getInitialState(images));
        }
    }, [urls]);
    return imagestates;
};
