const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../modal/user");

class userController {
  //get
  async verifyAuth(req, res, next) {
    try {
      const user = await User.findById(req.userID).select("-password");
      if (!user)
        res.status(400).json({ success: false, message: "User is not found" });
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async register(req, res, next) {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username and/or password" });

    try {
      // Check for existing user
      const user = await User.findOne({ username });
      if (user) {
        res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // All good
      const newHashPass = await argon2.hash(password);
      const newUser = new User({ username, password: newHashPass });
      await newUser.save();
      // Return token
      const accessToken = jwt.sign(
        { userID: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        access: true,
        message: "Create account success",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: "Missing username or password",
      });
    try {
      // check exist account
      const user = await User.findOne({ username });

      if (!user)
        return res.status(400).json({
          success: false,
          message: "Incorrect user or password",
        });
      // check password
      var checkPassword = await argon2.verify(user.password, password);
      if (!checkPassword)
        return res.status(400).json({
          success: false,
          message: "Incorrect usename or password",
        });

      const successToken = jwt.sign(
        {
          userID: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "login successfully",
        successToken,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: "server error" });
    }
  }
}

module.exports = new userController();
