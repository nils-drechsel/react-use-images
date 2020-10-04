import { useEffect, useState, useRef } from 'react';
import { shallowEqual } from "fast-equals"


export type PreloadedImage = {
    image: HTMLImageElement | null,
    state: PreloadedState,
    url: string | null,
}

export enum PreloadedState {
    LOADING,
    LOADED,
    ERROR,
    NULL,
}

export const createImageMap = (urls: Array<string | null> | object) => {
    const images: Map<string, string> = new Map();

    if (urls instanceof Array) {
        urls.filter(url => !!url)
            .forEach(url => images.set(url!, url!));
    } else {
        Object.keys(urls)
            .filter(key => key in urls)
            .forEach(key => images.set(key, (urls as any)[key]))
    }

    return images;
}

export const getInitialState = (images: Map<string, string>): Map<string, PreloadedImage> => {
    const initialState: Map<string, PreloadedImage> = new Map();
    images.forEach((url, key) => initialState.set(key, { image: null, state: url ? PreloadedState.LOADING : PreloadedState.NULL, url: url }));
    return initialState;
}


export const useImages = (urls: Array<string | null> | object, crossOrigin: string | null) => {

    const initialState: Map<string, PreloadedImage> = new Map();

    const [images, setImages] = useState(createImageMap(urls));
    const prevUrlsRef = useRef(null as Array<string | null> | object | null);


    const [imagestates, setImageState] = useState(getInitialState(images));

    useEffect(() => {

        images.forEach((url, key) => {
            if (!url) return;
            const img = document.createElement("img") as HTMLImageElement;
            img.onload = () => {
                setImageState((state: Map<string, PreloadedImage>) => {
                    const newState = new Map(state);
                    newState.set(key, { image: img, state: PreloadedState.LOADED, url: url });
                    return newState;
                })
            }

            img.onerror = () => {
                setImageState((state: Map<string, PreloadedImage>) => {
                    const newState = new Map(state);
                    newState.set(key, { image: null, state: PreloadedState.ERROR, url: url });
                    return newState;
                })
            }

            if (crossOrigin) img.crossOrigin = crossOrigin;
            img.src = url;

        });


        return () => {
            images.forEach((url, key) => {
                if (!url) return;
                const img = imagestates.get(key)!.image!;
                if (img) {
                    img.onload = null;
                    img.onerror = null;
                }
            })
        }



    }, [images, crossOrigin]);




    useEffect(() => {
        if (!shallowEqual(prevUrlsRef.current, urls)) {
            prevUrlsRef.current = urls;
            setImages(createImageMap(urls));
            setImageState(getInitialState(images));
        }

    }, [urls])







    return imagestates;
}


export const isEncodedImage = (url: string | null): boolean => {
    if (!url) return false;
    return url.startsWith("data:image");
}
