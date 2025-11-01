const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        const status = error.status || 400;
        res.status(status).json({ message: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    await authService.verifyEmail(token);
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    const status = error.status || 400;
    res.status(status).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        const status = error.status || 401;
        res.status(status).json({ message: error.message });
    }
};