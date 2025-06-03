const utilisateursRepository = require('../repositories/utilisateursRepository')

exports.getAllUsers = async function() {
    return await utilisateursRepository.getAllUsers();
}

exports.getUserById = async function(id) {
    return await utilisateursRepository.getUserById(id);
}

exports.getUserAccounts = async function(id) {
    return await utilisateursRepository.getUserAccounts(id);
}

exports.getUserAccountById = async function(userId, accountId) {
    return await utilisateursRepository.getUserAccountById(userId, accountId);
}

exports.getUserAccountMovements = async function(userId, accountId) {
    return await utilisateursRepository.getUserAccountMovements(userId, accountId);
}

/*utilisateur
/utilisateur/X 
/utilisateurs/X/Comptes
/utilisateurs/X/Comptes/X
/utilisateurs/X/Comptes/X/Mouvements
/utilisateurs/X/Comptes/X/Mouvements/tiers
/utilisateurs/X/tiers
/utilisateurs/X/virements
/categories
/categories/X
/categories/X/sousCategories
/categories/X/sousCategories/X
/utilisateurs/X/Mouvements
/Utilisateurs/X/Comptes/X/Mouvements/Souscategories/X/utilisateurs/X/Comptes
*/