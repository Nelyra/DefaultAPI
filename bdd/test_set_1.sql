-- Données pour la table Categorie
INSERT INTO Categorie (nomCategorie) VALUES 
('Alimentation'),
('Transport'),
('Logement');

-- Données pour la table SousCategorie
INSERT INTO SousCategorie (nomSousCategorie, idCategorie) VALUES 
('Supermarché', 1),
('Restaurant', 1),
('Essence', 2),
('Loyer', 3),
('Électricité', 3);

-- Données pour la table Utilisateur
INSERT INTO Utilisateur (nomUtilisateur, prenomUtilisateur, login, mdp, ville, codePostal) VALUES 
('Dupont', 'Jean', 'jdupont', '1234', 'Paris', '75001'),
('Martin', 'Sophie', 'smartin', 'abcd', 'Lyon', '69000');

-- Données pour la table Compte
INSERT INTO Compte (descriptionCompte, nomBanque, idUtilisateur) VALUES 
('Compte courant', 'BNP', 1),
('Livret A', 'LCL', 1),
('Compte joint', 'Crédit Agricole', 2);

-- Données pour la table Tiers
INSERT INTO Tiers (nomTiers, idUtilisateur) VALUES 
('Franprix', 1),
('EDF', 1),
('SNCF', 2),
('Boulangerie', 1);

-- Données pour la table Virement
INSERT INTO Virement (idCompteDebit, idCompteCredit, montant, dateVirement, idTiers, idCategorie) VALUES 
(1, 2, 100.00, '2025-06-01', 1, 1),
(2, 3, 50.00, '2025-06-02', 3, 2);

-- Données supplémentaires dans Mouvement (hors virements générés par triggers)
INSERT INTO Mouvement (dateMouvement, idCompte, idTiers, idCategorie, idSousCategorie, montant, typeMouvement) VALUES 
('2025-06-01', 1, 1, 1, 1, 45.60, 'D'),
('2025-06-01', 1, 4, 1, 2, 8.90, 'D'),
('2025-06-02', 2, 2, 3, 5, 60.00, 'D');