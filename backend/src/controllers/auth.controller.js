import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
export const signup=async (req,res)=>{
    const { email, fullName, password, profilePic } = req.body;
    try{
        if(!email || !fullName || !password){
            return res.status(400).json({message:"ALL FIELDS ARE REQUIRED"});

        }
        const user=await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exits"});
          const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
       const newUser=new User({
        fullName,
        email,
        password:hashedPassword
       })
       if(newUser){
               generateToken(newUser._id,res);
               await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            email:newUser.email,
            fullName:newUser.fullName,
            profilePic:newUser.profilePic,
        });
       }else{
        res.status(400).json({message:"Error creating user"});
       }

    }catch(error){
        console.error("Error in signup:", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"invalid credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
         if(!isPasswordCorrect){
            return res.status(400).json({message:"invalid credentials"});
    }
    generateToken(user._id,res);
    res.status(200).json({
        _id:user._id,
        email:user.email,
        fullName:user.fullName,
        profilePic:user.profilePic,
    });
    }   catch(error){
        console.error("Error in login:", error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    }catch(error){
        console.error("Error in logout:", error);
        res.status(500).json({message:"Internal server error"});
    }
};
export const updateProfile=async(req,res)=>{
    try{
        const{profilePic}=req.body;
        const userId=req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"Profile picture is required"});
        }
       const uploadResponse= await cloudinary.uploader.upload(profilePic);
       const updatedUser=await User.findByIdAndUpdate(
            userId,
            {profilePic:uploadResponse.secure_url},
            {new:true}
        );
        if(!updatedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(updatedUser);
        
    }catch(error){
        console.error("Error in updateProfile:", error);
        res.status(500).json({message:"Internal server error"});
    }
};
export const checkAuth=async(req,res)=>{
    try{
        res.status(200).json(req.user);

    }catch(error){
        console.error("Error in checkAuth:", error);
        res.status(500).json({message:"Internal server error"});
    }
}