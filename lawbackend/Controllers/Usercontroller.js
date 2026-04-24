const User = require("../models/User");

// ✅ REGISTER
const registerUser = async (req, res) => {
  try {
    let { name, email, password, role, barNumber } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
      barNumber: role === "lawyer" ? barNumber : ""
    });

    await newUser.save();

    res.json({ message: "Registered successfully" });

  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
};

// ✅ LOGIN
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      role: user.role,
      user
    });

  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
};

module.exports = { registerUser, loginUser };