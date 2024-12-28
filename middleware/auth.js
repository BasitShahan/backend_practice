const jwt = require('jsonwebtoken');


const verifyUser = async (req, res, next) => {
  try {
   console.log(process.env.SECRET)

    // Extract the token from the request headers
    const authHeader = req.header('Authorization');
    console.log(authHeader)
    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log(token)

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);
    
    console.log(decoded)
     
    // Attach the user information to the request object
    req.user = decoded;
    
    

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyUser;
