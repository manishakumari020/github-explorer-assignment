// controllers/userController.js
const userService = require('../services/userService');

async function saveUser(req, res, next) {
  const username = req.params.username;
  try {
    const user = await userService.saveUser(username);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function findMutualFollowers(req, res, next) {
  const username = req.params.username;
  try {
    const mutualFollowers = await userService.findMutualFollowers(username);
    res.json(mutualFollowers);
  } catch (error) {
    next(error);
  }
}

async function searchUsers(req, res, next) {
  const criteria = req.query;
  try {
    const users = await userService.searchUsers(criteria);
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function softDeleteUser(req, res, next) {
  const username = req.params.username;
  try {
    await userService.softDeleteUser(username);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const username = req.params.username;
  const newData = req.body;
  try {
    const updatedUser = await userService.updateUser(username, newData);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function listUsers(req, res, next) {
  const sortBy = req.query.sortBy;
  try {
    const users = await userService.listUsers(sortBy);
    res.json(users);
  } catch (error) {
    next(error);
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
