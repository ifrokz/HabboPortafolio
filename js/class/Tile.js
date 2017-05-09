function Tile(col,row,type){
    this.col = col;
    this.row = row;
    this.type = type;
    this.posX = null;
    this.posY = null;
    
    this.start = function(){
        var iso = game.util.cartesianToIso(this.col*(game.map.tileWidth/2),this.row*(game.map.tileWidth/2)+game.map.tileWidth/2);
        //console.log(iso.x+" -- "+iso.y);
        this.posX = iso.x;
        this.posY = iso.y;
        
        //this.posY = this.row*game.map.tileWidth;
        //this.posX = game.map.tileWidth*this.col;
    }
}