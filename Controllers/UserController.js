const { verify } = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../JWT/JWT');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const signUp = async(req, res)=>{
    try {
        const {username, email, password} = req.body;
        const hash = await bcrypt.hash(password, 10);
        if(username && email && password ){
            const newUser = await User.create({
                username,
                email,
                password:hash
            });

            res.json(newUser);

        }

        res.status(400);
        
    } catch (error) {
        console.log(error);
    }
}

const signIn = async(req, res)=>{
    try {
        const {password, email} = req.body;

        const foundUser = await User.findOne({email:email});

        const match = bcrypt.compare(password,foundUser.password );

        if(!match){
            res.status(401);
        }

        const accessToken = generateAccessToken(foundUser);
        const refreshToken = generateRefreshToken(foundUser);

        res.cookie('refresh-token', refreshToken, {httpOnly:true, maxAge:1000*60*60*24*5}).json(accessToken);

    } catch (error) {
        console.log(error);
        
    }
}

const getUser = async(req, res)=>{
    
    try {
        const{id}= req;
        const foundUser = await User.findOne({_id:id});

        if(!foundUser){
            res.json('User not found')
        }

        else{
            res.json(foundUser)
        }

        
        
    } catch (error) {
        console.log(error);
        
    }
}

const signOut = async(req, res)=>{
    try {

        const refreshToken = req.cookies['refresh-token'];
        if(!refreshToken){
            res.status(401);
        }

        verify(refreshToken, REFRESH_TOKEN_SECRET, (error, decoded)=>{
            if(error){
                res.status(403)
            }
            res.clearCookie('refresh-token',{maxAge:1000*60*60*24}).json('Logged out successfully');
        })

        
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    signIn,
    signUp,
    signOut,
    getUser,

}