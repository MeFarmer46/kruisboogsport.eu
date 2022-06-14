CREATE TABLE `user` (
    `userID` INT NOT NULL AUTO_INCREMENT,
    `name` TEXT,
    `email` TEXT,
    `password` TEXT,
    `mailVerf` BOOLEAN,
    `dateCreated` DATE,
    PRIMARY KEY (`userID`)
);

CREATE TABLE `shots` (
    `shotID` INT NOT NULL AUTO_INCREMENT,
    `score` TINYINT,
    `distance` SET('10m', '20m', '30m'),
    `round` INT,
    `x` SMALLINT,
    `y` SMALLINT,
    `date` DATE,
    `userID` INT,
    PRIMARY KEY (`shotID`)
);

CREATE TABLE `rounds` (
    `roundID` INT NOT NULL AUTO_INCREMENT,
    `distance` SET('10m', '20m', '30m'),
    `date` DATE,
    `user` INT,
    PRIMARY KEY (`roundID`)
);

CREATE TABLE `parts` (
    `partID` INT NOT NULL AUTO_INCREMENT,
    `name` TEXT,
    `shotCount` INT,
    `user` INT,
    PRIMARY KEY (`partID`)
);

CREATE TABLE `emailVerf` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `userID` INT,
    `CODE` TEXT,
    `email` TEXT,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `refreshTokens` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `code` TEXT,
    PRIMARY KEY (`ID`)
);