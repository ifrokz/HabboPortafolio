function Game(){
    this.context = document.getElementById("canvas");
    this.ctx = this.context.getContext("2d");
 
 
    this.ajax = new Ajax();
    this.map = new Map();
    this.util = new Util();
    this.player = new Player();
    
    this.fps = 60;
    this.gameOn = true;
    this.gapX = 0;
    this.gapY = 0;
   
    this.msDB = 0;
    /////////////////////
    // BUCLE PRINCIPAL //
    /////////////////////
    
    this.start = function(){
        //game.player.start();
        game.map.start();
        
        // GAME START
        game.loop();
    }.bind(this);
    
    ////////////////////
    // LOOP PRINCIPAL //
    ////////////////////
    this.temp = null;
    this.loop = function(){
  
        this.date = new Date();
        var msInicio = this.date.getTime();
        
        
        resizeCanvas();
        game.map.loop(this.gapX,this.gapY);
        game.player.loop(this.gapX,this.gapY);
        
        //  ACTUALIZACION DB JUGADORES
        if(this.date.getTime()-this.msDB >= 1000){
            game.player.getAllCharacters();
            game.ajax.readChat(game.player.name);
            this.msDB = this.date.getTime();
        }
        
        // FPS BUCLE
        clearTimeout(game.temp);
        var msFinal = this.date.getTime()-msInicio;
        if(game.player.myLastActivity + 60 > this.date.getTime()/1000){
            this.temp = setTimeout(game.loop,1000/this.fps-msFinal);
        }else{
            $("#juego").css("display", "none");
            $("#disabled").css("display", "block");
        }
    }.bind(this);
}


//////////////////////////

// SE INICIA EL JUEGO

var game = new Game();

$(document).ready(function(){

});
