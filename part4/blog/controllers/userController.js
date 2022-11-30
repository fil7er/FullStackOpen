const User = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
}

const findAllUsers = async (request, response, next) => {
    try {
        const users = await User.find({});
        response.json(users);
    }
    catch (error) {
        next(error);
    }
}

const findUserById = async (request, response, next) => {
    try{
        const user = await User.findById(request.params.id);
        if(user) {
            response.json(user);
        }
        else {
            response.status(404).end();
        }
    }
    catch (error) {
        next(error);
    }
}

const createUser = async (request, response, next) => {
    try {
        const body = request.body;
        const token = getTokenFrom(request);
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if(!token || !decodedToken.id) {
            return response.status(401).json({error: 'token missing or invalid'});
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        });
        const savedUser = await user.save();
        response.json(savedUser);
    }
    catch (error) {
        next(error);
    }

}

const updateUserPassword = async (request, response, next) => {
    try{
        const body = request.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);
        const user = new User({
            id: body.id,
            passwordHash
        });
        const updatedUser = await User.findByIdAndUpdate(request.params.id, user, {new: false});
        response.json(updatedUser);
    }
    catch (error) {
        next(error);
    }
}

const deleteUser = async (request, response, next) => {
    try{
        await User.findByIdAndRemove(request.params.id);
        response.status(204).end();
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUserPassword,
    deleteUser
}
