var jwt = require('jsonwebtoken');
const {User} = require("../models")
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const checkUser = await jwt.verify(token, process.env.JWT_SECRET_KEY,
          
            async(err, decoded) => {
                if (err) {
                    console.error('Token verification failed:', err.message);
                    return res.status(401).json({
                        status: false,
                        error:"Token verification failed"
                    })
                }
                console.log(decoded,"decoded");
                req.user = decoded
                next();
            })
    } catch (error) {
        return res.status(401).json({
            status: false,
            error: "Un-Authorized"
        })
    }
}
