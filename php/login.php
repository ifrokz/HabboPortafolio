<?php

    include 'inc/filtro.php';
    include 'inc/db.php';
    
    $peticion = 
        "SELECT *
        FROM players
        WHERE
        user='".$_POST['user']."'
        AND
        pass = '".$_POST['pass']."'
    ";
    
    $resultado = mysql_query($peticion);
    if (!$resultado) {
        die('Consulta no válida: ' . mysql_error());
    }else{
        $contar = mysql_num_rows($resultado);
        if($contar == 0){
            echo "No puedes entrar, datos incorrectos.";
        }else{
            while($fila = mysql_fetch_array($resultado)){
        		$row = $fila['row'];
        		$col = $fila['col'];
        		$cash = $fila['money'];
            }
            $date_now = new DateTime();
            $date_now = $date_now->getTimestamp();
            $peticion = "UPDATE players SET last_activity=".$date_now." WHERE user='".$_POST['user']."'";
            mysql_query($peticion);
            echo '{"login":"OK","row":'.$row.',"col":'.$col.',"money":'.$cash.'}';
        }
    }
    
    mysql_close($db);
?>