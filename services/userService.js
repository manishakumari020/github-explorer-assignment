
const axios = require('axios');
const User = require('../models/userModel');

async function saveUser(username) {
  try {
    let user = await User.findOne({ username });
    if (!user) {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const userData = response.data;
      userData.created_at = new Date(userData.created_at);
      userData.updated_at = new Date();
      user = await User.create(userData);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findMutualFollowers(username) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    const followersResponse = await axios.get(`https://api.github.com/users/${username}/followers`);
    const followingResponse = await axios.get(`https://api.github.com/users/${username}/following`);
    const followers = followersResponse.data.map(follower => follower.login);
    const following = followingResponse.data.map(following => following.login);
    const mutualFollowers = followers.filter(follower => following.includes(follower));
    return mutualFollowers;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function searchUsers(criteria) {
  try {
    const users = await User.find(criteria);
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function softDeleteUser(username) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    user.deleted = true;
    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateUser(username, newData) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    // Update user fields with newData
    Object.assign(user, newData);
    user.updated_at = new Date();
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function listUsers(sortBy) {
  try {
    const users = await User.find().sort(sortBy);
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  saveUser,
  findMutualFollowers,
  searchUsers,
  softDeleteUser,
  updateUser,
  listUsers
};

