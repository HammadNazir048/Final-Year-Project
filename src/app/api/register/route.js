import { NextResponse } from "next/server";
import { createUser} from "@/queries/users";
import bcrypt from "bcryptjs/dist/bcrypt";
import { dbConnent } from "@/lib/mongo";

export const POST = async (request) => {
    const {name,email,password} = await request.json();
    
     console.log(name,email,password);

    //db conn 

    await dbConnent();

    //Encript the password
      const hashedPassword = await bcrypt.hash(password, 5);
    //db payload
    const newUser ={
        name,
        password: hashedPassword,
        email
    }
    //save to db

    try{
        await createUser(newUser);
    }
    catch(err){
        return new NextResponse(error.masage,{
          status: 500,
        });
    }
       return new NextResponse("User has been Created", {
        status: 201,
       }
    );
}
