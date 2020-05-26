"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useImages_1 = require("./useImages");
const ImageContext_1 = require("./ImageContext");
exports.PreloadImages = ({ urls, crossOrigin, Waiting, Error, children }) => {
    const imageStates = useImages_1.useImages(urls, crossOrigin || null);
    const getKeysWithState = (state) => {
        return Array.from(imageStates.keys())
            .filter(key => imageStates.get(key).state === state);
    };
    const allLoaded = Array.from(imageStates.values())
        .filter(image => image.state !== useImages_1.PreloadedState.NULL)
        .every(image => image.state === useImages_1.PreloadedState.LOADED);
    const error = Array.from(imageStates.values())
        .some(image => image.state === useImages_1.PreloadedState.ERROR);
    if (error) {
        const invalidUrls = getKeysWithState(useImages_1.PreloadedState.ERROR);
        if (Error) {
            return (react_1.default.createElement(Error, { invalid: invalidUrls }));
        }
        else {
            return null;
        }
    }
    if (!allLoaded) {
        const loading = getKeysWithState(useImages_1.PreloadedState.LOADING);
        const loaded = getKeysWithState(useImages_1.PreloadedState.LOADED);
        if (Waiting) {
            return (react_1.default.createElement(Waiting, { loading: loading, loaded: loaded }));
        }
        else {
            return null;
        }
    }
    return (react_1.default.createElement(ImageContext_1.ImageContext.Provider, { value: imageStates }, children));
};
exports.default = exports.PreloadImages;
