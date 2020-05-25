"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
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
    images.forEach((url, key) => initialState.set(key, { image: null, state: "loading" }));
    const [imagestates, setImageState] = react_1.useState(initialState);
    console.log("images: ", images);
    console.log("imagestates: ", imagestates);
    react_1.useEffect(() => {
        images.forEach((url, key) => {
            const img = document.createElement("Img");
            img.onload = () => {
                setImageState((state) => {
                    const newState = new Map(state);
                    newState.set(key, { image: img, state: "loaded" });
                    return newState;
                });
            };
            img.onerror = () => {
                setImageState((state) => {
                    const newState = new Map(state);
                    newState.set(key, { image: null, state: "error" });
                    return newState;
                });
            };
            if (crossOrigin)
                img.crossOrigin = crossOrigin;
            img.src = url;
        });
        return () => {
            images.forEach((url, key) => {
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
