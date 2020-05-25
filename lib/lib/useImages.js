"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.useImages = (urls, crossOrigin) => {
    const initialState = new Map();
    urls.filter(url => !!url)
        .forEach((url) => initialState.set(url, { image: null, state: "loading" }));
    const [imagestates, setImageState] = react_1.useState(initialState);
    react_1.useEffect(() => {
        urls.filter(url => !!url)
            .forEach(url => {
            const img = document.createElement("Img");
            img.onload = () => {
                setImageState((state) => {
                    const newState = new Map(state);
                    newState.set(url, { image: img, state: "loaded" });
                    return newState;
                });
            };
            img.onerror = () => {
                setImageState((state) => {
                    const newState = new Map(state);
                    newState.set(url, { image: null, state: "error" });
                    return newState;
                });
            };
            if (crossOrigin)
                img.crossOrigin = crossOrigin;
            img.src = url;
        });
        return () => {
            urls.filter(url => !!url)
                .forEach(url => {
                const img = imagestates.get(url).image;
                img.onload = null;
                img.onerror = null;
            });
        };
    }, [urls, crossOrigin]);
    return imagestates;
};
