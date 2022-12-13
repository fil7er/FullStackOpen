const IValidator = require('./IValidator');

const postLoginValidator = (body) => {
    const {username, passwordHash} = body;
    switch(true){
        case !username : return new IValidator(true, 400, "username is required");
        case !passwordHash : return new IValidator(true, 400, "password is required");
        case username.length < 3: return new IValidator(true, 400, "username must be at least 3 characters long");
        case passwordHash.length < 3: return new IValidator(true, 400, "password must be at least 3 characters long");
        case !/^[a-zA-Z0-9]+$/.test(username): return new IValidator(true, 400, "username must not contain special characters");
        default: return new IValidator();
    }
}

module.exports = {
    postLoginValidator
}