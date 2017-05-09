// GESTIÓN MENÚ
$("#cambiaregistro").click(function(){
    $("#entrar").fadeOut(1000,function(){
        $("#registrar").fadeIn(1000);
    })
});

$("#cambiarlogin").click(function(){
    $("#registrar").fadeOut(1000,function(){
        $("#entrar").fadeIn(1000);
    })
});

// BOTÓN LOGIN
$("#loginnutton").click(function(){
    game.ajax.login();
});

$("#loginadmin").click(function(){
    game.ajax.login2("Taler");
});

$("#loginadmin2").click(function(){
    game.ajax.login2("Frok");
});

// BOTÓN REGISTRO
$("#registerbutton").click(function(){
    game.ajax.register();
});

function resizeCanvas(){
    $("#canvas").attr("height",window.innerHeight);
    $("#canvas").attr("width",window.innerWidth);
}