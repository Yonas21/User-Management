const express = require('express');
let userRoutes = express.Router();

let userController = require('../controllers/user');

//define the store route
userRoutes.post('/signup', userController.register);

//log into our account
userRoutes.post('/login', userController.authenticate);

//get one user
userRoutes.get('/:username', userController.get_one_user);
//delete the user route handler
userRoutes.delete('/:userId', userController.logout);

//find all users
userRoutes.get('/all_users', userController.getAllUsers);

userRoutes.post('/update_balance', userController.update_balance);

module.exports = userRoutes;
