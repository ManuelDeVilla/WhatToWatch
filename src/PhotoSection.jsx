import React from 'react';
import SectionHeader from './SectionHeader.jsx';
import styles from './css/PhotoSection.module.css';
import useJustifiedLayout from './useJustifiedLayout.jsx';
import { BASE_POSTER_PATH } from './config/api.js';


export default function PhotoSection({photos, type}) {
  let hasImage = null;

  if (type !== "person") {
    hasImage = photos?.backdrops?.length > 0 ? photos?.backdrops :
    photos?.posters?.length > 0 ? photos?.posters :
    photos?.logos?.length > 0 ? photos?.logos : null;
  } else {
    hasImage = photos?.profiles
  }

  const maxImage = Math.min(hasImage?.length, 10);
  const images = [...hasImage]?.slice(0, maxImage) || [];
  const {galleryLayout, containerElement} = useJustifiedLayout(images, 2);
  const boxes = galleryLayout?.boxes || [];
  const visiblePhotos = images.slice(0, boxes.length);
  
  return (
    <div className={ styles.photoContainer }>
      <SectionHeader title={"Photos"} />

      <div ref={ containerElement } className={ styles.justifiedLayoutContainer }>
        {
          !galleryLayout ? <p>Loading</p> :
          <div
            className={ styles.photos }
            style={{height: `${galleryLayout ? galleryLayout.containerHeight : "auto"}px`}}
            >
              {
                visiblePhotos.map((image, index) => {
                  const calculatedDimension = boxes[index];
                
                  return(
                    <React.Fragment key={index}>
                      <div
                        className={ styles.item }
                        style={{
                          position: 'absolute',
                          top: calculatedDimension.top,
                          left: calculatedDimension.left,
                          height: calculatedDimension.height,
                          width: calculatedDimension.width
                        }}
                      >
                        <img src={ `${BASE_POSTER_PATH}${image.file_path}` } alt="Photo" />
                      </div>
                    </React.Fragment>
                  )
                })
              }
            </div>
        }
      </div>
    </div>
  )
}
