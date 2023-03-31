const jwt = require('jsonwebtoken');

const VerifToken = (req,res,next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];

        return jwt.verify(token,`${process.env.SECRET}`, (err,decoded) => {
            if(err) {
                return res.status(500).json({message:err});
            }

            req.userId = decoded?._id;

            return next();
        }) ;
    }

    return res.status(401).json({message:'Unauthorized , no token found'});
}

module.exports = VerifToken;