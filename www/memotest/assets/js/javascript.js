//Function that creates the board according to the size the user selected
var board = [];
//Variables declaration and initialization
var totalPairs;
var pairsFound = 0;

var click1, click2, div1, div2;
var turn = true;
var h3Turn = $("#turn");

var turnsInARow = 0;
var player1 = {
    pairs: 0,
    points: 0,
};
var player2 = {
    pairs: 0,
    points: 0,
}
var pairsP1 = 0;
var pairsP2 = 0;
var pointsP1 = 0;
var pointsP2 = 0;

var disableAll = false;

var container = $(".container");

var jugador1 = localStorage.getItem("usuario1");
jugador1 = JSON.parse(jugador1);
var nick1 = jugador1.nick;
var puntajeMMT1 = jugador1.puntajeMMT;

var jugador2 = localStorage.getItem("usuario2");
jugador2 = JSON.parse(jugador2);
var nick2 = jugador2.nick;
var puntajeMMT2 = jugador2.puntajeMMT;

document.getElementById("nick1").innerHTML = nick1;
document.getElementById("nick2").innerHTML = nick2;

function iniciar() {
    document.getElementById("confirmacionAtras").style.display = "none";
    document.getElementById('cartelReglas').style.display = "none";
}

function drawBoard(selectedSize) {
    //asigna a la variable boardsize la longitud del tablero elegida por el usuario
    var boardSize = selectedSize.value;
    //Total pairs in the board
    totalPairs = Math.floor((boardSize * boardSize) / 2);
    //disable the dropdown list so the board cannot be changed
    selectedSize.disabled = true;
    //Llama a función para crear el tablero lógico (la matriz)
    createLogicalBoard(boardSize);
    //Llama a función para asignar las fichas al tablero lógico
    setTilesLogicalBoard(boardSize);
    //Creo dinámicamente HTML con los divs necesarios según tamaño del tablero

    container.empty();
    container.css({
        "grid-template-columns": "repeat(" + boardSize + ", 1fr)",
        "grid-template-rows": "repeat(" + boardSize + ",1fr)"
    });
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            var tile = i + "" + j;
            //El ID que le asigna es la posición que tiene en la matriz (row(i) y column(j)) y el inner text es la ficha que le asignó el random
            /* container.append("<div id='" + tile + "' onclick='clickTile(" + JSON.stringify(tile) + ")'><img id='img" + board[i][j].ficha + "' src='" + board[i][j].imagen + "'/></div>"); */
            container.append("<div id='" + tile + "' class='flip-box' onmouseover='hover(" + JSON.stringify(tile) + ")' onclick='clickTile(" + JSON.stringify(tile) + ")'><div class='flip-box-inner'><div class='flip-box-front'></div><div class='flip-box-back'><img id='img" + board[i][j].ficha + "' src='" + board[i][j].imagen + "'></div></div></div>");
        }
    }
    //Set the H3 for player's turn
    h3Turn.text("Turno: " + nick1);
}

function clickTile(divId) {
    document.getElementById("sonidoFlip").play(); //hace el sonido del flip 
    //If a move is being made, no tiles can be clicked
    if (disableAll) {
        document.getElementById("sonidoFlip").pause(); //pausa el sonido del flip 
        return;
    }
    var playerTurn;
    if (turn) {
        playerTurn = player1;
    } else {
        playerTurn = player2;
    }
    console.log("Clickeé el div " + divId + " y es de tipo: " + typeof (divId));
    //Assign the content of the tile to Ficha
    var ficha = board[divId[0]][divId[1]];
    //Removes onClick attribute so it cannot be clicked again
    document.getElementById(divId).removeAttribute("onClick");
    //Sets class clicked for the flip animation
    document.getElementById(divId).setAttribute("class", "flip-box clicked");
    console.log("ficha: " + ficha.valor);
    if (click1 == null) {
        //If it's the first tile being clicked
        console.log("entré al if");
        click1 = ficha;
        div1 = divId;
    } else {
        //If it's the second one
        click2 = ficha;
        div2 = divId;
        if (click1.valor === click2.valor) {
            turnsInARow++;
            //if the two tiles are the same
            console.log("IGUALES");
            pairsFound++;
            console.log("Pares encontrados: " + pairsFound + ". Pares totales: " + totalPairs);
            playerTurn.pairs++;
            console.log("Pares " + nick1 + ":", player1.pairs, "Pares " + nick2 + ":", player2.pairs);
            playerTurn.points += turnsInARow * 10;
            console.log("Puntos J1: ", player1.points, "Puntos J2: ", player2.points);
            $("#points_jug1").text(JSON.stringify(player1.points));
            $("#points_jug2").text(JSON.stringify(player2.points));

            //Resets "click" variables for another move
            click1 = null;
            click2 = null;

            //CHEQUEAR SI LA PARTIDA TERMINÓ
            if (pairsFound === totalPairs) {
                //If pairs Found = total Pairs it means the game is over
                //Game Over
                console.log("PARTIDA TERMINADA");
                var winDiv = document.getElementById("winDiv");
                if (player1.pairs > player2.pairs) {
                    winDiv.innerHTML = '<h2>¡Ganó ' + nick1 + '! </h2><button class="botonMenu" onclick="restart()">Empezar nueva partida</button>';
                    winDiv.className = "appear";
                    puntajeMMT1 = puntajeMMT1 + player1.points;
                    jugador1.puntajeMMT = puntajeMMT1;
                    localStorage.setItem("usuario1", JSON.stringify(jugador1))
                } else {
                    if (player1.pairs === player2.pairs) {
                        winDiv.innerHTML = '<h2>¡Empate!</h2><button class="botonMenu" onclick="restart()">Empezar nueva partida</button>';
                        winDiv.className = "appear";
                    } else if (player2.pairs > player1.pairs) {
                        winDiv.innerHTML = '<h2>¡Ganó ' + nick2 + '!</h2><button class="botonMenu" onclick="restart()">Empezar nueva partida</button>';
                        winDiv.className = "appear";
                        puntajeMMT2 = puntajeMMT2 + player2.points;
                        jugador2.puntajeMMT = puntajeMMT2;
                        localStorage.setItem("usuario2", JSON.stringify(jugador2))
                    }
                }
            }
        } else {
            //Tiles are not the same
            console.log("DISTINTAS");
            turnsInARow = 0;
            console.log("P1 Puntos: " + player1.points + " , turnsinarow: " + turnsInARow);
            //Disable clicks while animation returns tiles to inactivity state
            disableAll = true;
            setTimeout(function () {
                //Set timer for the animation
                console.log("timer!", div1, div2);
                //returns tiles to inactivity state
                document.getElementById(div1).setAttribute("class", "flip-box");
                document.getElementById(div2).setAttribute("class", "flip-box");
                //Resets variables for future clicks
                div1 = null;
                div2 = null;
                click1 = null;
                click2 = null;
                ficha = null;
                //change turn

                turn = !turn;
                if (turn) {
                    h3Turn.text("Turno:" + nick1);
                } else {
                    h3Turn.text("Turno:" + nick2);
                }
                //Another click can be made because animation is over
                disableAll = false;

            }, 1500);
            //reassigned onClick function
            document.getElementById(div1).setAttribute("onClick", "clickTile('" + div1 + "')");
            document.getElementById(div2).setAttribute("onClick", "clickTile('" + div2 + "')");
        }
    }
}



function myTimer(div1, div2) {
    //Takes out the clicked class for animation
    document.getElementById(div1).setAttribute("class", "flip-box");
    document.getElementById(div2).setAttribute("class", "flip-box");
}

function createLogicalBoard(boardSize) {
    //Creates matrix with size choosed by user
    for (let i = 0; i < boardSize; i++) {
        board.push([]);
        for (let j = 0; j < boardSize; j++) {
            board[i].push("");
        }
    }
    console.log(board);
}

function setTilesLogicalBoard(boardSize) {
    //Crea array con todas las posiciones posibles y las mezcla
    var positions = createPositionsArray(boardSize);
    //inicializa un contador interno y la variable que va a tener la ficha a asignar
    var contInterno = 0;
    var ficha = 0;
    for (let i = 0; i < positions.length; i++) {
        //Recorre todo el array de posiciones. Asigna el valor de la variable ficha a la posición i
        board[positions[i].row][positions[i].col] = {
            valor: ficha, //QUE FICHA ES
            estado: 0, //YA FUE ENCONTRADA LA PAREJA Y POR QUE JUGADOR --> 0 (no fue encontrada), 1 (fue encontrada por JUG1, 2 (FUE ENCONTRADA POR JUG2))
            imagen: "./assets/img/" + ficha + ".png", //SRC DE LA IMG
        };
        //aumenta contador interno
        contInterno++;
        //Si es 2 quiere decir que ya puso el mismo valor ficha en dos posiciones (el par)
        if (contInterno === 2) {
            //entonces reinicia el contador interno y aumenta en uno la ficha
            contInterno = 0;
            ficha++;
        }
    }
}

function createPositionsArray(boardSize) {
    var positions = [];
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            //asigna un objeto con row i y col j a cada posición del array
            positions.push({
                row: i,
                col: j
            });
        }
    }
    //las mezcla
    shuffle(positions);
    return positions;
}

function shuffle(positions) {
    //Función para mezclar array
    var currentIndex = positions.length;
    var temporaryValue, randomIndex;
    //While there remain elements to shuffle...
    while (0 != currentIndex) {
        //Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        //And swap it with the current element
        temporaryValue = positions[currentIndex];
        positions[currentIndex] = positions[randomIndex];
        positions[randomIndex] = temporaryValue;
    }
    return positions;
}

function hover(id) {
    //Add or removes a class depending on the player's turn for the space to show the color of the player to play
    if (turn === true) {
        document.getElementById(id).classList.toggle("turn2", false);
        document.getElementById(id).classList.toggle("turn1", true);
    } else {
        document.getElementById(id).classList.toggle("turn1", false);
        document.getElementById(id).classList.toggle("turn2", true);
    }
}

function restart() {
    document.getElementById("botonClick").play();
    document.getElementById("botonClick").onended = function () {
        location.reload();
    }

}

function confirmarSalir() {
    document.getElementById('botonClick').play();
    document.getElementById("confirmacionAtras").style.display = "";
    document.getElementById("confirmacionAtras").className = "appear";
}

function cambiarLocation() {
    document.getElementById('botonClick').play();
    document.getElementById('botonClick').onended = function () {
        window.location.replace('../index.html');
    }
}


var audioPagina = 1;

function audio() {
    if (audioPagina === 1) {
        document.getElementById("sonidoFondo").play();
        audioPagina = 0;
    }
    else {
        document.getElementById("sonidoFondo").pause();
        audioPagina = 1;
    }

}

function verReglas() {
    document.getElementById('botonClick').play();
    document.getElementById('cartelReglas').style.display = "";
}

function cerrarCartel() {
    document.getElementById('botonClick').play();
    document.getElementById('cartelReglas').style.display = "none";
}
