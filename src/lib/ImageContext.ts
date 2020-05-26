import { createContext } from 'react';
import { PreloadedImage } from './useImages';


export const ImageContext = createContext<Map<string, PreloadedImage | null> | null>(null);

export default ImageContext;

