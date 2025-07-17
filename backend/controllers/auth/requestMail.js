import nodemailer from 'nodemailer'
import User from '../../models/user.js';
import jwt from 'jsonwebtoken';


const requestMail= async(req,res)=>{

    try {

    const {email} = req.body;

    const user= await User.findOne({email});

    if(!user){
        return res.status(400).json({error: "user does not exit"});
    }
    const Id=user._id;

    const token = jwt.sign({email,Id},process.env.JWT_SECRET,{
        expiresIn: '20m'
    });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.MAIL}`,
          pass: `${process.env.MAIL_PASS}`
        }
      });
      
      var mailOptions = {
        from: `${process.env.MAIL}`,
        to: `${email}`,
        subject: 'Reset Password',
        text: `http://localhost:3000/reset-password/${Id}/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.send({status: "success"});
        }
      }); 

      
        
    } 
    
    catch (error) {
        console.log("error in request mail ", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }

    
}

export default requestMail;