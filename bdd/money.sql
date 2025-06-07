DROP TABLE IF EXISTS Categorie;
CREATE TABLE Categorie
(
    idCategorie       int auto_increment
        primary key,
    nomCategorie      varchar(50)                           not null,
    dateHeureCreation timestamp default current_timestamp() null,
    dateHeureMAJ      timestamp default current_timestamp() not null
);

DELIMITER $$
CREATE TRIGGER TRG_BEFORE_UPDATE_CATEGORIE
    before update
    on Categorie
    for each row
begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end$$
DELIMITER ;

DROP TABLE IF EXISTS SousCategorie;
CREATE TABLE SousCategorie
(
    idSousCategorie   int auto_increment
        primary key,
    nomSousCategorie  varchar(50)                           not null,
    idcategorie       int                                   not null,
    dateHeureCreation timestamp default current_timestamp() not null,
    dateHeureMAJ      timestamp default current_timestamp() not null,
    constraint SousCategorie_Categorie_idCategorie_fk
        foreign key (idcategorie) references Categorie (idCategorie)
            on delete cascade
);

DELIMITER $$
CREATE TRIGGER TRG_BEFORE_UPDATE_SOUS_CATEGORIE
    before update
    on SousCategorie
    for each row
begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end$$
DELIMITER ;

DROP TABLE IF EXISTS Utilisateur;
CREATE TABLE Utilisateur
(
    idUtilisateur     int auto_increment
        primary key,
    nomUtilisateur    varchar(50)                           not null,
    prenomUtilisateur varchar(50)                           not null,
    login             varchar(50)                           not null,
    mdp               varchar(50)                           null,
    hashcode          varchar(128)                          null,
    dateHeureCreation timestamp default current_timestamp() not null,
    dateHeureMAJ      timestamp default current_timestamp() null,
    ville             varchar(50)                           null,
    codePostal        char(5)                               null
);

DROP TABLE IF EXISTS Compte;
CREATE TABLE Compte
(
    idCompte          int auto_increment
        primary key,
    descriptionCompte varchar(50)                           not null,
    nomBanque         varchar(50)                           not null,
    idUtilisateur     int                                   not null,
    soldeInitial      decimal(6, 2) default 0.00            not null,
    dernierSolde      decimal(6, 2) default 0.00            not null,
    dateHeureCreation timestamp default current_timestamp() not null,
    dateHeureMAJ      timestamp default current_timestamp() null,
    constraint Compte_Utilisateur_idUtilisateur_fk
        foreign key (idUtilisateur) references Utilisateur (idUtilisateur)
            on delete cascade
);

DELIMITER $$
CREATE TRIGGER TRG_BEFORE_UPDATE_COMPTE
    before update
    on Compte
    for each row
begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end$$
DELIMITER ;

DROP TABLE IF EXISTS Tiers;
CREATE TABLE Tiers
(
    idTiers           int auto_increment
        primary key,
    nomTiers          varchar(50)                           not null,
    dateHeureCreation timestamp default current_timestamp() not null,
    dateHeureMAJ      timestamp default current_timestamp() not null,
    idUtilisateur     int       default 1                   not null,
    constraint Tiers_Utilisateur_idUtilisateur_fk
        foreign key (idUtilisateur) references Utilisateur (idUtilisateur)
);

DELIMITER $$
CREATE TRIGGER TRG_BEFORE_UPDATE_TIERS
    before update
    on Tiers
    for each row
begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER TRG_BEFORE_UPDATE_UTILISATEUR
    before update
    on Utilisateur
    for each row
begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end$$
DELIMITER ;

DROP TABLE IF EXISTS Virement;
CREATE TABLE Virement
(
    idVirement        int auto_increment
        primary key,
    idCompteDebit     int                                       not null,
    idCompteCredit    int                                       not null,
    montant           decimal(6, 2) default 0.00                not null,
    dateVirement      date          default (CURRENT_DATE)      not null,
    dateHeureCreation timestamp     default current_timestamp() not null,
    dateHeureMAJ      timestamp     default current_timestamp() not null,
    idTiers           int                                       null,
    idCategorie       int                                       null,
    constraint Virement_Compte_idCompte_fk
        foreign key (idCompteDebit) references Compte (idCompte),
    constraint Virement_Compte_idCompte_fk_2
        foreign key (idCompteCredit) references Compte (idCompte)
);

DROP TABLE IF EXISTS Mouvement;
CREATE TABLE Mouvement
(
    idMouvement       int auto_increment                    primary key,
    dateMouvement     date      default (CURRENT_DATE)      not null,
    idCompte          int                                   not null,
    idTiers           int       default 1                   null,
    idCategorie       int       default 1                   null,
    idSousCategorie   int                                   null,
    idVirement        int                                   null,
    montant           decimal(6, 2)                         null,
    typeMouvement     char                                  null,
    dateHeureCreation timestamp default current_timestamp() not null,
    dateHeureMAJ      timestamp default current_timestamp() not null,
    constraint Mouvement_Categorie_idCategorie_fk
        foreign key (idCategorie) references Categorie (idCategorie),
    constraint Mouvement_SousCategorie_idSousCategorie_fk
        foreign key (idSousCategorie) references SousCategorie (idSousCategorie)
            on update cascade on delete set null,
    constraint Mouvement_Tiers_idTiers_fk
        foreign key (idTiers) references Tiers (idTiers),
    constraint Mouvement_Virement_idVirement_fk
        foreign key (idVirement) references Virement (idVirement)
            on update cascade on delete set null,
    constraint Mouvement_Compte_idCompte_fk
        foreign key (idCompte) references Compte(idCompte)
);

DELIMITER $$
CREATE TRIGGER TRG_BEFORE_INSERT_MOUVEMENT
BEFORE INSERT ON Mouvement
FOR EACH ROW
BEGIN
    DECLARE v_Categorie INT DEFAULT 0;

    -- Vérification que la sous-catégorie appartient bien à la catégorie
    IF NEW.idSousCategorie IS NOT NULL THEN
        SELECT idCategorie INTO v_Categorie 
        FROM SousCategorie 
        WHERE idSousCategorie = NEW.idSousCategorie;

        IF v_Categorie <> NEW.iDCategorie THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = "La sous-catégorie n\'appartient pas à la catégorie choisie";
        END IF;
    END IF;

    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER TRG_BEFORE_INSERT_MOUVEMENT2
    BEFORE INSERT ON Mouvement
    for each row
begin
    IF NEW.typeMouvement = 'D' THEN
        UPDATE Compte
        SET dernierSolde = dernierSolde - NEW.montant
        WHERE idCompte = NEW.idCompte;
    END IF; 
    IF NEW.typeMouvement = 'C' THEN
        UPDATE Compte
        SET dernierSolde = dernierSolde + NEW.montant
        WHERE idCompte = NEW.idCompte;
    END IF;
end$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER TRG_AFTER_DELETE_VIREMENT
    after delete
    on Virement
    for each row
begin
    DELETE FROM Mouvement WHERE idVirement = OLD.idVirement;
end$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER TRG_AFTER_INSERT
    after insert
    on Virement
    for each row
begin
    /* Il faut insérer deux mouvements correspondant à ce virement inter-comptes */
/* un mouvement au débit sur le compte débité */
/* Un mouvement au crédit sur le cmpte crédité */
INSERT INTO Mouvement(idCompte,montant,typeMouvement,idVirement,dateMouvement) VALUES (NEW.idCompteDebit,(NEW.montant * -1),'D',NEW.idVirement,NEW.dateVirement);
INSERT INTO Mouvement(idCompte,montant,typeMouvement,idVirement,dateMouvement) VALUES ( NEW.idCompteCredit,NEW.montant, 'C',NEW.idVirement,NEW.dateVirement);
end$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER TRG_BEFORE_UPDATE_VIREMENT
    before update
    on Virement
    for each row
begin
    SET NEW.dateHeureMAJ = CURRENT_TIMESTAMP;
end$$
DELIMITER ;

CREATE OR REPLACE VIEW V_CATEGORIE as
select `c`.`nomCategorie` AS `nomCategorie`, `sc`.`nomSousCategorie` AS `nomSousCategorie`
from Categorie `c`
         join SousCategorie `sc`
where `sc`.`idcategorie` = `c`.`idCategorie`
order by `c`.`nomCategorie`, `sc`.`nomSousCategorie`;

CREATE OR REPLACE VIEW V_MOUVEMENT as
select `m`.`idMouvement`         AS `idMouvement`,
       `m`.`dateMouvement`       AS `dateMouvement`,
       `c`.`descriptionCompte`   AS `descriptionCompte`,
       `c`.`nomBanque`           AS `nomBanque`,
       `t`.`nomTiers`            AS `nomTiers`,
       `ctg`.`nomCategorie`      AS `nomCategorie`,
       `sctg`.`nomSousCategorie` AS `nomSousCategorie`,
       `m`.`montant`             AS `montant`
from ((((Mouvement `m` join Compte `c`
         on (`m`.`idCompte` = `c`.`idCompte`)) join Tiers `t`
        on (`m`.`idTiers` = `t`.`idTiers`)) join Categorie `ctg`
       on (`m`.`idCategorie` = `ctg`.`idCategorie`)) left join SousCategorie `sctg`
      on (`m`.`idSousCategorie` = `sctg`.`idSousCategorie`))
order by `m`.`dateMouvement`;

