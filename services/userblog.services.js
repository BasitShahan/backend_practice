const Blog = require("../models/user.blog");

class Blogs {
  async createblog(file, blog) {
    try {

       const newBlog = await Blog.create({
        blog,
        filename: file.name,
        file: file.data,
       });
     
      return { message: "Blog Created successfully", newBlog };
    } catch (error) {
      return error;
    }
  }
}

module.exports = new Blogs();
