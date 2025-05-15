'use client';
import React, { useEffect, useState } from 'react';
import LightGallery from 'lightgallery/react';
import { IoDownloadOutline } from 'react-icons/io5';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import "./styles.css";

export function Gallery() {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [filterSize, setFilterSize] = useState('all');

    const fetchImages = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/get_images');
            const data = await response.json();
            const imagesWithMeta = await Promise.all(data.images.map(async (src) => {
                const img = new Image();
                img.src = src;
                await img.decode();
                return {
                    src,
                    width: img.width,
                    height: img.height,
                    type: src.split('.').pop().toLowerCase()
                };
            }));
            setImages(imagesWithMeta);
            setFilteredImages(imagesWithMeta);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const applyFilters = () => {
        let filtered = images;

        if (filterType !== 'all') {
            filtered = filtered.filter(img => img.type === filterType);
        }

        if (filterSize !== 'all') {
            filtered = filtered.filter(img => {
                const { width, height } = img;
                switch (filterSize) {
                    case 'small': return width < 500 && height < 500;
                    case 'medium': return width >= 500 && width <= 1000 && height >= 500 && height <= 1000;
                    case 'large': return width > 1000 || height > 1000;
                    default: return true;
                }
            });
        }

        setFilteredImages(filtered);
    };

    useEffect(() => {
        fetchImages();
        const interval = setInterval(fetchImages, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filterType, filterSize, images]);

    const onInit = () => {
        console.log('lightGallery has been initialized');
    };

    const downloadImage = (src) => {
        const link = document.createElement('a');
        link.href = src;
        link.download = src.split('/').pop();
        link.click();
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            {/* Filters - fixed directly below your search panel */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <div>
                    <label className="text-white mr-2 font-semibold">Type:</label>
                    <select
                        className="bg-gray-800 text-white p-2 rounded-md"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="png">PNG</option>
                        <option value="jpg">JPG</option>
                        <option value="jpeg">JPEG</option>
                    </select>
                </div>
                <div>
                    <label className="text-white mr-2 font-semibold">Size:</label>
                    <select
                        className="bg-gray-800 text-white p-2 rounded-md"
                        value={filterSize}
                        onChange={(e) => setFilterSize(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="small">Small (&lt;500x500)</option>
                        <option value="medium">Medium (500–1000)</option>
                        <option value="large">Large (&gt;1000)</option>
                    </select>
                </div>
            </div>

            {/* Image Gallery */}
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
                className="w-full"
            >
                {filteredImages.map((img, index) => (
                    <a href={img.src} key={index}>
                        <div className="relative inline-block m-2">
                            <img
                                alt={`Image ${index + 1}`}
                                src={img.src}
                                onError={(e) => e.currentTarget.style.display = 'none'}
                                className="rounded-lg max-h-64"
                            />
                            <button
                                className="absolute top-2 right-2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80"
                                onClick={(e) => {
                                    e.preventDefault();
                                    downloadImage(img.src);
                                }}
                            >
                                <IoDownloadOutline size={20} />
                            </button>
                        </div>
                    </a>
                ))}
            </LightGallery>
        </div>
    );
}
