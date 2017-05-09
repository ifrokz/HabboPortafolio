self.addEventListener("message", function(e){
    var hasGanado = e.data;
    this.numSlots = [];
    this.numSlots[0] = Math.round(Math.random()*3);
    this.numSlots[1] = Math.round(Math.random()*3);
    this.numSlots[2] = Math.round(Math.random()*3);
    
    console.log(this.numSlots[0]+","+this.numSlots[1]+","+this.numSlots[2]);
    
    if(this.numSlots[0] == this.numSlots[1] &&  this.numSlots[0] == this.numSlots[2]){
        console.log("SON IGUALES"); 
        hasGanado = true;
    }
    postMessage(hasGanado);
});