-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mer 18 Février 2015 à 09:19
-- Version du serveur: 5.5.41-0ubuntu0.14.04.1
-- Version de PHP: 5.5.9-1ubuntu4.6

DROP DATABASE IF EXISTS todoManager_db;
CREATE DATABASE todoManager_db;
grant all on `todoManager_db`.* to 'todomanager'@'localhost' identified by 'todomanager';

USE todoManager_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `todoManager_db`
--

--
-- Structure de la table `CATEGORY`
--

CREATE TABLE `CATEGORY` (
`id_category` int(11) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `CONTACTS`
--

CREATE TABLE `CONTACTS` (
  `id_user` int(11) NOT NULL,
  `id_contact` int(11) NOT NULL,
  `id_group` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `GROUPS`
--

CREATE TABLE `GROUPS` (
`id_group` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id_owner` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `GROUPS`
--

INSERT INTO `GROUPS` (`id_group`, `name`, `id_owner`) VALUES
(1, 'Test', 15),
(3, 'Test', 17);

-- --------------------------------------------------------

--
-- Structure de la table `SHARE_LIST`
--

CREATE TABLE `SHARE_LIST` (
  `id_user` int(11) NOT NULL,
  `id_list` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `SHARE_LIST`
--

INSERT INTO `SHARE_LIST` (`id_user`, `id_list`) VALUES
(17, 15),
(17, 16),
(18, 16);

-- --------------------------------------------------------

--
-- Structure de la table `SHARE_OUTSIDER`
--

CREATE TABLE `SHARE_OUTSIDER` (
  `id_reference` int(11) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `SHARE_OUTSIDER`
--

INSERT INTO `SHARE_OUTSIDER` (`id_reference`, `url`) VALUES
(8, '95130536204192796f3816cd1a7e176bc57fea8a'),
(10, 'dfb425ec6fd8e5113a13025af5cfbb63c06316c6');

-- --------------------------------------------------------

--
-- Structure de la table `SHARE_TODO`
--

CREATE TABLE `SHARE_TODO` (
  `id_todo` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `SUBTODO`
--

CREATE TABLE `SUBTODO` (
`id_subtodo` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `title` varchar(255) NOT NULL,
  `id_todo` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `SUBTODO`
--


-- --------------------------------------------------------

--
-- Structure de la table `TODO`
--

CREATE TABLE `TODO` (
`id_todo` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `context` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `id_owner` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `attachment_path` varchar(255) NOT NULL,
  `localization` varchar(255) NOT NULL,
  `id_list` int(11) NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `TODO`
--


-- --------------------------------------------------------

--
-- Structure de la table `TODOLIST`
--

CREATE TABLE `TODOLIST` (
`id_list` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `id_owner` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `TODOLIST`
--

-- --------------------------------------------------------

--
-- Structure de la table `USERS`
--

CREATE TABLE `USERS` (
`id_user` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `googleId` varchar(255) DEFAULT NULL,
  `facebookId` varchar(255) DEFAULT NULL,
  `twitterId` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `avatar_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;


--
-- Index pour les tables exportées
--

--
-- Index pour la table `CATEGORY`
--
ALTER TABLE `CATEGORY`
 ADD PRIMARY KEY (`id_category`), ADD UNIQUE KEY `category` (`category`);

--
-- Index pour la table `CONTACTS`
--
ALTER TABLE `CONTACTS`
 ADD PRIMARY KEY (`id_user`,`id_contact`,`id_group`), ADD KEY `id_user` (`id_user`), ADD KEY `id_contact` (`id_contact`), ADD KEY `CONTACTS_ibfk_3` (`id_group`);

--
-- Index pour la table `GROUPS`
--
ALTER TABLE `GROUPS`
 ADD PRIMARY KEY (`id_group`);

--
-- Index pour la table `SHARE_LIST`
--
ALTER TABLE `SHARE_LIST`
 ADD PRIMARY KEY (`id_user`,`id_list`), ADD KEY `id_list` (`id_list`);

--
-- Index pour la table `SHARE_OUTSIDER`
--
ALTER TABLE `SHARE_OUTSIDER`
 ADD UNIQUE KEY `id_reference` (`id_reference`,`url`);

--
-- Index pour la table `SHARE_TODO`
--
ALTER TABLE `SHARE_TODO`
 ADD PRIMARY KEY (`id_todo`,`id_user`), ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `SUBTODO`
--
ALTER TABLE `SUBTODO`
 ADD PRIMARY KEY (`id_subtodo`);

--
-- Index pour la table `TODO`
--
ALTER TABLE `TODO`
 ADD PRIMARY KEY (`id_todo`);

--
-- Index pour la table `TODOLIST`
--
ALTER TABLE `TODOLIST`
 ADD PRIMARY KEY (`id_list`);

--
-- Index pour la table `USERS`
--
ALTER TABLE `USERS`
 ADD PRIMARY KEY (`id_user`), ADD UNIQUE KEY `email` (`email`), ADD UNIQUE KEY `username` (`username`), ADD UNIQUE KEY `googleId` (`googleId`), ADD UNIQUE KEY `facebookId` (`facebookId`), ADD UNIQUE KEY `twitterId` (`twitterId`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `CATEGORY`
--
ALTER TABLE `CATEGORY`
MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `GROUPS`
--
ALTER TABLE `GROUPS`
MODIFY `id_group` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `SUBTODO`
--
ALTER TABLE `SUBTODO`
MODIFY `id_subtodo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT pour la table `TODO`
--
ALTER TABLE `TODO`
MODIFY `id_todo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT pour la table `TODOLIST`
--
ALTER TABLE `TODOLIST`
MODIFY `id_list` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT pour la table `USERS`
--
ALTER TABLE `USERS`
MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- Contraintes pour les tables exportées
--
/*
--
-- Contraintes pour la table `CONTACTS`
--
ALTER TABLE `CONTACTS`
ADD CONSTRAINT `CONTACTS_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `USERS` (`id_user`),
ADD CONSTRAINT `CONTACTS_ibfk_2` FOREIGN KEY (`id_contact`) REFERENCES `USERS` (`id_user`),
ADD CONSTRAINT `CONTACTS_ibfk_3` FOREIGN KEY (`id_group`) REFERENCES `GROUPS` (`id_group`);

--
-- Contraintes pour la table `SHARE_LIST`
--
ALTER TABLE `SHARE_LIST`
ADD CONSTRAINT `SHARE_LIST_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `USERS` (`id_user`),
ADD CONSTRAINT `SHARE_LIST_ibfk_2` FOREIGN KEY (`id_list`) REFERENCES `TODOLIST` (`id_list`);

--
-- Contraintes pour la table `SHARE_TODO`
--
ALTER TABLE `SHARE_TODO`
ADD CONSTRAINT `SHARE_TODO_ibfk_1` FOREIGN KEY (`id_todo`) REFERENCES `TODO` (`id_todo`),
ADD CONSTRAINT `SHARE_TODO_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `USERS` (`id_user`);
*/