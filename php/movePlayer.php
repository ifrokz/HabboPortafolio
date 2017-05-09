<?php
    include 'inc/filtro.php';
    
    include 'inc/db.php';
    
    $date_now = new DateTime();
    $date_now = $date_now->getTimestamp();
    $peticion = "UPDATE players SET row=".$_POST['row'].", col=".$_POST['col'].", last_activity=".$date_now." WHERE user='".$_POST['name']."'";
    mysql_query($peticion);
    mysql_close($db);
?>