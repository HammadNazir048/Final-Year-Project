// components/AboutSection.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image Section */}
          <div className="md:w-1/2">
            <Image
              src="/scriptscout.jpg" // Replace with your actual image path
              alt="About Us"
              width={500}
              height={400}
              className="rounded-lg shadow-md"
              // Optional: prioritize loading this image
            />
          </div>
          {/* Text Section */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">About Script Scout</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Script Scout, your go-to platform for quickly finding relevant images for your creative projects. Whether you're a writer, marketer, or content creator, sometimes you have the perfect script or text in mind, but visualizing it can be a challenge. That's where we come in.
            </p>
            <p className="text-gray-700 mb-4">
              Our mission is to make the process of finding inspiring visuals seamless and efficient. Simply enter your script, and our intelligent system will help you discover a curated collection of images that match the tone, theme, and keywords of your text.
            </p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Effortlessly find relevant images based on your scripts.</li>
                <li>Discover a wide variety of high-quality visuals.</li>
                <li>Save time and enhance your creative workflow.</li>
                <li>User-friendly interface for easy navigation.</li>
              </ul>
            </div>
            <p className="text-gray-700">
              We're passionate about empowering creators like you. Start exploring today and let Script Scout bring your words to life!
            </p>
            {/* Optional: Add a call to action button */}
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
              Get Started
            </button> */}
          </div>
        </div>
      </div>
      <Link href="/register">Go to Register</Link> {/* Link to register page */}
    </section>
    
  );
};

export default AboutSection;
