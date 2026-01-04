const passport = require('passport');
const authService = require('../services/authService');

class AuthController {
  // Register a new user
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      const token = authService.generateToken(user);

      res.status(201).json({
        success: true,
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Login user
  async login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'An error occurred during login',
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || 'Invalid credentials',
        });
      }

      const token = authService.generateToken(user);

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: {
          user: userWithoutPassword,
          token,
        },
      });
    })(req, res, next);
  }

  // Get current user profile
  async getProfile(req, res) {
    try {
      const user = await authService.getUserProfile(req.user.id);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
    try {
      const user = await authService.updateUserProfile(req.user.id, req.body);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
