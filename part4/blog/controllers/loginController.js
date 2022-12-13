const User = require('../schema/userSchema')
const jwt = require('jsonwebtoken')
const { postLoginValidator } = require('../validators/loginValidator')


const login = async (request, response, next) => {
    try{
        const body = request.body;

        /** Validação Back-end */
        const loginValidation = postLoginValidator(body);
        if(loginValidation.error) return response.status(loginValidation.status).json({error: loginValidation.message});

        const user = await User.findOne({username: body.username});
        if(!user) {
            return response.status(401).json({error: 'invalid username'});
        }

        const passwordCorrect = user.passwordHash === body.password;
        if(!passwordCorrect) {
            return response.status(401).json({error: 'invalid password'});
        }
        const userForToken = {
            username: user.username,
            id: user._id
        }
        const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});
        response.status(200).send({token, username: user.username, name: user.name});
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    login
}