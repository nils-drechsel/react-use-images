import { FunctionComponent, ReactElement } from "react";
interface Props {
    urls: Array<string | null> | object;
    crossOrigin?: string | null;
    Waiting?: ReactElement;
    Error?: ReactElement;
}
export declare const PreloadImages: FunctionComponent<Props>;
export default PreloadImages;
