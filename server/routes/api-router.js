const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    // getUserById,
    // updateUser,
    // deleteUser,
    registerUser,
    loginUser,
} = require('../controller/route-controller');

router.get('/', getAllUsers);

// router.get('/:id', getUserById);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

router.post('/register', registerUser);
router.post('/login', loginUser);

console.log('Hello world');

module.exports = router;