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
export declare const createImageMap: (urls: object | (string | null)[]) => Map<string, string>;
export declare const getInitialState: (images: Map<string, string>) => Map<string, PreloadedImage>;
export declare const useImages: (urls: object | (string | null)[], crossOrigin: string | null) => Map<string, PreloadedImage>;
