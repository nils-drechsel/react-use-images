"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadImages = void 0;
const react_1 = __importStar(require("react"));
const useImages_1 = require("./useImages");
const ImageContext_1 = require("./ImageContext");
const PreloadImages = ({ urls, crossOrigin, Waiting, Error, children }) => {
    const imageStates = useImages_1.useImages(urls, crossOrigin || null);
    const getKeysWithState = (state) => {
        return Array.from(imageStates.keys()).filter((key) => imageStates.get(key).state === state);
    };
    const allLoaded = Array.from(imageStates.values())
        .filter((image) => image.state !== useImages_1.PreloadedState.NULL && image.state !== useImages_1.PreloadedState.ERROR)
        .every((image) => image.state === useImages_1.PreloadedState.LOADED);
    const error = Array.from(imageStates.values()).some((image) => image.state === useImages_1.PreloadedState.ERROR);
    if (error) {
        const invalidUrls = getKeysWithState(useImages_1.PreloadedState.ERROR);
        if (Error) {
            return react_1.cloneElement(Error, { invalid: invalidUrls });
        }
        else {
            return null;
        }
    }
    if (!allLoaded) {
        const loading = getKeysWithState(useImages_1.PreloadedState.LOADING);
        const loaded = getKeysWithState(useImages_1.PreloadedState.LOADED);
        if (Waiting) {
            return react_1.cloneElement(Waiting, { loading: loading, loaded: loaded });
        }
        else {
            return null;
        }
    }
    return react_1.default.createElement(ImageContext_1.ImageContext.Provider, { value: imageStates }, children);
};
exports.PreloadImages = PreloadImages;
exports.default = exports.PreloadImages;
