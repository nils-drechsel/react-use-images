export declare type PreloadedImage = {
    image: HTMLImageElement | null;
    state: PreloadedState;
    url: string | null;
};
export declare enum PreloadedState {
    LOADING = 0,
    LOADED = 1,
    ERROR = 2,
    NULL = 3
}
export declare const createImageMap: (urls: Array<string | null> | object) => Map<string, string>;
export declare const getInitialState: (images: Map<string, string>) => Map<string, PreloadedImage>;
export declare const useImages: (urls: Array<string | null> | object, crossOrigin: string | null) => Map<string, PreloadedImage>;
export declare const isEncodedImage: (url: string | null) => boolean;
