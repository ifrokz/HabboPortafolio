function Ajax(){
    this.login = function(){
        var user = $("#loginuser").val();
        var password = $("#loginpass").val();
        $.ajax({
            url : 'php/login.php',
            data : {user: user,pass: password},
            type : 'POST',
            dataType : 'json',
            success : function(data) {
                if(data.login == "OK"){
                    game.start();
                    game.player.name = user;
                    game.player.row = data.row;
                    game.player.col = data.col;
                    game.player.money = data.money;
                    game.player.start();
                    $("#pantallainicial").fadeOut(1000,function(){
                        $("#juego").fadeIn(1000);
                    });
                }
            },
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }.bind(this);
    
    this.login2 = function(name){
        //console.log(name);
        var user = name;
        var password = "12345";
        $.ajax({
            url : 'php/login.php',
            data : {user: user, pass: password},
            type : 'POST',
            dataType : 'json',
            success : function(data) {
                if(data.login == "OK"){
                    game.start();
                    game.player.name = user;
                    game.player.row = data.row;
                    game.player.col = data.col;
                    game.player.money = data.money;
                    game.player.start();
                    $("#pantallainicial").fadeOut(1000,function(){
                        $("#juego").fadeIn(1000);
                    });
                }
            },
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }.bind(this);
    
    this.register = function(){
        var user = $("#registeruser").val();
        var password = $("#registerpass").val();
        var gender = $("#genderregister").val();
        $.ajax({
            url : 'php/register.php',
            data : {user: user,pass: password,gender: gender},
            type : 'POST',
            dataType : 'html',
            success : function(json) {
                console.log(json);
            },
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }.bind(this);
    
    this.move = function(name, x, y){
        $.ajax({
            url : 'php/movePlayer.php',
            data : {name: name,row: x,col: y},
            type : 'POST',
            dataType : 'html',
            success : function(json) {/*console.log(json)*/},
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }.bind(this);
    
    this.getAllJson = function(){
        $.ajax({
            url : 'php/getAll.php',
            dataType : 'json',
            success : function(data) {
                // Manage all results
                for(var i in data){
                    if(data[i].user != game.player.name){
                        //if(!game.player.others[i]){
                            game.player.others[i] = new Array();
                        //}
                        game.player.others[i]['user'] = data[i].user;
                        game.player.others[i]['x'] = data[i].col;
                        game.player.others[i]['y'] = data[i].row;
                        game.player.others[i]['time'] = data[i].time;
                        if(!game.player.others[i]['posx'] && !game.player.others[i]['posy']){
                            var iso = game.util.cartesianToIso(game.player.others[i]['x']*(game.map.tileWidth/2), game.player.others[i]['y']*(game.map.tileWidth/2));
                            game.player.others[i]['posx'] = iso.x;
                            game.player.others[i]['posy'] = iso.y;
                        }
                    }
                }
            },
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }.bind(this);
    
    this.updateMoney = function(user, money){
        $.ajax({
            url : 'php/updateMoney.php',
            data : {user: user, money: money},
            type : 'POST',
            dataType : 'html',
            success : function(data) {},
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }.bind(this);
    
    this.sendChat = function(name, message, utc, status){
        $.ajax({
            url : 'php/sendChat.php',
            data : {name: name, message: message, utc: utc, status: status},
            type : 'POST',
            dataType : 'html',
            success : function(data) {},
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }
    
    this.readChat = function(user){
        $.ajax({
            url : 'php/readChat.php',
            data : {user: user},
            type : 'POST',
            dataType : 'json',
            success : function(data) {
                $("#contenedorChat").html("");
                if(game.player.lastChatID < data.length){
                    game.player.lastChatID = data.length;
                    $("#contenedorChat").animate({ scrollTop: 10000000 }, 10);
                }
                for(var i in data){
                    if(data[i].private == false){
                        $("#contenedorChat").append("<span class='chatID'>"+data[i].user+"</span>: "+data[i].message+"<hr>");
                    }else{
                        $("#contenedorChat").append("<span class='chatID'>"+data[i].message+"</span><hr>");
                    }
                }
            },
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }
    
    this.endGame = function(user, status, msg){
        if(status){
            var estado = false;
        }else{
            var estado = true;
        }
        var utc = game.date.getTime()/1000;
        $.ajax({
            url : 'php/sendGame.php',
            data : {user: user, msg: msg, utc: utc, estado: estado},
            type : 'POST',
            dataType : 'html',
            success : function(data) {},
            error : function(xhr, status) {},
            complete : function(xhr, status) {}
        });
    }
}



