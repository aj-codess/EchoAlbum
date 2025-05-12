
import User from "./../models/userModel.js";

const getUser = async (req, res) => {
    try{

        const userId = req.user;
        const user = await User.findOne({id:userId}).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);

    } catch(error){
        console.error("Error in getUser: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const updateUser=async (req, res) => {
    try{
        const userId = req.user;
        const { name, email, phone, password } = req.body;

        const user = await User.findOne({id:userId});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.password = password || user.password;

        await user.save();
        res.status(200).json({ message: "User updated successfully"});

    } catch(error){
        console.error("Error in update: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const deleteAccount= async (req, res) => {
    try {
      const userId = req.user;
  
      const user = await User.findOneAndDelete({id:userId});
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.clearCookie("authToken", cookieOptions);
      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      console.error("Error in deleteAccount: ", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


export default {
    getUser,
    updateUser,
    deleteAccount
}