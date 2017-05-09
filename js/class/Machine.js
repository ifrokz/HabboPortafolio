function Machine (row,col,type) {
    this.col = col;
    this.row = row;
    
    var iso = game.util.cartesianToIso((this.col-1)*(game.map.tileWidth/2),(this.row-1)*(game.map.tileWidth/2)+game.map.tileWidth/2);
    this.posX = iso.x;
    this.posY = iso.y;
    
    this.type = type;
    
    this.sprites = [];
    this.sprites[0] = new Image();
    this.sprites[0].src ="img/tiles/slots.png";
    this.sprites[1] = new Image();
    this.sprites[1].src ="img/tiles/dice.png";
    this.start = function(){

    }
    
    this.loop = function(){
        this.draw();
    }
    
    this.draw = function(){
        game.ctx.drawImage(this.sprites[this.type],this.posX+game.gapX,this.posY+game.gapY);
    }
}

Machine.prototype.slotsRandom = function(){
    var hasGanado = false;
    var worker1 = new Worker("js/worker1.js");
    worker1.postMessage(hasGanado);
    worker1.onmessage = function(event){
        hasGanado = event.data;
        worker1.terminate();
        if(hasGanado){
            game.player.money += 100;
            game.ajax.endGame(game.player.name, false, game.player.name+" ha ganado 100$!");
        }else{
            game.ajax.endGame(game.player.name, false, game.player.name+" ha perdido el juego.");
        }
    }
    game.player.money -= 5;
    
    game.ajax.updateMoney(game.player.name,game.player.money);
}