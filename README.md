# PED_MyTodo
Une application Web qui permet la gestion des Todos. 

Ce logiciel devra permettre :

  1.D’ajouter des Todo

  2.De préciser qu’un Todo est réalisé

  3.De visualiser tous les Todo non réalisé

  4.De visualiser les Todo à faire pour aujourd’hui, pour la semaine, pour le mois.

  5.De synchroniser son agenda (GCal ou autre) avec les échéances des Todo.

  6.Un support off-line.


Installation sur Windows.

1. git clone https://github.com/iliassk/PED_MyTodo

2. Créez votre base de donnée
    i. install mysql
    ii. install wamp
    iii. ouvrir le server wamp
    iv. Allez sur http://localhost/phpmyadmin
    v. cliquer sur mysql
    vi. puis choisir l’onglet import
    vii. puis sur parcourir, importer le fichier todoManager_db.sql (se trouvant dans le dossier back-end) et puis cliquer sur execute. La base de donnée todoManager_db est créé.

3. Allez en suite dans le dossier frontend :
            i. npm install -g yo

            ii. npm install -g grunt

            iii. npm install -g grunt-cli

            iv. npm install --global generator-angular

            v. npm install (Si on a un problème de dépendance : "unmet" supprimez le dossier node_modules & faites un npm cache clean et relancer npm install)

           vi. npm install (Oui on fait 2 npm install)

           vii. bower install

           viii. grunt build

4. Ensuite allez dans le dossier backend :
           i. npm install

5. grunt serve

6. Ouvrez un autre terminal
          i. node api.js (lance le server)


Installation sur Linux.

     Suivre les même commandes que celle d'installation sur windows sauf qu'il faut ajouter sudo devant tous les commandes "install"(par exemple sudo npm install -g yo).






