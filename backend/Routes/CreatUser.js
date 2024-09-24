const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post(
  "/creatuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password , salt)
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        password: secPassword,
        email: req.body.email,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let user = await User.findOne({email});
      if (!user) return res.status(400).json({ errors: "wrong credentials" });

      const pswdCompare = await bcrypt.compare(req.body.password, user.password);
      if (!pswdCompare)
        return res.status(400).json({ errors: "wrong credentials" });

      const data  = {
        user : {
          id:user._id
        }
      }

      const authToken = jwt.sign(data, "secretkey")
      return res.json({ success: true , authToken : authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
