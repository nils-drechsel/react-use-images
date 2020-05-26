import React, { FunctionComponent, isValidElement, cloneElement, ReactElement } from 'react';
import { useImages, PreloadedState } from "./useImages";
import { ImageContext } from "./ImageContext";

type Props = {
    urls: Array<string | null> | object,
    crossOrigin?: string | null,
    Waiting?: any,
    Error?: any,
}






export const PreloadImages: FunctionComponent<Props> = ({ urls, crossOrigin, Waiting, Error, children }) => {

    const imageStates = useImages(urls, crossOrigin || null);

    const getKeysWithState = (state: PreloadedState) => {
        return Array.from(imageStates.keys())
            .filter(key => imageStates.get(key)!.state === state);
    }


    const allLoaded =
        Array.from(imageStates.values())
            .filter(image => image.state !== PreloadedState.NULL)
            .every(image => image.state === PreloadedState.LOADED);

    const error =
        Array.from(imageStates.values())
            .some(image => image.state === PreloadedState.ERROR);


    if (error) {
        const invalidUrls = getKeysWithState(PreloadedState.ERROR);


        if (Error) {
            return (
                <Error
                    invalid={invalidUrls}
                />
            )
        } else {
            return null;
        }
    }

    if (!allLoaded) {
        const loading = getKeysWithState(PreloadedState.LOADING);
        const loaded = getKeysWithState(PreloadedState.LOADED);
        if (Waiting) {
            return (
                <Waiting
                    loading={loading}
                    loaded={loaded}
                />
            )
        } else {
            return null;
        }
    }




    return (
        <ImageContext.Provider value={imageStates}>
            {children}
        </ImageContext.Provider>
    )

}

export default PreloadImages;