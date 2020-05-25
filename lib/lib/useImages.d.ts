export declare type PreloadedImage = {
    image: HTMLImageElement | null;
    state: string;
};
export declare const useImages: (urls: string[], crossOrigin: string | null) => Map<string, PreloadedImage>;
