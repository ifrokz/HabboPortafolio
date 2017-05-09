function Player(){
    this.name = null;
    this.money = null;
    
    this.col = null; 
    this.row = null;
    
    this.posX = null;
    this.posY = null;
    this.height = null;
    this.width = null;
    
    this.readyToMoveX = true;
    this.readyToMoveY = true;
    
    this.date = new Date();
    this.myLastActivity = this.date.getTime()/1000;
    this.lastChatID = null;
    var that = this;
    
    this.others = new Array();
    
    this.loop = function(gapX,gapY){
        this.draw(gapX,gapY,game.player.name);
        this.drawOther();
    }
    
    this.start = function(){
        this.posX = (game.map.tileWidth/2)*this.col;
        this.posY = (game.map.tileWidth/2)*this.row;
        this.height = game.map.tileWidth/2;
        this.width = game.map.tileWidth/2;
        this.myLastActivity = this.date.getTime()/1000;
        //console.log("Se ha iniciado al jugador");
    }
    
    this.draw = function(gapX,gapY,name){
        
        //console.log("va el draw -  Col/Row: "+this.col+","+this.row)
        if(Math.abs(this.posX-(game.map.tileWidth/2)*this.col)<1){
            this.posX = (game.map.tileWidth/2)*this.col;
            this.readyToMoveY = true;
        }else if(this.posX<(game.map.tileWidth/2)*this.col){
            this.posX+=1.5;
        }else if(this.posX>(game.map.tileWidth/2)*this.col){
            this.posX-=1.5;
        }
        
        if(Math.abs(this.posY-this.row*(game.map.tileWidth/2))<1){
            this.posY = (game.map.tileWidth/2)*this.row;
            this.readyToMoveX = true;
        }else if(this.posY < (game.map.tileWidth/2)*this.row){
            this.posY+=1.5;
        }else if(this.posY > (game.map.tileWidth/2)*this.row){
            this.posY-=1.5;
        }
        
        var iso = game.util.cartesianToIso(this.posX,this.posY);
        game.ctx.fillStyle = "black";
        game.ctx.fillRect(iso.x+gapX-(this.width/2),iso.y+gapY,this.width, this.height);
        game.ctx.font = "15px Verdana";
        game.ctx.fillStyle = "red";
        game.ctx.strokeStyle = "black";
        game.ctx.fillText(game.player.money+"$", iso.x+gapX-(this.width/2), iso.y-25+gapY);
        game.ctx.strokeText(game.player.money+"$", iso.x+gapX-(this.width/2), iso.y-25+gapY);
        game.ctx.fillStyle = "yellow";
        game.ctx.font = "20px Verdana";
        game.ctx.fillText(name, iso.x+gapX-(this.width/2), iso.y-10+gapY);
        game.ctx.strokeText(name, iso.x+gapX-(this.width/2), iso.y-10+gapY);
    }
    
    this.drawOther = function(){
        for(var i in this.others){
            if((game.date.getTime()/1000)-60 <= game.player.others[i]['time']){
                // MOVIMIENTO A DESTINO.
     
                //var iso = game.util.cartesianToIso(game.player.others[i]['posx'],game.player.others[i]['posy']);
                //var iso = game.util.cartesianToIso(game.player.others[i]['x']*(game.map.tileWidth/2), game.player.others[i]['y']*(game.map.tileWidth/2));
                game.ctx.fillStyle = "black";
                game.ctx.fillRect(game.player.others[i]['posx']+game.gapX-(this.width/2), game.player.others[i]['posy']+game.gapY, this.width, this.height);
               // game.ctx.fillRect(iso.y, iso.x, this.width, this.height);
                //NOMBRE
                game.ctx.font = "25px Verdana";
                game.ctx.fillStyle = "yellow";
                game.ctx.strokeStyle = "black";
                game.ctx.fillText(game.player.others[i]['user'], game.player.others[i]['posx']+game.gapX-(this.width/2), game.player.others[i]['posy']+game.gapY - 10);
                game.ctx.strokeText(game.player.others[i]['user'], game.player.others[i]['posx']+game.gapX-(this.width/2), game.player.others[i]['posy']+game.gapY - 10);
                // console.log(game.player.others[i]['user']+":"+game.player.others[i]['posx']+","+game.player.others[i]['posy']);
            }
        }  
    }
    
    this.getAllCharacters = function(){
        // Manage all parameters about other players
        game.ajax.getAllJson();
    }
    
    
    // CONTROLS
    $(document).keydown(function(e){
        var tempCol = that.col;
        var tempRow = that.row;
        that.myLastActivity = game.date.getTime()/1000;
        
        if(e.which == 37 && that.readyToMoveX == true){
            if(game.player.myLastActivity + 60 > game.date.getTime()/1000){
                that.readyToMoveX = false;
                that.row++;
            }
        }
        if(e.which == 39 && that.readyToMoveX == true){
            if(game.player.myLastActivity + 60 > game.date.getTime()/1000){
                that.readyToMoveX = false;
                that.row--;
            }
        }
        if(e.which == 38 && that.readyToMoveY == true){
            if(game.player.myLastActivity + 60 > game.date.getTime()/1000){
                that.readyToMoveY = false;
                that.col--;
            }
        }
        if(e.which == 40 && that.readyToMoveY == true){
            if(game.player.myLastActivity + 60 > game.date.getTime()/1000){
                that.readyToMoveY = false;
                that.col++;
            }
        }
        
        for(var m in game.map.machines){
            if(game.map.machines[m].col == that.col && game.map.machines[m].row == that.row){
                that.col = tempCol;
                that.row = tempRow;
                console.log("Has gastado 5$ en la máquina tragaperras.");
                game.map.machines[0].slotsRandom();
            }
        }
        
        //LIMITES EN COLUMNAS/COL/X
        if(that.col < 0){
            that.col = 0;
        }else if(that.col > game.map.mapWidth){
            that.col = game.map.mapWidth;
        }
        // LÍMITES EN ROW/FILAS/Y
        if(that.row < 0){
            that.row = 0;
        }else if(that.row > game.map.mapHeight){
            that.row = game.map.mapHeight;
        }
        
        
        // ACTUALIZAMOS LA POSICION EN LA BASE DE DATOS.
        if(e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40){
            game.ajax.move(game.player.name, that.row, that.col);
        }
    });
}