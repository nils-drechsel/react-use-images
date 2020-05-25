import React, { FunctionComponent, isValidElement, cloneElement, ReactElement } from 'react';
import { useImages } from "./useImages";

interface Props {
    urls: Array<string>,
    crossOrigin?: string,
    Waiting?: any,
    Error?: any,
    children?: any,
}




export const PreloadImages: FunctionComponent<Props> = (props: Props) => {

    const imageStates = useImages(props.urls, props.crossOrigin || null);

    const allLoaded = props.urls.filter(url => !!url).every(url => imageStates.get(url)!.state === "loaded");
    const error = props.urls.filter(url => !!url).some(url => imageStates.get(url)!.state === "error");


    if (error) {
        if (props.Error) {
            const Error: any = props.Error;
            return (<Error />)
        } else {
            return null;
        }
    }

    if (!allLoaded) {
        if (props.Waiting) {
            const Waiting: any = props.Waiting;
            return (<Waiting />)
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