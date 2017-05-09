<?php

// Parar inyecciones SQL y quizas XSS
	
	foreach($_REQUEST as $variable=>$valor){
		if(preg_match_all('/\b(SELECT|INSERT|DELETE|UPDATE|TRUNCATE|;|TABLE|DROP|ORDER|HAVING\|<script|AND)\b/i',$valor)){
			die("No puedes seguir, caracteres invalidos.");
		}
	}

?>
