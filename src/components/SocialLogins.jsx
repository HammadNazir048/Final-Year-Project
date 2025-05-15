import { doSocialLogin } from "@/app/actions";
import { FcAbout, FcApproval, FcGoogle } from "react-icons/fc";
const SocialLogins = () => {
    return (
        <form action={doSocialLogin}>
            <div className="bg-black w-full">
           <button
                className="flex w-full items-center border border-gray-300 justify-center gap-3 rounded-md bg-white px-7 py-1 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white mb-2 px-10 "
                type="submit"
                name="action"
                value="google"
            >
                < FcGoogle class=" bg-white"/>
                  <span className="text-sm font-semibold leading-6 bg-white">
                    Sign in with Google
                  </span>
            </button>
            <button
                className="flex w-full items-center border border-gray-300 justify-center gap-3 rounded-md bg-black px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                type="submit"
                name="action"
                value="github"
            >
                 <FcApproval class=" bg-black" />
               <span className="text-sm font-semibold leading-6 bg-black">
            Sign in with GitHub
        </span>
            </button>
            </div>
        </form>
      
    );
};

export default SocialLogins;
