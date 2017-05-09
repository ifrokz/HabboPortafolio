function Map (){
    this.tileWidth = 120;
    this.width = null;
    this.height = null;
    this.gapProySize = this.tileWidth * 0.8943885546;
    
    this.mouseRow = null;
    this.mouseCol = null;
    this.col = 0;
    this.row = 0;
    
    var that = this;
    
    this.mapWidth = null;
    this.mapHeight = null;
    
    this.tile = new Array();
    this.tilesImg = new Array();
    this.tilesImg[0] = new Image();
    this.tilesImg[0].src ="img/tiles/floor_0.png";
    this.tilesImg[1] = new Image();
    this.tilesImg[1].src = "img/cursor/cursorOk.png";
    this.tilesImg[2] = new Image();
    this.tilesImg[2].src = "img/cursor/cursorNo.png";
    
    this.machines = [];
    this.moveAllowed = true;
    
    this.date = new Date();
            
    this.start = function(){
        this.loadLevel();
    }
    

    // CARGA Y CREACION DE LOS TILES EN FUNCION A UNA IMAGEN
    this.loadLevel = function(){
        
        var levelImg = new Image();
        levelImg.src= "img/level/1.png";
        levelImg.onload = function(){
            that.mapHeight = levelImg.height-1;
            that.mapWidth  = levelImg.width-1;
           // console.log("LEVEL LOADING");
            that.width = levelImg.width;
            that.height = levelImg.height;
            $("body").append("<canvas id='levelCanvas'></canvas>");
            //console.log(levelImg.width);
            $("#levelCanvas").attr("width",levelImg.width);
            $("#levelCanvas").attr("height",levelImg.height);
            var keloke = document.getElementById("levelCanvas");
            var ctx = keloke.getContext("2d");
            ctx.drawImage(levelImg,0,0);
            var datos = ctx.getImageData(0,0,levelImg.width,levelImg.height);
            var data = datos.data;
            for(var i = 0;i<data.length;i+=4){
                if(data[i] == 0 && data[i+1] == 0 && data[i+2] == 0){
                    var col = (i/4)%levelImg.width;
                    var row = Math.floor((i/4)/levelImg.width);
                    that.tile.push(new Tile(col,row,0));
                }
                if( (i/4) < levelImg.width && (i/4)%2 == 0){
                    console.log("Se ha creado una tragaperras en la X="+((i/4)%levelImg.width));
                    that.machines.push(new Machine(0,(i/4)%levelImg.width,0));
                }
            }
            console.log(that.machines);
            
            $("#levelCanvas").hide();
            for(var i in that.tile){
                that.tile[i].start();
            }
        }
    }.bind(this);
    
    // DIBUJAMOS TODOS LOS TILES CREADOS ANTERIORMENTE 
    this.draw = function(gapX,gapY){
        // TILES
        for(var t in this.tile){
           // console.log("hola");
            game.ctx.drawImage(this.tilesImg[0],this.tile[t].posX+game.gapX,this.tile[t].posY+game.gapY);
        }
        // MOUSE
        var iso = game.util.cartesianToIso(this.mouseCol*(game.map.tileWidth/2),this.mouseRow*(game.map.tileWidth/2)+game.map.tileWidth/2);
        if(this.moveAllowed){
            game.ctx.drawImage(this.tilesImg[1],iso.x+game.gapX,iso.y+game.gapY);
        }else{
            game.ctx.drawImage(this.tilesImg[2],iso.x+game.gapX,iso.y+game.gapY);
        }
        
        // MAQUINAS DE JUEGO
        for(var m in this.machines){
            this.machines[m].draw();
        }
    }.bind(this);
    
    // CENTRADO DE LA CAMARA ENCIMA DEL JUGADOR
    this.center = function(){
        var iso = game.util.cartesianToIso(game.player.posX,game.player.posY);
        game.gapX = window.innerWidth/2-iso.x;   
        game.gapY = window.innerHeight/2-iso.y;
    }
    
    // COMPROBACION DE FILA Y COLUMNA DEL CLICK
    $(document).click(function(e){
        if(game.gameOn){
            var clicCartX = (2 * (event.pageY - game.gapY) + (event.pageX - game.gapX)) / 2 ;
            var clicCartY = (2 * (event.pageY - game.gapY) - (event.pageX - game.gapX)) / 2 ;
           // console.log(clicCartX+","+clicCartY);
            var squareX = Math.floor((clicCartX - that.tileWidth/4)/(that.tileWidth/2));            //veo en que cuadrado he hecho clic
            var squareY = Math.floor((clicCartY - that.tileWidth/4)/(that.tileWidth/2));
           // console.log(squareX +" | "+ squareY);
           if(game.player.myLastActivity + 60 > game.map.date.getTime()/1000){
                if(that.moveAllowed){
                    that.mouseRow = squareY;
                    that.mouseCol = squareX;
                    game.player.col = squareX;
                    game.player.row = squareY;
                    game.ajax.move(game.player.name, game.player.row, game.player.col);
                    game.player.myLastActivity = game.date.getTime()/1000;
                }else{
                    for(var m in game.map.machines){
                        if(that.machines[m].row == that.mouseRow && that.machines[m].col == that.mouseCol){
                            if(Math.abs(that.machines[m].row-game.player.row)==1 && game.player.col == that.machines[m].col){
                                game.map.machines[0].slotsRandom();
                            }
                        }
                    }
                }
           }
        }
    });
    
    // COMPROBAR SI ESTÁ LIBRE LA CASILLA EN LA QUE PONEMOS EL RATÓN.
    $(document).on("mousemove",function(){
        if(game.gameOn){
            var clicCartX = (2 * (event.pageY - game.gapY) + (event.pageX - game.gapX)) / 2 ;
            var clicCartY = (2 * (event.pageY - game.gapY) - (event.pageX - game.gapX)) / 2 ;
           // console.log(clicCartX+","+clicCartY);
            var squareX = Math.floor((clicCartX - that.tileWidth/4)/(that.tileWidth/2));            //veo en que cuadrado he hecho clic
            var squareY = Math.floor((clicCartY - that.tileWidth/4)/(that.tileWidth/2));
            //console.log(squareX +" | "+ squareY);
            that.mouseRow = squareY;
            that.mouseCol = squareX;
            
            var allowed = true;
            for(var m in that.machines){
                if(that.machines[m].row == that.mouseRow && that.machines[m].col == that.mouseCol){
                    that.moveAllowed = false;
                    allowed = false;
                }
            }
            
            // COMPROBAR QUE ESTÁ EN LOS LÍMITES DEL MAPA
            if(squareX <0 || squareX > that.mapWidth){
                that.moveAllowed = false;
                allowed = false;
            }
            if (squareY < 0 || squareY > that.mapHeight) {
                that.moveAllowed = false;
                allowed = false;
            }
            
            if(allowed){
                that.moveAllowed = true;
            }
           // console.log(that.moveAllowed);
        }
    });

    ///////////////
    // LOOP MAPA //
    ///////////////
    this.loop = function(gapX,gapY){
        //console.log("va el loop")
        this.draw(gapX,gapY);
        // DRAW

        
        //game.ctx.drawImage(this.tilesImg[0],0,0);
        this.center();
    }.bind(this);
}
