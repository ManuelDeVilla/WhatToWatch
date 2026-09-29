import createJustifiedLayout from 'justified-layout';
import { useState, useEffect, useRef } from 'react'
import { BASE_POSTER_PATH } from './config/api';
import { jitterAspectRatio } from './utils/custom_hook_util';

export default function useJustifiedLayout(images, maxRow) {
  const containerElement = useRef(null);
  const [galleryLayout, setGalleryLayout] = useState(null);

useEffect(() => {
  if (!containerElement.current && images.length <= 0) return;

  const imageAspectRatio = images.map((img, index) => jitterAspectRatio(img.aspect_ratio, index));
  const BASE_OPTION = {
    containerWidth: containerElement.current.offsetWidth,
    targetRowHeight: 180,
    maxNumRows: maxRow,
    boxSpacing: 16,
  };

  const layout = createJustifiedLayout(imageAspectRatio, BASE_OPTION)

  setGalleryLayout(layout)
}, [images, maxRow]);

return {galleryLayout, containerElement}
}
