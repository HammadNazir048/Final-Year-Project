import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm";
import App from "@/components/app";
import { Gallery } from "@/components/Gallery";
import Sidebar from "@/components/Sidebar";
import InputPanel from "@/components/InputPanel";
import Aboutus from "@/components/aboutus";
import Navbar from "@/components/NavBar";

export default function Home() {
  return (
     <>
          {/* <Sidebar/> */}
      {/* <App/> */}
      <Navbar/>
    
         {/* <AboutSection/> */}
        <Aboutus/>
        {/* <RegistrationForm/> */}
      {/* <InputPanel/> */}
     {/* <Gallery/> */}
     </>

  );
}
