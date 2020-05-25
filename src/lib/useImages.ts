import { useEffect, useState } from 'react';

export type PreloadedImage = {
    image: HTMLImageElement | null,
    state: string,
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

    images.forEach((url, key) => initialState.set(key, { image: null, state: "loading" }));

    const [imagestates, setImageState] = useState(initialState);

    console.log("images: ", images);
    console.log("imagestates: ", imagestates);

    useEffect(() => {

        images.forEach((url, key) => {
            const img = document.createElement("Img") as HTMLImageElement;
            img.onload = () => {
                setImageState((state: Map<string, PreloadedImage>) => {
                    const newState = new Map(state);
                    newState.set(key, { image: img, state: "loaded" });
                    return newState;
                })
            }

            img.onerror = () => {
                setImageState((state: Map<string, PreloadedImage>) => {
                    const newState = new Map(state);
                    newState.set(key, { image: null, state: "error" });
                    return newState;
                })
            }

            if (crossOrigin) img.crossOrigin = crossOrigin;
            img.src = url;

        });

        return () => {
            images.forEach((url, key) => {
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
