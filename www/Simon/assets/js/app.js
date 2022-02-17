const ronda = document.getElementById('ronda');
const simonButtons = document.getElementsByClassName('square');
const encender = document.getElementById('encender');
var turno = 1; 
var j1 = 0; //va a guardar las rondas
var j2 = 0; 
var round= 0;

var jugador1 = localStorage.getItem("usuario1");
jugador1 = JSON.parse(jugador1);
var nick1 = jugador1.nick;
var puntajeS1 = jugador1.puntajeS;

var jugador2 = localStorage.getItem("usuario2");
jugador2 = JSON.parse(jugador2);
var nick2 = jugador2.nick;
var puntajeS2 = jugador2.puntajeS;

var audioPagina = 1;




class Simon {
    constructor(simonButtons, encender, ronda) {
        this.ronda = 0;
        this.userPosition = 0; //saber en que momento el usuario se encuentra de la secuencia
        this.rondasTotales = 100;
        this.sequencia = [];
        this.speed = 1000;
        this.blockedButtons = false;
        this.buttons = Array.from(simonButtons); //crea un array de botones desde los del simon
        console.log(this.buttons); //sigue encontrando los botones
        this.display = {
            encender,
            ronda
        }
        this.buttonSounds = [
            new Audio('./assets/audio/botones/sounds_1.mp3'),
            new Audio('./assets/audio/botones/sounds_2.mp3'),
            new Audio('./assets/audio/botones/sounds_3.mp3'),
            new Audio('./assets/audio/botones/sounds_4.mp3'),
        ]


    }

    //Verifica los turnos
    turnos(){
        if (turno === 1){
            this.display.encender.onclick = () => this.startGame();
            
            document.getElementById("datos").innerHTML = "Turno: " + nick1;
            console.log(turno);
            
        } else if (turno === 0) {
            document.getElementById("datos").innerHTML = "Turno: " + nick2;
            console.log(turno);

        }
    }

    //Comienza el juego
    startGame() {
        document.getElementById("cartelRdo").className = "desaparecer";
        document.getElementById("clickBoton").play();
        this.display.encender.disabled = true;
        this.updateRonda(0);
        this.userPosition = 0;
        this.sequencia = this.createSequence(); //crea la secuencia
        this.buttons.forEach((element, i) => { //a cada boton se le saca la clase winner
            element.classList.remove('gano');
            element.onclick = () => this.buttonClick(i); //en cada click llama a button click con el valor de index
        });
        this.showSequence(); //mostrat la secuencia
    }

    // Actualiza la ronda para que sigan pasando hasta el total de rondas
    updateRonda(value) {
        this.ronda = value; 
        this.display.ronda.textContent = `Ronda ${this.ronda}`;
        
    }

    //Crea el array de la secuencia 
    createSequence() {
        return Array.from({length: this.rondasTotales}, () =>  this.getRandomColor());
    }

    //Numero del 0 al 3 para crear la secuencia al azar
    getRandomColor() {
        return Math.floor(Math.random() * 4); 
    }   

    //Se ejecuta cuando el usuario hace click en los botones
    buttonClick(value) {
        !this.blockedButtons && this.validateClicked(value); //si los botones no estan bloqueados, validar que este bien el color: ;
    }

    //Valida que el usuario toque los botones correspondientes a la secuencia creada en createSequence
    validateClicked(value) {
        if(this.sequencia[this.userPosition] === value) {
            
            if(this.ronda === this.userPosition) {
                this.updateRonda(this.ronda + 1);
                round++;
                this.speed /= 1.02;
                this.isGameOver();
            } else {
                this.userPosition++;
            }
        } else {
            this.gameLost();
        }
    }

    //Verifica que no se haya llegado a las rondas totales, si se llega, se gana el juego
    isGameOver() {
        if (this.ronda === this.rondasTotales) {
            this.gameWon();
        } else {
            this.userPosition = 0;
            this.showSequence();
        };
    }

    //Muestra la secuencia
    showSequence() {
        this.blockedButtons = true; //el usuario no puede tocar nada mientras se muestra la sequencia
        let sequenceIndex = 0;
        let timer = setInterval(() => {
            const button = this.buttons[this.sequencia[sequenceIndex]];
            this.buttonSounds[this.sequencia[sequenceIndex]].play();
            this.toggleButtonStyle(button); //cambiar el estilo del boton
            setTimeout( () => this.toggleButtonStyle(button), this.speed / 2) //se pinta y despinta a la mitad del tiempo
            sequenceIndex++;
            if (sequenceIndex > this.ronda) { //para que el usaurio juegue
                this.blockedButtons = false;
                clearInterval(timer);
            }
        }, this.speed);
    }

    //Sube el brightness de la secuencia para que el usuario la vea
    toggleButtonStyle(button) {
        button.classList.toggle('active');
    }

    //Restart si se pierde
    gameLost() {
        if (turno === 1){
            j1 = round;
            console.log(j1);
            this.display.encender.disabled = false; //vuelve al inicio
            this.blockedButtons = true; //dejan de funcionar los botones del simon
            turno = 0;
            document.getElementById("sonidoLost").play();
            document.getElementById("datos").innerHTML = "Turno: " + nick2;
            console.log(turno);
            round = 0;
        } else if (turno ===0) {
            j2 = round; 
            console.log(j2);
            document.getElementById("sonidoLost").play();
            this.blockedButtons = true; //dejan de funcionar los botones del simon
            this.whoWon();
        }    
    }

    whoWon(){
        var cartelResultado = document.getElementById("cartelRdo");
        if (j1 > j2){
            console.log("gano el 1");
            document.getElementById("datos").innerHTML = "Ganó: " + nick1;
            document.getElementById("cartelRdo").className = "aparecer";
            cartelResultado.innerHTML = '<h3> Ganó ' + nick1 + '!</h3> <button id="reinicio" onclick="reload()">Reiniciar</button>';
            this.buttons.forEach(element =>{
                element.classList.add('gano');
                
            });
            this.updateRonda('🏆 por ' + nick1);
            puntajeS1 = puntajeS1 + 1; 
            jugador1.puntajeS = puntajeS1;
            localStorage.setItem("usuario1", JSON.stringify(jugador1));
            this.reiniciar();
        } else if (j2 > j1) {
            console.log("gano el 2");
            document.getElementById("datos").innerHTML = "Ganó: " + nick2 ;
            document.getElementById("cartelRdo").className = "aparecer";
            cartelResultado.innerHTML = '<h3> Ganó ' + nick2 + '!</h3> <button id="reinicio" onclick="reload()">Reiniciar</button>';
            this.buttons.forEach(element =>{
                element.classList.add('gano');
            });
            this.updateRonda('🏆 por ' + nick2);
            puntajeS2 = puntajeS2 + 1; 
            jugador2.puntajeS = puntajeS2;
            localStorage.setItem("usuario2", JSON.stringify(jugador2));
            this.reiniciar();
        } else {
            console.log("empate");
            document.getElementById("datos").innerHTML = "Empate";
            document.getElementById("cartelRdo").className = "aparecer";
            cartelResultado.className = "aparecer";
            cartelResultado.innerHTML = '<h3> Fue un empate!</h3> <button id="reinicio" onclick="reload()">Reiniciar</button>';
            this.buttons.forEach(element =>{
                element.classList.add('gano');
            });
            this.updateRonda('empatada');
            this.reiniciar();
        }
    }

    
    
    reiniciar(){
        turno = 1;
        j1 = 0;
        j2 = 0;
        this.display.encender.disabled = false;
        this.turnos();  
}

 audio(){
    if(audioPagina === 1){
    document.getElementById("sonidoFondo").play();
    audioPagina = 0;
}
    else{
        document.getElementById("sonidoFondo").pause();
        audioPagina = 1;
    }
   
}

}


function reload(){
    document.getElementById("clickBoton").play();
    document.getElementById("clickBoton").onended = function () {
        location.reload();
    }

}

function cambiarLocation(){
    document.getElementById('clickBoton').play();
    document.getElementById('clickBoton').onended = function(){
    window.location.replace('../index.html');
    }}



const simon = new Simon(simonButtons, encender, ronda); //nueva instancia de simon
simon.turnos();

