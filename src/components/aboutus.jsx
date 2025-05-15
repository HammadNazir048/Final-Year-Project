import React from 'react';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6 mt-20">
      <div className="max-w-3xl text-center space-y-12">
        <header>
          <h1 className="text-5xl font-bold">Introducing ScriptScout</h1>
        </header>
        <main className="space-y-8">
          <div className="flex justify-center">
          <Link href="/home" legacyBehavior>
         <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full  items-center justify-center gap-2 hover:bg-white      hover:text-black transition group">
           Try ScriptScout
            <span className="text-xl transition group-hover:bg-white group-hover:text-black">&#8594;</span>
        </button>
        </Link>
        <Link href="/home" legacyBehavior>
          <button className="bg-transparent text-white px-8 py-3 flex items-center justify-center gap-2 transition group">
            Learn about ScriptScout
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 7l5 5-5 5" />
            </svg>
          </button>
        </Link>
          </div>
          <section>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
            To optimize the video editing process, we propose Script Scout, a web application that automates the task of gathering relevant images and content based on a provided script. Video editors currently face a time-consuming and manual process of searching and selecting images and content relevant to their scripts, often relying on stock image websites or manual web searches. This web application addresses these challenges efficiently by reducing the time spent on manual searches and improving the overall productivity of video editors.xisting tools and resources do not effectively bridge the gap between a given script and the identification and retrieval of visually relevant content. Script Scout aims to automate the process of identifying and extracting images and content relevant to a given input and provide a user-friendly interface for video editors to easily upload their scripts and receive a collection of relevant visuals. This application aims to save time and enhance user’s productivity by eliminating the need for manual searches and content curation. Script Scout has the potential to significantly improve the efficiency and effectiveness of the video editing process, empowering video editors to create visually engaging and impactful content with greater ease and speed. 
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-semibold mb-4">Services</h2>
            <p className="text-lg leading-relaxed">
            Weather a user is looking for images, text or audio there our application comes in where we offer a range of features and tools to help you create your video by finding all in one place and get more done in less time. With a user-friendly interface and personalized recommendations based on user input, our application is the ultimate tool for anyone looking to optimize their video editing workflow. From developers to designers, our diverse team works tirelessly to create impactful solutions
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-semibold mb-4 align-left">Our Impact</h2>
            <p className="text-lg leading-relaxed">
            Script Scout revolutionizes the video editing process by transforming how editors gather and curate visual content. 
  By automating the identification and retrieval of relevant images and materials based on a script, our web application 
  saves valuable time and effort. This innovation empowers video editors to focus on creativity, delivering visually 
  impactful content faster and with greater ease. By bridging the gap between a script and its visual representation, 
  Script Scout enhances productivity and ensures a seamless editing experience. The result is a significant improvement 
  in efficiency, enabling editors to craft compelling narratives without the burden of manual searches.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="text-lg leading-relaxed">
              Have questions or feedback? Contact us at{' '}
              <a href="mailto:support@ScriptScout.com" className="text-blue-400 hover:underline">
                support@ScriptScout.com
              </a>. We value your input and look forward to connecting with you.
            </p>
          </section>
        </main>
        <footer>
          <p className="text-sm text-gray-400">&copy; 2025 Script Scout. All rights reserved.</p>
        </footer>
      </div>
    </div>

  );
};

export default AboutUs;
