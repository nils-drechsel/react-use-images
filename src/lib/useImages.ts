import { useEffect, useState } from 'react';

export type PreloadedImage = {
    image: HTMLImageElement | null,
    state: PreloadedState,
}

export enum PreloadedState {
    LOADING,
    LOADED,
    ERROR,
    NULL,
}

export const useImages = (urls: Array<string | null> | object, crossOrigin: string | null) => {

    const initialState: Map<string, PreloadedImage> = new Map();

    const images: Map<string, string> = new Map();

    if (urls instanceof Array) {
        urls.filter(url => !!url)
            .forEach(url => images.set(url!, url!));
    } else {
        Object.keys(urls)
            .filter(key => key in urls)
            .forEach(key => images.set(key, (urls as any)[key]))
    }

    images.forEach((url, key) => initialState.set(key, { image: null, state: url ? PreloadedState.LOADING : PreloadedState.NULL }));

    const [imagestates, setImageState] = useState(initialState);

    useEffect(() => {

        images.forEach((url, key) => {
            if (!url) return;
            const img = document.createElement("Img") as HTMLImageElement;
            img.onload = () => {
                setImageState((state: Map<string, PreloadedImage>) => {
                    const newState = new Map(state);
                    newState.set(key, { image: img, state: PreloadedState.LOADED });
                    return newState;
                })
            }

            img.onerror = () => {
                setImageState((state: Map<string, PreloadedImage>) => {
                    const newState = new Map(state);
                    newState.set(key, { image: null, state: PreloadedState.ERROR });
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



    }, []);

    return imagestates;
}
