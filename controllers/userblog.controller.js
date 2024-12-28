const blogs = require("../services/userblog.services");

// const createUserBlog = async (req, res) => {
//   const { blog } = req.body;

//   const file = req.files ? req.files.file : null;
//   // console.log(file);
//   // console.log(blog);

//   try {
//     if (!file || !blog) {
//       return res.status(400).json({ message: "fill the required fields" });
//     }

//     const data = await blogs.createblog(file, blog);
//    const a="hey"+file.name
//   console.log(a)

//     file.mv("./uploads/"+file.name, function (err) {
//       if (err) {
//         res.send(err)
//       } 
//     });

//     return res.status(201).json({ message: "Blog created successfully", data });
//   } catch (error) {
//     console.error("Error creating blog:", error);
//     return res
//       .status(500)
//       .json({ message: "Error creating blog", error: error.message });
//   }
// };


// module.exports = {
//   createUserBlog,
// };



const createUserBlog = async (req, res) => {
  const { blog } = req.body;
  const file = req.files ? req.files.file : null;

  try {
    if (!file || !blog) {
      return res.status(400).json({ message: "Fill the required fields" });
    }

     
    // Validate file type (only allow jpg/jpeg)
    const allowedTypes = ["image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: "Only JPG files are allowed" });
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return res.status(400).json({ message: `File size should not exceed ${maxSize / (1024 * 1024)} MB` });
    }
   

    const data = await blogs.createblog(file, blog);
    const filePath = "./uploads/" + file.name;

    file.mv(filePath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(201).json({ message: "Blog created successfully", data });
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ message: "Error creating blog", error: error.message });
  }
};

module.exports = {
  createUserBlog,
};
