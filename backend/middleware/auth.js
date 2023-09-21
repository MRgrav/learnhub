// export default async function Auth(req, res, next) {
//     try {
//         //access auth header to validate
//         const token = req.headers.authorization;
//         res.json(token);
//     } catch (err) {
//         res.status(401).json({error: err.message});
//     }
// }

// middleware/auth.js

const isLoggedIn = (req, res, next) => {
    // Check if the user is authenticated (e.g., by checking for a valid session or token)
    if (req.isAuthenticated()) {
      return next(); // User is logged in, allow access to the route
    }
    return res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated
};


  
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next(); // Allow access to admin routes
    }
    return res.status(403).json({ message: 'Access denied.' });
};

module.exports = isLoggedIn;
module.exports = isAdmin;

  