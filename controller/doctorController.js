const Post = require("../modal/post");

class postController {
  // get read post
  // private
  async showPost(req, res, next) {
    try {
      const posts = await Post.find();
      res.json({
        success: true,
        posts,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // get a post
  async getAPost(req, res, next) {
    try {
      const post = await Post.findOne({ user: req.userID, _id: req.params.id });
      res.send(post);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // post create Posts
  // private
  async createPost(req, res, next) {
    const { title, description, url, status } = req.body;

    if (!title) {
      res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    try {
      const post = new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `http://${url}`,
        status: status || "TO LEARN",
        user: req.userID,
      });

      post.save();

      return res.json({ success: true, message: "happy to learning", post });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // put update posts
  // private
  async updatePost(req, res, next) {
    const { title, description, url, status } = req.body;

    if (!title)
      return res.status(404).json({
        success: false,
        message: "Title is required",
      });

    try {
      let post = {
        title,
        description: description || "",
        url: url.startsWith("http://") ? url : `http://${url}` || "",
        status: status || "TO LEARN",
      };

      const conditions = {
        _id: req.params.id,
        user: req.userID,
      };

      post = await Post.findOneAndUpdate(conditions, post, {
        new: true,
      });

      if (!post)
        return res
          .status(403)
          .json({ success: false, message: "Not found post" });

      return res.json({ success: true, message: "Updated", post });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async deletePost(req, res, next) {
    try {
      const conditions = {
        _id: req.params.id,
        user: req.userID,
      };

      const deletePost = await Post.findOneAndDelete(conditions);

      if (!deletePost)
        res.status(403).json({ success: false, message: "Not found post" });

      res.json({ success: true, message: "Deleted", deletePost });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new postController();
