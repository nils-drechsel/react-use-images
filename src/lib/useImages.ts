import { useEffect, useState } from 'react';

export type PreloadedImage = {
    image: HTMLImageElement | null,
    state: string,
}

export const useImages = (urls: Array<string>, crossOrigin: string | null) => {

    const initialState: Map<string, PreloadedImage> = new Map();

    urls.filter(url => !!url)
        .forEach((url: string) => initialState.set(url, { image: null, state: "loading" }));

    const [imagestates, setImageState] = useState(initialState);

    useEffect(() => {

        urls.filter(url => !!url)
            .forEach(url => {
                const img = document.createElement("Img") as HTMLImageElement;
                img.onload = () => {
                    setImageState((state: Map<string, PreloadedImage>) => {
                        const newState = new Map(state);
                        newState.set(url, { image: img, state: "loaded" });
                        return newState;
                    })
                }

                img.onerror = () => {
                    setImageState((state: Map<string, PreloadedImage>) => {
                        const newState = new Map(state);
                        newState.set(url, { image: null, state: "error" });
                        return newState;
                    })
                }

                if (crossOrigin) img.crossOrigin = crossOrigin;
                img.src = url;

            });

        return () => {
            urls.filter(url => !!url)
                .forEach(url => {
                    const img = imagestates.get(url)!.image!;
                    img.onload = null;
                    img.onerror = null;
                })
        }



    }, [urls, crossOrigin]);

    return imagestates;
}
