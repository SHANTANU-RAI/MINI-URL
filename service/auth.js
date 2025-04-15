const jwt = require('jsonwebtoken');

function setUser(User) {
    const token = jwt.sign({
        _id: User._id,
        email: User.email,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
}

function getUser(token) {
    if(!token) {
        return null;
    }
    try {
    return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null;
    }

}

module.exports = {
    setUser,
    getUser
}