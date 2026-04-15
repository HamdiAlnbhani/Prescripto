import validater from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken";


// API TO REGISTER USER
const registerUser= async (req,res)=>{
    try {
        const {name,email,password}=req.body
      
        if(!name || !password ||!email){

            return res.json({success:false,message:"Missing Details"})

        }
        // VALIDATING EMAIL FORMAT

        if(!validater.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email"})
        }
        // VALIDATING STRONG PASSWORD 
         if (password.length <8){
            return res.json ({success:false ,message:"Enter a strong password"})
         }

        // HASHING USER PASSWORD

        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password,salt)

        const userData= {
            name,
            email,
            password:hasedPassword
        }

        const newUser = new userModel(userData)
        const user =await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({success:true,token})



        

    } catch (error) {

          console.log(error);
          res.json({ success: false, message: error.message });
    }
}

export {registerUser}