const isAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    next();
  };

module.exports=isAuthenticated