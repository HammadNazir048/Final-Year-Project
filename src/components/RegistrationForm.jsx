// 'use client'
// import React from 'react'
// import SocialLogins from "./SocialLogins";
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import Navbar from './NavBar';

// const RegistrationForm = () => {
//     const router = useRouter();
//      async function handelSubmit(event) {
//         event.preventDefault();
//         try{
//             const formData = new FormData(event.currentTarget);
//             const name = formData.get("name");
//             const email = formData.get("email");
//             const password = formData.get("password");

//             const responce = await fetch ('/api/register' ,{
//              method: 'POST',
//              headers:{
//                 "content-type": "application/json",

//              },
//              body: JSON.stringify({
//                 name,
//                 email,
//                 password
//              })
//             } 
//             );
//             responce.status == 201 && router.push('home')
//         }

//         catch(e){
//             console.log(e)
//         }
//      }

//     return(
//         <>
//         <Navbar/>
//         <h1 className="flex items-center justify-center text-white text-4xl mt-20">Create an account</h1>
//             <div className="flex flex-col justify-center items-center m-4 mt-10">
//         <div className="flex flex-col justify-center items-center m-4 bg-gray-700 rounded">
//         <h1 className="text-3xl my-3 bg-gray-700 text-white">Welcome to Script Scout</h1>
//     <form 
//         onSubmit= {handelSubmit}
//         className="my-1 flex flex-col items-center border p-3 border-gray-700 rounded-md">
//         <div className="my-2">
//             <label htmlFor="name" className='text-white'>Name</label>
//             <input className="border mx-8 border-gray-500 rounded bg-white" type="name" name="name" id="name" />
//         </div>
//         <div className="my-2">
//             <label htmlFor="email" className='text-white'>Email</label>
//             <input className="border mx-8 border-gray-500 rounded bg-white" type="email" name="email" id="email" />
//         </div>

//         <div className="my-2">
//             <label htmlFor="password" className='text-white'>Code</label>
//             <input className="border mx-8 border-gray-500 rounded bg-white" type="password" name="password" id="password" />
//         </div>

//         <button type="submit" className="lex w-full border border-black justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
//             Register 
//         </button>
//         <p className="mx-3 text-white">
//         Already have an account? 
//         <Link href="/login" className="mx-2 underline text-white">Login </Link>
//        </p>
//     </form>
//     <SocialLogins />
//     </div>
//     </div>
// </>
// );
// };

// export default RegistrationForm


'use client'
import React from 'react'
import SocialLogins from "./SocialLogins";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Navbar from './NavBar';

const RegistrationForm = () => {
    const router = useRouter();
    
    async function handelSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            response.status == 201 && router.push('/login');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Navbar />
            <h1 className="flex items-center justify-center text-white text-4xl mt-20">Create an account</h1>
            <div className="flex flex-col justify-center items-center m-4 mt-10">
                <div className=" border border:white flex flex-col justify-center items-center m-4 rounded-lg p-6 shadow-2xl w-full max-w-md">
                    <h1 className="text-3xl my-3 text-white text-center">Welcome to Script Scout</h1>
                    <form onSubmit={handelSubmit} className="flex flex-col items-center space-y-6 w-full">
                        <div className="w-full">
                            <label htmlFor="name" className='text-white text-lg'>Name</label>
                            <input className="border-2 w-full px-4 py-2 mt-2 text-white rounded-lg bg-transparent border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="name" id="name" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className='text-white text-lg'>Email</label>
                            <input className="border-2 w-full px-4 py-2 mt-2 text-white rounded-lg bg-transparent border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" name="email" id="email" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="password" className='text-white text-lg'>Password</label>
                            <input className="border-2 w-full px-4 py-2 mt-2 text-white rounded-lg bg-transparent border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" name="password" id="password" required />
                        </div>

                        <button type="submit" className="w-full px-6 py-3 text-white font-semibold text-lg bg-green-600 rounded-lg hover:bg-green-800 transition-colors">
                            Register
                        </button>
                        <p className="text-white text-center mb-3">
                            Already have an account? 
                            <Link href="/login" className="underline text-white-400 mx-2 ">Login</Link>
                        </p>
                    </form>
                    <SocialLogins />
                </div>
            </div>
        </>
    );
};

export default RegistrationForm;
