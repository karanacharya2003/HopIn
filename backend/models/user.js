import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName :{
        type: String,
        required: true
    },

    email :{
        type: String,
        required: true
    },

    password :{
        type: String,
        required: true,
        minlength: 6
    },
    phone_number: {
        type: Number,
        trim: true,
    },

    gender:{
        type: String,
        required: true,
        enum: ["male","female"],
    },

    role: {
        type : String,
        // required: true,
        enum :["user" , , "admin"],
        default: "user"
    },
    trips: {
        type: Array,
        default: []
    },
    active_trip: {
        type: mongoose.ObjectId,
    },
    
}, {timestamps: true})

const User= mongoose.model("User",userSchema);

export default User;