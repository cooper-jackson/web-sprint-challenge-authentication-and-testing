const db = require('../../data/dbConfig.js');

function find() { // Get all users
    return db('users as u')
    .select('id', 'username')
}

function findBy(filter) { // Find all users (used later for searching by Username)
    return db('users as u')
    .select('id', 'username', 'password')
    .where(filter).first()
}

function findById(id) { // Find by user ID
    return db('users as u')
    .select('id', 'username', 'password')
    .where({id}).first()
}

const add = async (user) => { // Create new user and return using findbyid
    const [id] = await db('users').insert(user)
    return findById(id)
}

module.exports = { add, find, findBy, findById, };
