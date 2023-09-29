const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// const isLoggedIn = (req, res, next) => {
//     // Check if the user is authenticated (e.g., by checking for a valid session or token)
//     if (req.isAuthenticated()) {
//       return next(); // User is logged in, allow access to the route
//     }
//     return res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated
// };


  
// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//       return next(); // Allow access to admin routes
//     }
//     return res.status(403).json({ message: 'Access denied.' });
// };

const verifyUser = (req, res, next) =>{
  const token = req.cookies.token;
  if (!token) {
    return res.json({Error: `no token : ${token}`});
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({Error: 'token not okay'})
      } else {
        res.email = decoded.email;
        req.role = decoded.role;
        console.log(decoded);
        next();
      }
    })
  }
};

module.exports = verifyUser;
// module.exports = isLoggedIn;
// module.exports = isAdmin;

  