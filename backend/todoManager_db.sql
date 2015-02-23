-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mer 18 Février 2015 à 09:19
-- Version du serveur: 5.5.41-0ubuntu0.14.04.1
-- Version de PHP: 5.5.9-1ubuntu4.6

DROP DATABASE IF EXISTS todoManager_db;
CREATE USER 'todomanager'@'localhost' IDENTIFIED BY 'todomanager';
GRANT ALL PRIVILEGES ON *.* TO 'todomanager'@'localhost' WITH GRANT OPTION;
CREATE DATABASE todoManager_db;

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

-- --------------------------------------------------------

--
-- Structure de la table `CATEGORY`
--

CREATE TABLE IF NOT EXISTS `CATEGORY` (
  `id_category` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id_category`),
  UNIQUE KEY `category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `CONTACTS`
--

CREATE TABLE IF NOT EXISTS `CONTACTS` (
  `id_user` int(11) NOT NULL,
  `id_contact` int(11) NOT NULL,
  `id_group` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_contact`,`id_group`),
  KEY `id_user` (`id_user`),
  KEY `id_contact` (`id_contact`),
  KEY `CONTACTS_ibfk_3` (`id_group`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `GROUPS`
--

CREATE TABLE IF NOT EXISTS `GROUPS` (
  `id_group` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_group`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `SHARE_LIST`
--

CREATE TABLE IF NOT EXISTS `SHARE_LIST` (
  `id_user` int(11) NOT NULL,
  `id_list` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_list`),
  KEY `id_list` (`id_list`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `SHARE_TODO`
--

CREATE TABLE IF NOT EXISTS `SHARE_TODO` (
  `id_todo` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_todo`,`id_user`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `SUBTODO`
--

CREATE TABLE IF NOT EXISTS `SUBTODO` (
  `id_subtodo` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `id_todo` int(11) NOT NULL,
  PRIMARY KEY (`id_subtodo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `TODO`
--

CREATE TABLE IF NOT EXISTS `TODO` (
  `id_todo` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `context` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `status` varchar(255) NOT NULL,
  `id_owner` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `attachment_path` varchar(255) NOT NULL,
  `localization` varchar(255) NOT NULL,
  `id_list` int(11) DEFAULT NULL,
  `id_category` int(11) NOT NULL,
  PRIMARY KEY (`id_todo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `TODOLIST`
--

CREATE TABLE IF NOT EXISTS `TODOLIST` (
  `id_list` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  PRIMARY KEY (`id_list`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `USERS`
--

CREATE TABLE IF NOT EXISTS `USERS` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `avatar_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Contraintes pour les tables exportées
--

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
