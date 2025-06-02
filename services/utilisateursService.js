const utilisateursRepository = require('../repositories/utilisateursRepository')

exports.getAllUsers = async function() {
    return await utilisateursRepository.getAllUsers();
}

exports.getUserById = async function(id) {
    return await utilisateursRepository.getUserById(id);
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