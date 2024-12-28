const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../config/db.config");

// Define the model
const UserBlog = sequelize.define("blog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, // Mark as the primary key
    allowNull: false,
  },
  blog: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file: {
    type: DataTypes.BLOB("long"), 
  },
});

// Synchronize the model with the database
sequelize
  .sync() // Use `force: true` to drop and recreate the table
  .then(() => {
    console.log("blog table has been created!");
  })
  .catch((error) => {
    console.error("Error creating the User table:", error);
  });

module.exports = UserBlog;
