-- Code below for dropping all tables
DROP TABLE `emailVerf`;
DROP TABLE `parts`;
DROP TABLE `refreshTokens`;
DROP TABLE `rounds`;
DROP TABLE `shots`;
DROP TABLE `user`;



-- Code below for just reset
-- NEEDS UPDATING
TRUNCATE `parts`;
TRUNCATE `rounds`;
TRUNCATE `shots`;
TRUNCATE `user`;

INSERT INTO `user`(`name`, `email`, `password`, `mailVerf`, `dateCreated`) VALUES ('TestUser', 'test@test.nl', 'TestPW', '0', '2022-5-16');
