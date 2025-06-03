const utilisateursRepository = require('../repositories/utilisateursRepository')

exports.getAllUsers = async function() {
    return await utilisateursRepository.getAllUsers();
}