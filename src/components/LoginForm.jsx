// "use client";
// import SocialLogins from "./SocialLogins";
// import { doCredentialLogin } from "@/app/actions";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";


// const LoginForm = () => {
//     const router = useRouter();
//     const [error, setError] = useState("");

//     async function onSubmit(event) {
//         event.preventDefault();
//         try {
//             const formData = new FormData(event.currentTarget);

//             const response = await doCredentialLogin(formData);

//             if (!!response.error) {
//                 console.error(response.error);
//                 setError(response.error.message);
//             } else {
//                 router.push("/home");
//             }
//         } catch (e) {
//             console.error(e);
//             setError("Wrong Email Or Password");
//         }
//     }
//     return (
//         <>
//          <div className="flex flex-col justify-center items-center m-4 mt-[70px]">
//         <div className="flex flex-col justify-center items-center m-4 bg-gray-700 rounded">
//         <h1 className="text-3xl my-3 bg-gray-700 text-white">Welcome to Script Scout</h1>
//             <div className="text-xl text-red-500 bg-gray-700">{error}</div>
//             <form 
//                 className="my-2 flex flex-col items-center border p-3 border-gray-700 rounded-md"
//                 onSubmit={onSubmit}>
//                 <div className="my-2">
//                     <label htmlFor="email" className='text-white'>Your Email</label>
//                     <input className="border mx-8 border-black rounded bg-white text-black" type="email" name="email" id="email" />
//                 </div>

//                 <div className="my-2">
//                     <label htmlFor="password" className='text-white'>Password</label>
//                     <input className="border mx-8 border-black rounded bg-white text-black" type="password" name="password" id="password" />
//                 </div>
//                 <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
//                   />
//                   <label
//                     htmlFor="remember-me"
//                     className="ml-3 block text-sm leading-6 text-white"
//                   >
//                     Remember me
//                   </label>
//                 </div>
//               </div>
//                 <button type="submit" className="flex w-full border border-black justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
//                      Login
//                 </button>
//                 <div className="text-sm leading-6">
//                   <Link
//                     href="/register"
//                     className="text-white hover:text-red mx-1" >
//                     Forgot password?
//                   </Link>
//                 </div>
//             </form>

//             <div className="relative flex justify-center text-sm font-medium leading-6">
//                   <span className="px-6 text-white bg-gray-700">
//                     Or continue with
//                   </span>
//                 </div>     
//             <SocialLogins />
//             <p className="mx-3 text-white bg-gray-700 rounded">
//              Dont have an account? 
//             <Link href="register" className="mx-2 underline text-white bg-gray-700 ">Register </Link>
//             </p>
//             </div>
//             </div>
//         </>
//     );
// };
// export default LoginForm;

'use client'
import SocialLogins from "./SocialLogins";
import { doCredentialLogin } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "./NavBar";
const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialLogin(formData);

            if (!!response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/home");
            }
        } catch (e) {
            console.error(e);
            setError("Wrong Email Or Password");
        }
    }

    return (
        <>
            <Navbar />
            <h1 className="flex items-center justify-center text-white text-4xl mt-20">Welcome Back</h1>
            <div className="flex flex-col justify-center items-center m-4 mt-10">
                <div className="flex flex-col justify-center items-center m-4 bg-opacity-20  rounded-lg p-6 shadow-2xl w-full max-w-md border border:white">
                    <h1 className="text-3xl my-3 text-white text-center">Login to Script Scout</h1>
                    <div className="text-xl text-red-500">{error}</div>
                    <form onSubmit={onSubmit} className="flex flex-col items-center space-y-6 w-full">
                        <div className="w-full">
                            <label htmlFor="email" className='text-white text-lg '>Your Email</label>
                            <input className="border-2 w-full px-4 py-2 mt-2 text-white rounded-lg bg-transparent border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" name="email" id="email" required />
                        </div>

                        <div className="w-full">
                            <label htmlFor="password" className='text-white text-lg'>Password</label>
                            <input className="border-2 w-full px-4 py-2 mt-2 text-white rounded-lg bg-transparent border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" name="password" id="password" required />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-white">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="w-full px-6 py-3 text-white font-semibold text-lg bg-green-600 rounded-lg hover:bg-green-800 transition-colors">
                            Login
                        </button>

                        <div className="text-sm leading-6">
                            <Link href="/register" className="text-white hover:text-blue-400 mx-1">
                                Forgot password?
                            </Link>
                        </div>
                    </form>

                    <div className="relative flex justify-center text-sm font-medium leading-6 my-6 mb-4 mt-3">
                        <span className="px-6 text-gray-200 ">OR</span>
                    </div>

                    <SocialLogins />

                    <p className="mx-3 text-white rounded">
                        Don't have an account? 
                        <Link href="/register" className=" mx-2 underline text-white">Register</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
