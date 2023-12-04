const {sign, verify} = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const generateAccessToken = (user)=>{
   const token = sign({id:user._id}, ACCESS_TOKEN_SECRET, {expiresIn:'600s'});
   return token;
}

const generateRefreshToken =(user)=>{
    const token = sign({id:user._id}, REFRESH_TOKEN_SECRET, {expiresIn:'5d'});
    return token
}


const verifyAccessToken = async(req, res, next)=>{
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if(accessToken){
        verify(accessToken, ACCESS_TOKEN_SECRET, (error, decoded)=>{
            if(error){
                res.status(403)
            }

            else if(decoded){
                req.id = decoded.id;
                next();
            }
            
        } )

       
    }

    else{
        res.status(401);
    }
}

const refreshToken = (req, res)=>{
    const refreshToken = req.cookies['refresh-token'];
    if(!refreshToken){
        res.status(401);
    }

    verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded)=>{
        if(error){
            res.status(403);
        }

        const accessToken = sign({id:decoded.id}, ACCESS_TOKEN_SECRET, {expiresIn:'600s'});
        res.json(accessToken);

    })
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    refreshToken
}