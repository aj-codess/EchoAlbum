import logServices from "./../services/logServices.js";
import User from "./../models/userModel.js";
import utility from "./../services/utility.js";


const cookieOptions = {
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  httpOnly: true,
  sameSite: "strict",
};



const createUser = async (req, res) => {
  try {

    const { email , username, password, phone } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Gmail and Password Required" });
    };

    const userId=utility.genId();
//hash password
    const newUser=new User({
      id: userId,
      email: email,
      username: username,
      password: password,
      phone: phone
    });
    const user = await newUser.save();

  if (user) {

    const token = await logServices.signToken(user.id);

    res.cookie("authToken", token, cookieOptions);

            return res.status(200).json({
                username: user.username,
                message: 'User Created Successfully',
            });

  } else {
    res.status(400).json({ error: "User not created" });
  }

  } catch (error) {
    console.error("Error in loginUser: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



const loginUser = async (req, res) => {
  try {

      const { gmail, password } = req.body;

      const userObj=await User.findOne({gmail});

      if(!userObj || !(await userObj.matchPassword(password))){

        return res.status(401).json({ isLoggedIn: false});

      };

      const token = await logServices.signToken(userObj.id);
      
      res.cookie("authToken", token, cookieOptions);

    return res.status(200).json({
                username: userObj.username,
                message: 'User Created Successfully',
            });

  } catch (error) {
    console.error("Error in loginUser: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const logout = async (req, res) => {
  try {
    res.clearCookie("authToken", cookieOptions);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export default {
    createUser,
    loginUser,
    logout
}
