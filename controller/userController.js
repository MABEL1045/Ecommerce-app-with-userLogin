const bcrypt = require("bcryptjs");
const users = require("../models/user");

// To get all created users
const getUser = (req, res) => {
    res.json({status: "Ok", data: users});
};

// creating new users
const signup = async (req, res) => {
  try {
    const { email, fullName, password, confirmPassword } = req.body;
  const userPassword = await bcrypt.hash(password, 10);
  console.log(userPassword);
  if (password !== confirmPassword) {
    return res.json({ status: false, msg: "password does not match" });
  }
  let user = users.find((user) => user.email === email);
  if (user) {
    res.json({ status: false, msg: "email already exists" });
  } else {
    const newUser = { id: users.length + 1, email, fullName, userPassword };
    users.push(newUser);
    res.status(200).json({ msg: `User successfully created`, data: newUser });
  } 
}
  catch (err) {
      res.status(400).send(err);
  };
};

// login for already created users
const signIn = async (req, res) => {
  const { email } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.json({ status: "error", error: "invalid email" });
  };
  try {
  const validPassword = await bcrypt.compare(req.body.password, user.userPassword);
  if (!validPassword) return res.status(400).send('Invalid Password.');

  return res.json({ status: "ok", msg: "logged in", data: users });
} catch (err) {
    res.status(400).send(err);
};
};

module.exports = { signup, signIn, getUser };
