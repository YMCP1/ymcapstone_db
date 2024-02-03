const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const EditHistory = require("../model/editHistoryModel");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_KEY, { expiresIn: "10d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  console.log("Request body:", req.body); // Add this line
  const { firstName, lastName, email, password, phone, btc, eth, role,btcdollar,ethdollar } =
    req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password,
      phone,
      btc,
      eth,
      btcdollar,
      ethdollar,
      role
    );
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log("Error in signupUser:", error); // Add this line
    res.status(400).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, password, btc, eth,btcdollar,ethdollar } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const editHistory = new EditHistory({
      userId: user._id,
      editedFields: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        password: user.password,
        btc: user.btc,
        eth: user.eth,
        btcdollar:user.btcdollar,
        ethdollar:user.ethdollar
      },
      editedAt: new Date(),
    });

    await editHistory.save();

    user.editHistory.push(editHistory._id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      user.password = hash;
    }
    if (btc !== undefined) user.btc = btc;
    if (eth !== undefined) user.eth = eth;
    if(btcdollar !== undefined) user.btcdollar = btcdollar;
    if(ethdollar !== undefined) user.ethdollar = ethdollar;

    await user.save();

    res.status(200).json({
      user: {
        ...user.toObject(), 
        editHistory: await EditHistory.find({ userId: user._id }),
      },
    });
  } catch (error) {
    console.log("Error in editUser:", error);
    res.status(400).json({ error: error.message });
  }
};



const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({ role: 0 });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("editHistory");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  editUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
