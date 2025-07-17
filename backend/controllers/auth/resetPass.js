import User from "../../models/user.js";
import jwt from 'jsonwebtoken'

const resetpass= async(req,res)=>{
    try {
        const {Id, token , password , confirmPassword} = req.body
        
        if(password!==confirmPassword){
            return res.status(400).json({error: "upassowrds do not match"});
        }

        const valid = jwt.verify(token, process.env.JWT_SECRET)

        if(!valid){
            return res.status(400).json({error: "Invalid Token"});
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        await User.findByIdAndUpdate({_id:Id}, {password:hashedPass});

        res.status(200).json("password uodated");

        
    } catch (error) {
        console.log("error in reset password ", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export default resetpass;