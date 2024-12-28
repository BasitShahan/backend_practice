const bcrypt = require("bcrypt"); // Ensure bcrypt is imported
const UserModel = require("../models/user.model"); // Ensure User model is properly imported
const createUser = require("../services/services"); // Ensure the service is properly imported

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const data = await createUser.loginUser(email, password);
     
    // If password matches, return success response
    return res.status(200).json({ message: "Login successful", data,token:data.token });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Other functions as provided by you
const signup = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Data not found" });
  }
  try {
    const data = await createUser.createuser(req.body);
    if (data) {
      return res.status(200).json({ message: "Data created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getalluser = async (req, res) => {
  try {
    const fetchallUser = await UserModel.findAll();
    console.log(fetchallUser);
    return res
      .status(200)
      .json({ message: "Data found successfully", fetchallUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteuser = async (req, res) => {
  const { id } = req.params; // Get the id from the request parameters
  

  try {
    // Call the service function to delete the user
    const result = await createUser.deleteuser(id,req.user.id);

    // Send back the result as a response
    return res.status(200).json(result); // Send the message and data
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: error.message }); // Return the error message
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params; // Get the id from the request parameters
  const updatedData = req.body; // Get the data to update from the request body

  if (!id || !updatedData) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const [rowsUpdated] = await createUser.updateuser(id, updatedData);

    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", rowsUpdated });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUser, signup, deleteuser, getalluser, loginUser };
