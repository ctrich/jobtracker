const passport = require('passport');

// Middleware to protect routes
const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized access' 
      });
    }
    
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { authenticate };
