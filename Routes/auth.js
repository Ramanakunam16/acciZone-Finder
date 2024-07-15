const router = require("express").Router();

const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

router.post("/", async (req, res) => {
  try {
    // const { error } = validate(req.body);
    // if (error) {
    //   return res.status(400).send({ message: "Invalid Email or password" });
    // }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Invalid Email or password" });
    }

    const validPassword = await bcrypt.compare(req.body.passwd, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Email or password" });
    }
    console.log("successfully logged");
    // const token = user.generateAuthToken();
    return res.status(200).send({ message: "logged in successfully" });
  } catch (error) {
    return res.status(500).send({ message: "internal server error" });
  }
});

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().required().label("Email"),
    passwd: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
module.exports = router;
