import logServices from "./../services/logServices.js";

const createUser = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const loginUser = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export default {
    createUser,
    loginUser
}