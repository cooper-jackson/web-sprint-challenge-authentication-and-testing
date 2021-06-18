const Users = require('../users/users-model');

const checkUsernameExists = async (req, res, next) => {
    const { username } = req.body
    const user = await Users.findBy({ username })
    if(user) {
      req.user = user
      next()
    } else {
      next({status: 401, message: 'Invalid Credentials'})
    }
}

function checkUsernameUnique(req, res, next) {
    const { username } = req.body;
    Users.findBy({ username })
    .then(user => {
    if (user) {
        next({ status: 401, message: 'username taken' });
    } else {
        next();
    }
    })
    .catch(next);
}


const validateBody = (req, res, next) => {
    const { username, password} = req.body
    if(!username || username.trim() === "" || !password || password.trim() === "") {
        next({status: 401, message: 'username and password required'})
    } else {
        req.body.username = req.body.username.trim()
        next()
    }
}

module.exports = { checkUsernameExists, validateBody, checkUsernameUnique }

