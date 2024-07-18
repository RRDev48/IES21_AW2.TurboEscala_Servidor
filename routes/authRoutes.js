const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', (req, res) => {
    const { action, email, password, firstName, lastName } = req.body;
    if (action === 'register') {
        authController.registerUser(req, res);
    } else if (action === 'login') {
        authController.loginUser(req, res);
    } else {
        res.status(400).json({ message: 'Acción no válida' });
    }
});

module.exports = router;
