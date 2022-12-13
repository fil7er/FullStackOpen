export const userCreateValidator = (req, res, next) => {
    const {username, name, password, blogs} = req.body;
    
    switch(true){
        case username === undefined: return res.status(400).json({error: "username is required"});
        case name === undefined: return res.status(400).json({error: "name is required"});
        case password === undefined: return res.status(400).json({error: "password is required"});
        case blogs !== undefined: return res.status(400).json({error: "blogs is not allowed"});

        case username.length < 3: return res.status(400).json({error: "username must be at least 3 characters long"});
        case name.length < 3: return res.status(400).json({error: "name must be at least 3 characters long"});
        case password.length < 3: return res.status(400).json({error: "password must be at least 3 characters long"});

        case !/^[a-zA-Z0-9]+$/.test(username): return res.status(400).json({error: "username must not contain special characters"});
        case !/^[a-zA-Z0-9]+$/.test(name): return res.status(400).json({error: "name must not contain special characters"});

        default: return next();
    }
}