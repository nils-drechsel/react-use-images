export declare type PreloadedImage = {
    image: HTMLImageElement | null;
    state: string;
};
export declare const useImages: (urls: object | (string | null)[], crossOrigin: string | null) => Map<string, PreloadedImage>;
