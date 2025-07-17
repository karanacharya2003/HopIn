import User from "../../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"


const signup= async(req,res)=>{
    try {

        const {fullName, email , password , confirmPassword, gender , phoneNumber} = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({error: "Passwords don't match!"});
            return;
        }

        try {
            const user = await User.findOne({email});
            if (user) {
                res.status(400).json({error:"Username Already Exixts"});
                return;
            }
        } catch (error) { 
            console.log("error in checking if username already exist: ", error.message);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        const newUser= new User({
            fullName,
            email,
            password:hashedPass,
            gender,
            phone: phoneNumber
            // role: "user"
        })

        await newUser.save();
        const Id=newUser._id;

        const jwttoken = jwt.sign({email, Id},process.env.JWT_SECRET,{
            expiresIn: '15d'
        });

        res.cookie("jwt",jwttoken, {
            maxAge: 15*24*60*60*1000,
            httpOnly: true,
            sameSite: "None",
            secure: false
        })

        res.status(200).json({
            userId: newUser._id,
            fullName,
            email,
            role: newUser.role,
        })
        
    } catch (error) {
        console.log("error in signup controller ", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export default signup;