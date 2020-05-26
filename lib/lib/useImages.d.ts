export declare type PreloadedImage = {
    image: HTMLImageElement | null;
    state: PreloadedState;
};
export declare enum PreloadedState {
    LOADING = 0,
    LOADED = 1,
    ERROR = 2,
    NULL = 3
}
export declare const useImages: (urls: object | (string | null)[], crossOrigin: string | null) => Map<string, PreloadedImage>;
