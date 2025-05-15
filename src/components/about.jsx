// pages/about.jsx
import Link from 'next/link';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to Script Scout</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Discover and learn from a variety of scripts! Join us to enhance your skills.
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <Link href="/signin">
            <a className="inline-block bg-blue-600 text-white text-lg py-2 px-6 rounded-md hover:bg-blue-700">
              Sign In
            </a>
          </Link>
          <Link href="/signup">
            <a className="inline-block bg-green-600 text-white text-lg py-2 px-6 rounded-md hover:bg-green-700">
              Sign Up
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
