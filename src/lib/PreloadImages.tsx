import React, { FunctionComponent, isValidElement, cloneElement, ReactElement } from 'react';
import { useImages } from "./useImages";

interface Props {
    urls: Array<string | null> | object,
    crossOrigin?: string | null,
    Waiting?: ReactElement<{ loading: Array<string>, loaded: Array<string> }> | null,
    Error?: ReactElement<{ invalid: Array<string> }> | null,
    children?: any,
}






export const PreloadImages: FunctionComponent<Props> = (props: Props) => {

    const imageStates = useImages(props.urls, props.crossOrigin || null);

    const getKeysWithState = (state: string) => {
        return Array.from(imageStates.keys())
            .filter(key => imageStates.get(key)!.state === state);
    }


    const allLoaded =
        Array.from(imageStates.values())
            .every(image => image.state === "loaded");

    const error =
        Array.from(imageStates.values())
            .some(image => image.state === "error");


    if (error) {
        const invalidUrls = getKeysWithState("error");


        if (props.Error) {
            const Error: any = props.Error;
            return (
                <Error
                    invalid={invalidUrls}
                />
            )
        } else {
            return null;
        }
    }

    if (!allLoaded) {
        const loading = getKeysWithState("loading");
        const loaded = getKeysWithState("loaded");
        if (props.Waiting) {
            const Waiting: any = props.Waiting;
            return (
                <Waiting
                    loading={loading}
                    loaded={loaded}
                />
            )
        } else {
            return null;
        }
    }


    const childrenWithProps = React.Children.map(props.children, child => {


        const newProps = Object.assign({}, props, { imageStates });
        if (newProps.urls) delete newProps.urls;
        if (newProps.crossOrigin) delete newProps.crossOrigin;
        if (newProps.Waiting) delete newProps.Waiting;
        if (newProps.Error) delete newProps.Error;
        if (newProps.children) delete newProps.children;


        if (isValidElement(child)) {
            return cloneElement(child, newProps);
        }

        return child;
    });


    return (
        <div>
            {childrenWithProps}
        </div>
    )

}

export default PreloadImages;