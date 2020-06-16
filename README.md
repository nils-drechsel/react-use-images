# react-use-images custom hook
React hook to preload multiple images.

## Install

```bash
npm install react-use-images
```

## Usage

There are 3 use cases for react-use-images:
1. Utilise useImages hook to preload images during the render step
2. Utilise <PreloadImages> context component to make preloaded images available to child components
3. Utilise loadImages() callback function to load images as a side effect


### useImages
```js
import React from 'react';
import { useImages, PreloadedImage, PreloadedState } from "react-use-images";

export const Component: FunctionComponent = () => {

    const urls = ["https://somewebsite/image.png", "https://anotherwebsite/anotherimage.jpg"]
    const crossorigin = null;

    const imageStates: Map<string, PreloadedImage> = useImages(urls, crossorigin);

    if (Array.from(imageStates.values()).some(image => image.state === PreloadedState.LOADING)) return null;

    return (
        <div>
            {
                Array.from(imageStates.values()).map(image => image.image)
            }
        </div>
    )


}
```



### PreloadImages

#### ParentComponent
```js
import React from 'react';
import { PreloadImages, PreloadedImage, PreloadedState } from "react-use-images";

export const ParentComponent: FunctionComponent = () => {

    const urls = ["https://somewebsite/image.png", "https://anotherwebsite/anotherimage.jpg"]

    const ComponentToDisplayWhileWaiting = (<div>loading...</div>);
    const ComponentToDisplayOnError = (<div>error</div>);

    return (
        <PreloadImages 
            urls={urls}
            Waiting={ComponentToDisplayWhileWaiting}
            Error={ComponentToDisplayOnError}

        >
            <ChildComponent>
        </PreloadImages>
    )


}
```

#### ChildComponent
```js
import React from 'react';
import { PreloadedImage, ImageContext } from "react-use-images";

export const ChildComponent: FunctionComponent = () => {

    const images = useContext(ImageContext) as Map<string, PreloadedImage>;

    return (
        Array.from(images.values()).map(image => image.image)
    )


}
```




### loadImages
```js
import React, {useState} from 'react';
import { loadImages } from "react-use-images";

export const Component: FunctionComponent = () => {

    const [images, setImages] = useState(null);

    useEffect(() => {
        const urls = ["https://somewebsite/image.png", "https://anotherwebsite/anotherimage.jpg"]

        loadImages(urls, loadedImages => {
            setImages(loadedImages);
        });

    },[]);

    if (!images) return null;

    return (
        <div>
            {
                Array.from(images.values()).map(image => image.image)
            }
        </div>
    )


}
```





## License

MIT

