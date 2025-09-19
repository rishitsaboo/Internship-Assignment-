const jwt = require("jsonwebtoken");

// middleware to protect routes

const authMiddleware = (req, res, next) => {
    // get authorization header (it looks like "Bearer tokenvalue")
    const authHeader = req.headers["authorization"];
    
    // check if header is exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({message: "No token, authorization denied"});
    }

    // Extract the token (remove "Bearer " )
    const token = authHeader.split(" ")[1];

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // attach user info to request object(so controllers can use req.user)

        req.user = decoded;
        // pass control to next handler
        next();
    }
    catch (error) {
        return res.status(401).json({message: "Token is not valid"});
    }
    };

    module.exports = authMiddleware ;