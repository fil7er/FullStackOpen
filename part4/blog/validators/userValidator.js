const IValidator = require('./IValidator');

const userCreateValidator = (body) => {
    const {username, name, password, blogs} = body;
    
    switch(true){
        case !username : return new IValidator(true, 400, "username is required");
        case !name : return new IValidator(true, 400, "name is required");
        case !password : return new IValidator(true, 400, "password is required");
        case blogs : return new IValidator(true, 400, "blogs is not allowed");

        case username.length < 3: return new IValidator(true, 400, "username must be at least 3 characters long");
        case name.length < 3: return new IValidator(true, 400, "name must be at least 3 characters long");
        case password.length < 3: return new IValidator(true, 400, "password must be at least 3 characters long");

        case !/^[a-zA-Z0-9]+$/.test(username): return new IValidator(true, 400, "username must not contain special characters");
        case !/^[a-zA-Z0-9]+$/.test(name): return new IValidator(true, 400, "name must not contain special characters");

        default: return new Validator();
    }
}


module.exports = {
    userCreateValidator
}