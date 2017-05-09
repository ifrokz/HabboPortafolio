<?php

    $db =  mysql_connect('localhost', 'ifrokz', '');
    if (!$db) {
        die(mysql_error());
    }
    
    mysql_select_db('habbo') or die('No se pudo seleccionar la base de datos');

?>