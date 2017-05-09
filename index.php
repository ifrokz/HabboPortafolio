<!DOCTYPE HTML>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <meta name="robots" content="noindex, nofollow"/>
        <meta charset="UTF-8">
    </head>
    <body>
        <div id="disabled">Tu sesión ha caducado por inactividad.</div>
        <div id="pantallainicial">
            <div id="registrar" style="display:none">
                <input type="text" name ="user" id="registeruser">
                <input type="password" name ="pass" id="registerpass">
                <select id="genderregister">
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
                <button id="registerbutton">Registrar</button>  
                <p style="color:blue" id="cambiarlogin">¿Ya tienes cuenta?</p>
            </div>  
            <div id ="entrar">
                <input type="text" name ="user" id="loginuser">
                <input type="password" name ="pass" id="loginpass">
                <button id="loginnutton">Entrar</button>
                <button id="loginadmin">Dev Taler</button>
                <button id="loginadmin2">Dev Frok</button>
                <div id="cambiaregistro">
                    <p style="color:blue">¿Aún no tienes cuenta?</p>
                </div>
            </div>
        </div>

        <div id = "juego" style="display:none">
            <canvas id ="canvas">Si ves esto es que tu navegador no acepta canvas</canvas>
            <div id="chat">
                <div id="contenedorChat"></div>
                <input id="chatInput" maxlength="255" placeholder="Escribe algo...">
                <button id="enviaChat">Chatear</button>
            </div>
        </div>

        <script src="js/lib/jquery-3.1.1.min.js"></script>
        <script src="js/lib/Util.js"></script>
        
        <script src="js/class/Player.js"></script>
        <script src="js/class/Ajax.js"></script>
        <script src="js/class/Map.js"></script>
        <script src="js/class/Tile.js"></script>
        <script src="js/class/Machine.js"></script>
        
        <script src="js/Menu.js"></script>
        <script src="js/Chat.js"></script>

        <!-- GAME PRINCIPAL -->
        <script src="js/class/Game.js"></script>
    </body>
</html>
