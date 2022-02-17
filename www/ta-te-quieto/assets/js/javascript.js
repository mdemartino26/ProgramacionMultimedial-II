var posicion=0; // valida la posicion de cada array
var turno = 1; // servira para validar los turnos durante el juego - BULEANO
var j1 = "X"; //Declaro la variable del jugador 1
var j2 = "O"; //Declaro la variable del jugador 2
var columna = [[],[],[]];
var k=1;
var puedeSeguir = true;//Esto va a ver si se puede seguir jugando o no, ya que si hay una combinación ganadora no va a permitir que se siga jugando.
var todasOcupadas = false;//

var jugador1 = localStorage.getItem("usuario1");
jugador1 = JSON.parse(jugador1);
var nick1 = jugador1.nick;
var puntajeTTT1 = jugador1.puntajeTTT;

var jugador2 = localStorage.getItem("usuario2");
jugador2 = JSON.parse(jugador2);
var nick2 = jugador2.nick;
var puntajeTTT2 = jugador2.puntajeTTT;

var audioPagina =1;

function audio(){
  if(audioPagina === 1){
  document.getElementById("sonidoFondo").play();
  audioPagina = 0;
}
  else{
      document.getElementById("sonidoFondo").pause();
      audioPagina = 1;
  }
 
}

//Esto es para hacer que se muestere la tabla por JavaScript
function genera_tabla() {
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("main")[0];
  
  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");
 
  // Crea las celdas
  for (var i = 0; i <= 2; i++) {
  // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
    hilera.setAttribute("class","homie")
  
    for (var j = 0; j < 3; j++) {
  // Crea un elemento <td> y un nodo de texto, haz que el nodo de texto sea el contenido de <td>, ubica el elemento <td> al final de la hilera de la tabla
      var celda = document.createElement("td");  
      celda.setAttribute("onclick","turnos('zelda"+k+"')");
      celda.setAttribute("id","zelda"+k);
      k++; 
      hilera.appendChild(celda);
  }
  
  // agrega la hilera al final de la tabla (al final del elemento tblbody)
   tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "3");
  tabla.setAttribute("align","center")
}

// Funcion que alterna los turnos y muestra las X e O
function turnos (idCelda) {
  if(puedeSeguir == true){
    if(document.getElementById(idCelda).innerHTML == ""){
      positions(idCelda);//Se lo llama fuera de los otros if, porque pregunta si hay un lugar vacío para seguir jugando. Si lo hay va a llamar a la otra función sin importar de quién sea el turno. Ya se tiene el valor con la variable turno y qué se va a poner en el casillero que se haga click.
      if (turno === 1) {
        document.getElementById(idCelda).innerHTML= j1;
        document.getElementById("datos").innerHTML = "Turno de " + nick1;
        verificarGanador();
        turno = 0;
      }
      else if (turno === 0) {
        document.getElementById(idCelda).innerHTML= j2;
        document.getElementById("datos").innerHTML = "Turno de " + nick2;
        verificarGanador();
        turno = 1;
      }
    }
  }
}

function positions(idCelda) {//El parametro a tiene los Id de las celdas. Osea que si a es = al Id de la celda que se está clickeando, la "X" o la "O" que se va a poner en ese lugar también la va a tener la matriz. Al tener este dato la matriz después va a poder verificar quién ganó.
  if(idCelda == "zelda1"){
    columna[0][0] = turno;
    document.getElementById('turno').play();
  } else if (idCelda == "zelda2"){
    columna[0][1] = turno;
    document.getElementById('turno').play();
  } else if (idCelda == "zelda3"){
    columna[0][2] = turno;
    document.getElementById('turno').play();
  } else if (idCelda == "zelda4"){
    columna[1][0] = turno;
    document.getElementById('turno').play();
  } else if (idCelda == "zelda5"){
    columna[1][1] = turno;
    document.getElementById('turno').play();
  } else if (idCelda == "zelda6"){
    columna[1][2] = turno;
    document.getElementById('turno').play();
  } else if (idCelda == "zelda7"){
    columna[2][0] = turno;
    document.getElementById('turno').play();
  } else if (idCelda == "zelda8"){
    columna[2][1] = turno;
    document.getElementById('turno').play();
  } else if (idCelda == "zelda9"){
    columna[2][2] = turno;
    document.getElementById('turno').play();
  }
}

//Funcion que verifica si alguien gano.
function verificarGanador(){
  var jugador;
  if (turno == 1) {
    jugador = nick1;
  } else {
    jugador = nick2;
  }
//Cada if verifica todas las posiciones existentes en el juego.
   if (columna[0][0] == turno && columna [0][1] == turno && columna [0][2] == turno){
     document.getElementById("zelda1").style.color = "yellow";
     document.getElementById("zelda2").style.color = "yellow";
     document.getElementById("zelda3").style.color = "yellow";
     puedeSeguir = false;
     document.getElementById('gano').play();
     document.getElementById("datos").innerHTML = " ";
     mostrarCartel(jugador);
     sumarPuntaje(jugador);
    

    } else if (columna[1][0] === turno && columna[1][1] === turno && columna[1][2] === turno){
      
     document.getElementById("zelda4").style.color = "yellow";
     document.getElementById("zelda5").style.color = "yellow";
     document.getElementById("zelda6").style.color = "yellow";
     puedeSeguir = false;
     document.getElementById("datos").innerHTML = " ";
     mostrarCartel(jugador);
     sumarPuntaje(jugador);
     document.getElementById('gano').play();

    } else if (columna[2][0] === turno && columna[2][1] === turno && columna[2][2] === turno){
      
     document.getElementById("zelda7").style.color = "yellow";
     document.getElementById("zelda8").style.color = "yellow";
     document.getElementById("zelda9").style.color = "yellow";
     puedeSeguir = false;
     document.getElementById("datos").innerHTML = " ";
     mostrarCartel(jugador);
     sumarPuntaje(jugador);
     document.getElementById('gano').play();

    } else if (columna[0][0] === turno && columna[1][0] === turno && columna[2][0] === turno){

     document.getElementById("zelda1").style.color = "yellow";
     document.getElementById("zelda4").style.color = "yellow";
     document.getElementById("zelda7").style.color = "yellow";
     puedeSeguir = false;
     document.getElementById("datos").innerHTML = " ";
     mostrarCartel(jugador);
     sumarPuntaje(jugador);
     document.getElementById('gano').play();

    } else if (columna[0][1] === turno && columna[1][1] === turno && columna[2][1] === turno){

     document.getElementById("zelda2").style.color = "yellow";
     document.getElementById("zelda5").style.color = "yellow";
     document.getElementById("zelda8").style.color = "yellow";
     puedeSeguir = false;
     document.getElementById("datos").innerHTML = " ";
     mostrarCartel(jugador);
     sumarPuntaje(jugador);
     document.getElementById('gano').play();

    } else if (columna[0][2] === turno && columna[1][2] === turno && columna[2][2] === turno){

     document.getElementById("zelda3").style.color = "yellow";
     document.getElementById("zelda6").style.color = "yellow";
     document.getElementById("zelda9").style.color = "yellow";
     puedeSeguir = false;
     document.getElementById("datos").innerHTML = " ";
     mostrarCartel(jugador);
     sumarPuntaje(jugador);
     document.getElementById('gano').play();

    } else if (columna[0][0] === turno && columna[1][1] === turno && columna[2][2] === turno){

     document.getElementById("zelda1").style.color = "yellow";
     document.getElementById("zelda5").style.color = "yellow";
     document.getElementById("zelda9").style.color = "yellow";
     puedeSeguir = false;
     document.getElementById("datos").innerHTML = " ";
     mostrarCartel(jugador);
     sumarPuntaje(jugador);
     document.getElementById('gano').play();

    } else if (columna[0][2] === turno && columna[1][1] === turno && columna[2][0] === turno){

     document.getElementById("zelda3").style.color = "yellow";
     document.getElementById("zelda5").style.color = "yellow";
     document.getElementById("zelda7").style.color = "yellow";
     puedeSeguir = false;
     document.getElementById("datos").innerHTML = " ";
     mostrarCartel(jugador);
     sumarPuntaje(jugador);
     document.getElementById('gano').play();
  }else{
    esEmpate()
  }


}

function esEmpate() {
  
  for (var i = 1; i <= 9; i++){
    if(document.getElementById("zelda" + i).innerHTML == "") {
      puedeSeguir = true;
      todasOcupadas = false;
      return;
    }
  }

  puedeSeguir = false;
  todasOcupadas = true;
  document.getElementById('empate').play();
  document.getElementById("datos").innerHTML = "empate";
  mostrarCartel();
}

function mostrarCartel(ganador){
  document.getElementById("cartel").style.display = "block";
  document.getElementById("ganador").innerHTML = "Fin del juego, ganador: " + ganador;
  if (!ganador) {
    document.getElementById("ganador").innerHTML = "Fin del juego, empate";
  }
}

function sumarPuntaje(jugador){
    if(jugador === nick1){
      puntajeTTT1 = puntajeTTT1 + 1; 
      jugador1.puntajeTTT = puntajeTTT1;
      localStorage.setItem("usuario1", JSON.stringify(jugador1));
    } else {
      puntajeTTT2 = puntajeTTT2 + 1; 
      jugador2.puntajeTTT = puntajeTTT2;
      localStorage.setItem("usuario2", JSON.stringify(jugador2));
    }
}

function reiniciar(){
   document.getElementById('botonClick').play();
  document.getElementById("cartel").style.display = "none";
  columna = [[],[],[]];
  puedeSeguir = true;
  todasOcupadas = false;
  turno = 1;
  limpiarTabla();
}

function limpiarTabla(){
  for ( var i=1; i <= 9; i++){
    document.getElementById("zelda" + i).innerHTML = "";
    document.getElementById("zelda" + i).style.color = "white";
  }
}


function cambiarLocation(){
  document.getElementById('botonClick').play();
  document.getElementById('botonClick').onended = function(){
  window.location.replace('../index.html');
  }
}

