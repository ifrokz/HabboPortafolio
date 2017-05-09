// Chat utils
$("#enviaChat").click(function(){
    if($("#chatInput").val() != ""){
        game.player.myLastActivity = game.date.getTime()/1000;
        var usuario  = game.player.name;
        var mensaje = $("#chatInput").val();
        var utc = Math.round(game.date.getTime()/1000);
        var status = false;
        $("#chatInput").val("");
        
        game.ajax.sendChat(usuario, mensaje, utc, status);
    }
});