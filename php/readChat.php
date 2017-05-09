<?php

    include 'inc/filtro.php';
    include 'inc/db.php';
    $peticion = "SELECT * FROM chat";
    
    $resultado = mysql_query($peticion);
    
    $enviarJson;
    $contador = 0;
    while ($fila = mysql_fetch_array($resultado)){
        $enviarJson[$contador]['user'] = $fila['usuario'];
        $enviarJson[$contador]['message'] = $fila['mensaje'];
        $enviarJson[$contador]['time'] = $fila['utc'];
        $enviarJson[$contador]['private'] = $fila['private'];
        $contador++;
    }
    
    echo json_encode($enviarJson);
    mysql_close($db);
?>