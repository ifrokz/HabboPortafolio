<?php
    include 'inc/db.php';

    $peticion = 
        "SELECT *
        FROM players
        WHERE
        user='".$_POST['user']."'
    ";
    
    $resultado = mysql_query($peticion);
    if (!$resultado) {
        die('Consulta no válida: ' . mysql_error());
    }else{
        $contar = mysql_num_rows($resultado);
        if($contar == 0){
            echo "Te has registrado correctamente.";
                        
            $peticion = "
            INSERT INTO
            players VALUES(
                '',
                '".$_POST['user']."',
                '".$_POST['pass']."',
                6,
                4,
                0,
                ".$_POST['gender'].",
                100,
                '".date("Y-m-d H:i:s")."',  
                '".$_SERVER['HTTP_X_FORWARDED_FOR']."',
                'email@domain.com'
            )
            ";
            // YYYY-MM-DD HH:mm:ss
            $resultado = mysql_query($peticion);
        }else{
             echo "Ya existe una cuenta con este nombre de usuario.";
        }
    }

    mysql_close($db);
?> 