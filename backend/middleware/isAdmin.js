const isAdmin = (req, res, next) => {
  // const token = req.cookies.token;
  // console.log(req.cookies.token);
  // if (!token) {
  //   return res.json({Error: `no token : ${token}`});
  // } else {
  //   jwt.verify(token, JWT_SECRET, (err, decoded) => {
  //     if (err) {
  //       return res.json({Error: 'token not okay'})
  //     } else {
        if (req.role === 'admin') {
          return next(); // User is an admin, allow access to the route
        }
        return res.status(403).json({ message: 'Access denied. You are not an admin.' });
  //     }
  //   })
  // }
};

module.exports = isAdmin;

