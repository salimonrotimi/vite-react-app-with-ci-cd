// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongodbConnection = require('../dbconnection');
const UserSchemaModel = require('../model/user-schema');

// const objectId = mongoose.Types.ObjectId;

mongodbConnection();

const getAllUsers = async(req, res) => {
    try {
        const result = await UserSchemaModel.find({}).select('username email gender');

        if (!result) {
            return res.status(400).json({
                success: false,
                error_message: 'Failed to retrieve users.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully.',
            result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error_message: 'Error retrieving users.' + error,
        });
    }
};

// const getUserById = async (req, res) => {};

// const updateUser = async (req, res) => {};

// const deleteUser = async (req, res) => {};

// REGISTER USER
const registerUser = async(req, res) => {
    try {
        const { username, email, password, gender } = req.body;

        if (!username || !email || !password || !gender) {
            return res.status(400).json({
                success: false,
                error_message: 'Please fill all form field to continue.',
            });
        }

        const emailExist = await UserSchemaModel.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                success: false,
                error_message: 'Email already in use.',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const preparedData = { username, email, password: hashedPassword, gender };

        const result = await UserSchemaModel.create(preparedData);

        if (!result) {
            return res.status(400).json({
                success: false,
                error_message: 'User registration failed.',
            });
        }

        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error registering user.' + error,
        });
    }
};

// LOGIN USER
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error_message: 'Please fill all form field to continue.',
            });
        }

        const emailExist = await UserSchemaModel.findOne({ email });

        if (!emailExist) {
            return res.status(400).json({
                success: false,
                error_message: 'Email does not exist. Kindly register if you are a new user.',
            });
        }

        const comparePassword = await bcrypt.compare(password, emailExist.password);

        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                error_message: 'User login failed. Inavalid email or password.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User login successfully.',
            user_record: {
                username: emailExist.username,
                email: emailExist.email,
                gender: emailExist.gender,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error logging in user.' + error,
        });
    }
};

module.exports = {
    getAllUsers,
    // getUserById,
    // updateUser,
    // deleteUser,
    registerUser,
    loginUser,
};