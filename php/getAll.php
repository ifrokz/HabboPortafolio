<?php
    include 'inc/filtro.php';
    include 'inc/db.php';
    
    $date_now = new DateTime();
    $date_now = $date_now->getTimestamp();
    $peticion = "SELECT * FROM players WHERE last_activity > $date_now-60*10";
    $resultado = mysql_query($peticion);
    
    $enviarJson;
    $contador = 0;
    while ($fila = mysql_fetch_array($resultado)) {
        $enviarJson[$contador]['user'] = $fila['user'];
        $enviarJson[$contador]['row'] = $fila['row'];
        $enviarJson[$contador]['col'] = $fila['col'];
        $enviarJson[$contador]['time'] = $fila['last_activity'];
        $contador++;
    }
    
    echo json_encode($enviarJson);
    mysql_close($db);
?>