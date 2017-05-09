<?php

    include 'inc/filtro.php';
    include 'inc/db.php';
    
    $peticion = "INSERT INTO chat VALUES ('".$_POST['user']."', '".$_POST['msg']."', ".$_POST['utc'].", ".$_POST['estado'].")";
    
    mysql_query($peticion);
    
    mysql_close($db);
?>