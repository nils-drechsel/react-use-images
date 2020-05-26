import { FunctionComponent } from 'react';
declare type Props = {
    urls: Array<string | null> | object;
    crossOrigin?: string | null;
    Waiting?: any;
    Error?: any;
};
export declare const PreloadImages: FunctionComponent<Props>;
export default PreloadImages;
