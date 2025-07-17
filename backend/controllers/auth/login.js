
import User from "../../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { manager } from "../notification/manager.js";

const login = async(req,res)=>{
    try {

    const {email , password } = req.body
    const user = await User.findOne({email});
    const isPassValid = await bcrypt.compare(password, user? user.password : "");

    if(!user || !isPassValid){
        return res.status(400).json({error:"Invalid username or password"})
    }

    const fullName=user.fullName;
    const Id= user._id;

    const jwttoken = jwt.sign({email, Id},process.env.JWT_SECRET,{
        expiresIn: '15d'
    });

    console.log("heyyyy")


    res.cookie("jwt",jwttoken, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: "None",
        secure: false
    })



    res.status(200).json({
        userId: user._id,
        fullName,
        email,
        role: user.role,
    })


        
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export default login