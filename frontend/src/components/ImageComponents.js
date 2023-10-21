import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ImageComponents({ src, classData }) {
    return (
            <LazyLoadImage
                alt={''}
                effect="blur"
                src={src} 
                height={src.height}
                className={classData}
                style={{marginBottom: "-54px", marginTop: "-30px", zIndex: 8}}/>
    );
}
