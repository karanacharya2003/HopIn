const logout = (req, res) => {
    try {

        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"})
        
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export default logout;