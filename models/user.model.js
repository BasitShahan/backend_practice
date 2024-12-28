const { Sequelize, DataTypes } = require("sequelize");

const  {sequelize} =require("../config/db.config")


// Define the model
const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, // Mark as the primary key
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Name is required
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Email is required
    unique: true, // Ensure no duplicate emails
    validate: {
      isEmail: true, // Ensure the format is a valid email
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true, // Optional field
    validate: {
      min: 0, // Ensure age is non-negative
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
    validate: {
      isNumeric: true, // Ensure phone only contains numbers
    },
  },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true, // Token field to store JWT tokens
    },

});

// Synchronize the model with the database
sequelize.sync() // Use `force: true` to drop and recreate the table
  .then(() => {
    console.log("User table has been created!");
  })
  .catch((error) => {
    console.error("Error creating the User table:", error);
  });

module.exports = UserModel;
