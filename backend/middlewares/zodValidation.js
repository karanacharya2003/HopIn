import {LoginSchemaZod, requestMailSchemaZod, resetPasswordSchemaZod, SignupSchemaZod} from "../zod/authmodels.js"
import {z} from 'zod'


export const LoginValidation= (req,res,next)=>{
    try {

        const valid= LoginSchemaZod.safeParse(req.body);
        if(valid.success===true){
            next();
        }
        else{
            return res.status(400).json({message: "Check your inputs"});
        }
        
    } catch (error) {
        res.status(400).json({message: "Check your inputs"})
    }
}





export const SignupValidation= (req,res,next)=>{
    try {

        const valid= SignupSchemaZod.safeParse(req.body);
        if(valid.success===true){
            next();
        }
        else{
            console.log(valid.error);
            return res.status(400).json({message: "Check your inputs"});
        }

        
    } catch (error) {
        res.status(400).json({message: "Check your inputs"})
        
    }
}





export const requestMailValidation= (req,res,next)=>{
    try {

        const valid= requestMailSchemaZod.safeParse(req.body);
        if(valid.success===true){
            next();
        }
        else{
            return res.status(400).json({message: "Check your inputs"});
        }

        
    } catch (error) {
        res.status(400).json({message: "Check your inputs"})
        
    }
}



export const resetPassValidation= (req,res,next)=>{
    try {

        const valid= resetPasswordSchemaZod.safeParse(req.body);
        if(valid.success===true){
            next();
        }
        else{
            return res.status(400).json({message: "Check your inputs"});
        }

        
    } catch (error) {
        res.status(400).json({message: "Check your inputs"})
        
    }
}


