import React, { cloneElement, FunctionComponent, ReactElement } from "react";
import { useImages, PreloadedState } from "./useImages";
import { ImageContext } from "./ImageContext";

interface Props {
    urls: Array<string | null> | object;
    crossOrigin?: string | null;
    Waiting?: ReactElement;
    Error?: ReactElement;
}

export const PreloadImages: FunctionComponent<Props> = ({ urls, crossOrigin, Waiting, Error, children }) => {
    const imageStates = useImages(urls, crossOrigin || null);

    const getKeysWithState = (state: PreloadedState) => {
        return Array.from(imageStates.keys()).filter((key) => imageStates.get(key)!.state === state);
    };

    const allLoaded = Array.from(imageStates.values())
        .filter((image) => image.state !== PreloadedState.NULL && image.state !== PreloadedState.ERROR)
        .every((image) => image.state === PreloadedState.LOADED);

    const error = Array.from(imageStates.values()).some((image) => image.state === PreloadedState.ERROR);

    if (error) {
        const invalidUrls = getKeysWithState(PreloadedState.ERROR);

        if (Error) {
            return cloneElement(Error, { invalid: invalidUrls });
        } else {
            return null;
        }
    }

    if (!allLoaded) {
        const loading = getKeysWithState(PreloadedState.LOADING);
        const loaded = getKeysWithState(PreloadedState.LOADED);
        if (Waiting) {
            return cloneElement(Waiting, { loading: loading, loaded: loaded });
        } else {
            return null;
        }
    }

    return <ImageContext.Provider value={imageStates}>{children}</ImageContext.Provider>;
};

export default PreloadImages;
