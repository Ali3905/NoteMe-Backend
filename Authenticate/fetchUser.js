const Jwt_Token = "Ali"
const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    const token = req.header("auth-token")
    if (!token) {
        res.status(400).send("Authenticate with correct Credentials")
    }
    try {
        const data = jwt.verify(token, Jwt_Token);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send("Authenticate with correct Credentials")
    }
    
}

module.exports = fetchUser