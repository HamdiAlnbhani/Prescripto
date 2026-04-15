import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModels.js';
import jwt from 'jsonwebtoken'


// API FOR ADDING DOCTOR
const addDoctor=async(req,res)=>{
    try{
      const {
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
      } = req.body;
      const imageFaile = req.file;

      //CHECKING FOR ALL DATA TO ADD DOCTOR
      if (
        !name ||
        !email ||
        !password ||
        !speciality ||
        !degree ||
        !experience ||
        !about ||
        !fees ||
        !address
      ) {
        return res.json({ success: false, message: "Missing Details" });
      }

      // VALIDATING EMAIL FORMAT
      if (!validator.isEmail(email)) {
        return res.json({
          success: false,
          message: "Please enter a valid email address",
        });
      }

      // VALIDATING STRONG PASSWORD
      if(password.len<8){
         return res.json({
           success: false,
           message: "Please enter a stroing password",
         });
        }

        //  HASHING DOCTOR PASSWORD
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        // UPLOAD IMAGE TO CLOUDINARY
        const imageUpload=await cloudinary.uploader.upload(imageFaile.path,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url

    
        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now(),
        }
        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()
        res.json({success:true,message:"Doctor Added"})

    }catch(error){
       console.log(error)
       res.json({success:false,message:error.message})
    }
}

// API FOR ADMIN LOGIN
const loginAdmin=async(req,res)=>{
  try{

    const {email,password}=req.body

    if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
      const token=jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"Invalid Credentials"})
    }


  }catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
// API TO GET ALL DOCTORS LIST FOR ADMIN PANEL

const allDoctors =async (req,res)=>{
 try {

  const doctors=await doctorModel.find({}).select('-password')
  res.json({success:true,doctors})
  
 } catch (error) {
  console.log(error);
  res.json({ success: false, message: error.message });
 }
}

export {addDoctor,loginAdmin,allDoctors}