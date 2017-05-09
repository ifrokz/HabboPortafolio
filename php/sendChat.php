<?php

    include 'inc/filtro.php';
    
    include 'inc/db.php';
    
    $peticion = "INSERT INTO chat VALUES ('".$_POST['name']."', '".$_POST['message']."', ".$_POST['utc'].", ".$_POST['status'].")";
    
    mysql_query($peticion);
    
    mysql_close($db);
?>