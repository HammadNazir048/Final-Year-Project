'use client';

import { useEffect, useState } from "react";

const GalleryPage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/get-images");
                const data = await response.json();
                setImages(data.images || []);
            } catch (error) {
                console.error("Failed to load images:", error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="p-6 mt-10">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Your Gallery</h1>
            {images.length === 0 ? (
                <p className="text-gray-400 text-center">No images found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <div key={index} className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
                            <img
                                src={img.url}
                                alt={`Image ${index + 1}`}
                                className="w-full h-60 object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
