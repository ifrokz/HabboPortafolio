<?php
    
    include 'inc/filtro.php';
    
    include 'inc/db.php';

    $peticion = "UPDATE players SET money=".$_POST['money']." WHERE user='".$_POST['user']."'";
    mysql_query($peticion);

    mysql_close($db);
?>