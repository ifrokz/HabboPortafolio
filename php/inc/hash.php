<?php

    include 'inc/filtro.php';
    
    function codifiqueitor($valor){
    	
    	return md5(base64_encode($valor));
    }
    
    function decodifiqueitor(){
    	
    }

?>