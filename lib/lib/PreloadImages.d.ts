import { FunctionComponent } from 'react';
interface Props {
    urls: Array<string>;
    crossOrigin?: string;
    Waiting?: any;
    Error?: any;
    children?: any;
}
export declare const PreloadImages: FunctionComponent<Props>;
export default PreloadImages;
