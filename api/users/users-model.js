const db = require('../../data/dbConfig.js');

function find() {
    return db('users as u')
    .select('id', 'username')
}

function findBy(filter) {
    return db('users as u')
    .select('id', 'username', 'password')
    .where(filter).first()
}

function findById(id) {
    return db('users as u')
    .select('id', 'username', 'password')
    .where({id}).first()
}

const add = async (user) => {
    const [id] = await db('users').insert(user)
    return findById(id)
}

// async function add({ username, password, role_name }) { // done for you
//   let created_id
//   await db.transaction(async trx => {
//     let role_id_to_use
//     const [role] = await trx('roles').where('role_name', role_name)
//     if (role) {
//       role_id_to_use = role.role_id
//     } else {
//       const [role_id] = await trx('roles').insert({ role_name: role_name })
//       role_id_to_use = role_id
//     }
//     const [id] = await trx('users').insert({ username, password, role_id: role_id_to_use })
//     created_id = id
//   })
//   return findById(created_id)
// }

module.exports = { add, find, findBy, findById, };
