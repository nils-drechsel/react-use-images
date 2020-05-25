import { FunctionComponent, ReactElement } from 'react';
interface Props {
    urls: Array<string | null> | object;
    crossOrigin?: string | null;
    Waiting?: ReactElement<{
        loading: Array<string>;
        loaded: Array<string>;
    }> | null;
    Error?: ReactElement<{
        invalid: Array<string>;
    }> | null;
    children?: any;
}
export declare const PreloadImages: FunctionComponent<Props>;
export default PreloadImages;
