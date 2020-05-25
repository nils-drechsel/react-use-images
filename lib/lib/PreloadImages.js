"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const useImages_1 = require("./useImages");
exports.PreloadImages = (props) => {
    const imageStates = useImages_1.useImages(props.urls, props.crossOrigin || null);
    const getKeysWithState = (state) => {
        return Array.from(imageStates.keys())
            .filter(key => imageStates.get(key).state === state);
    };
    const allLoaded = Array.from(imageStates.values())
        .every(image => image.state === "loaded");
    const error = Array.from(imageStates.values())
        .some(image => image.state === "error");
    if (error) {
        const invalidUrls = getKeysWithState("error");
        if (props.Error) {
            const Error = props.Error;
            return (react_1.default.createElement(Error, { invalid: invalidUrls }));
        }
        else {
            return null;
        }
    }
    if (!allLoaded) {
        const loading = getKeysWithState("loading");
        const loaded = getKeysWithState("loaded");
        if (props.Waiting) {
            const Waiting = props.Waiting;
            return (react_1.default.createElement(Waiting, { loading: loading, loaded: loaded }));
        }
        else {
            return null;
        }
    }
    const childrenWithProps = react_1.default.Children.map(props.children, child => {
        const newProps = Object.assign({}, props, { imageStates });
        if (newProps.urls)
            delete newProps.urls;
        if (newProps.crossOrigin)
            delete newProps.crossOrigin;
        if (newProps.Waiting)
            delete newProps.Waiting;
        if (newProps.Error)
            delete newProps.Error;
        if (newProps.children)
            delete newProps.children;
        if (react_1.isValidElement(child)) {
            return react_1.cloneElement(child, newProps);
        }
        return child;
    });
    return (react_1.default.createElement("div", null, childrenWithProps));
};
exports.default = exports.PreloadImages;
