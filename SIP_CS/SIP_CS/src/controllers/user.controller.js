// Import User and Role models
import User from "../models/User.js";
import Role from "../models/Role.js";

// Function to create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // Create a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // Encrypt password
    user.password = await User.encryptPassword(user.password);

    // Save the new user
    const savedUser = await user.save();

    return res.status(200).json({ success: true, data: {
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    }});
  } catch (error) {
    console.error({ success: false, data: error });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Function to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ success: true, data: users });
  } catch (error) {
    console.error({ success: false, data: error });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Function to get a specific user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    return res.json({ success: true, data: user });
  } catch (error) {
    console.error({ success: false, data: error });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Function to update an existing user
export const updateUser = async (req, res) => {
  try {
    const { username, email, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      username,
      email,
      roles: rolesFound.map((role) => role._id),
    }, { new: true });

    return res.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error({ success: false, data: error });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Function to delete an existing user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error({ success: false, data: error });
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
