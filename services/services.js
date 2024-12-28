const UserModel = require("../models/user.model"); // Ensure User model is properly imported
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

class CreateUser {
  async createuser(data) {
    try {
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userData = { ...data, password: hashedPassword };

      // Create a new user with hashed password
      const user = new UserModel(userData);
      
      return user; // Return user after creation
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user"); // Throw error so it can be caught in the controller
    }
  }

  async deleteuser(id, userID) {
    console.log(userID)
    try {
      // Check if the user is valid and authorized
      const isValidUser = await UserModel.findOne({ where: { id: userID } });
      console.log(isValidUser)
      if (!isValidUser) {
        // If the user is not authorized, throw an error
        throw new Error("User is not authorized to delete this record");
      }
  
      // Delete the user record
      const data = await UserModel.destroy({ where: { id } });
  
      // If no rows were deleted, throw an error
      if (data === 0) {
        throw new Error("User not found");
      }
  
      // Return success message and data
      return { message: "User has been deleted successfully", data };
    } catch (error) {
      // Handle any errors that occur
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
  

  async updateuser(id, updatedData) {
    try {
      const result = await UserModel.update(updatedData, {
        where: { id },
      });

      // Return the number of rows updated
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async loginUser(email, password) {
    try {
      // Find the user by email
      const user = await UserModel.findOne({ where: { email } });

      // Check if user exists
      if (!user) {
        throw new Error("User not found");
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);

      // If password does not match
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: "1d",
      });

      user.token = token;

      const store = await user.save();

      return { user, token };
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error(error.message);
    }
  }
}

module.exports = new CreateUser();
