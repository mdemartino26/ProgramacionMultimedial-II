/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var nombretxt = "";
var nicktxt = "";
var img1 = " ";
var nombretxt2 = "";
var nicktxt2 = "";
var img2 = "";

var audioPagina = 1;


function takePicture(num) {
    document.getElementById("sonidoClick").play();
    navigator.camera.getPicture(function (imageData) {
        var image = document.getElementById("myImage" + num);
        image.src = "data:image/jpeg;base64," + imageData;
    }, onFail, {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true,
        targetHeight: 100,
        targetWidth: 100
    });
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function pasarUsuario(){
    nombretxt = document.getElementById("nombretxt").value;
    nicktxt = document.getElementById("nicktxt").value;
    if (nombretxt == "" || nicktxt == ""){
    
    }else {
        document.getElementById('ingreso2').style.display = "grid";
    document.getElementById('cargarDatos').style.display = "";
    document.getElementById('ingreso1').style.display = "none";
    }
}


//Corrobora que esten los datos o no deja ingresar a la app
function corroborar() {
    nombretxt = document.getElementById("nombretxt").value;
    nicktxt = document.getElementById("nicktxt").value;
    nombretxt2 = document.getElementById("nombretxt2").value;
    nicktxt2 = document.getElementById("nicktxt2").value;
    console.log(document.getElementById("myImage1").src);
    img1 = document.getElementById("myImage1").src;
    img2 = document.getElementById("myImage2").src;
   
    if (nombretxt == "" || nicktxt == "" || nombretxt2 == "" || nicktxt2 == "" || img1 == "" || img2 == "") {
    } else {
        guardar();
    };
};

function guardar() {
    var usuario1 = {
        nombre: document.getElementById("nombretxt").value,
        nick: document.getElementById("nicktxt").value,
        img1: document.getElementById("myImage1").src,
        puntajeTTT: 0,
        puntajeMMT: 0,
        puntajeS: 0
    };

    var usuario2 = {
        nombre: document.getElementById("nombretxt2").value,
        nick: document.getElementById("nicktxt2").value,
        img2: document.getElementById("myImage2").src,
        puntajeTTT: 0,
        puntajeMMT: 0,
        puntajeS: 0
    };

    localStorage.setItem("usuario1", JSON.stringify(usuario1));
    localStorage.setItem("usuario2", JSON.stringify(usuario2));
    document.getElementById("ingreso").style.display = "none";
    document.getElementById("edit").style.display = "none";
    document.getElementById("cerrarSesion").style.display = "";
    document.getElementById("usu1").innerHTML = "<div id='nick'> Usuario 1: " + usuario1.nick + " </div> <img src='" + usuario1.img1 + "'> <div class='puntajesUsuarios'><h3>Puntajes </h3><div>TaTeTi: " + usuario1.puntajeTTT + "</div> <div>Memotest: " + usuario1.puntajeMMT + "</div> <div>Simon: " +usuario1.puntajeS + "</div></div>";
    document.getElementById("usu2").innerHTML = "<div id='nick'> Usuario 2: " + usuario2.nick + " </div> <img src='" + usuario2.img2 + "'> <div class='puntajesUsuarios'><h3>Puntajes </h3><div>TaTeTi: " + usuario2.puntajeTTT + "</div> <div>Memotest: " + usuario2.puntajeMMT + "</div> <div>Simon: " +usuario2.puntajeS + "</div></div>";
    document.getElementById("juegos").style.display = "";
    document.getElementById("irUsuarios").className = "seccionesEstilos";
    document.getElementById("irJuegos").className = "seccionesEstilosSelect";
    document.getElementById("secciones").style.display = "";
    document.getElementById("usuarios").style.display = "none";
    document.getElementById("sonidoClick").play();
}

function checkUsuarios() {
    document.getElementById("secciones").style.display = "none";
    document.getElementById("juegos").style.display = "none";
    document.getElementById("usuarios").style.display = "none";
    var usuario1 = localStorage.getItem("usuario1")
    var usuario2 = localStorage.getItem("usuario2")
    if (usuario1 && usuario2) {
        usuario1 = JSON.parse(usuario1);
        usuario2 = JSON.parse(usuario2);
        document.getElementById("ingreso").style.display = "none";
        document.getElementById("usuarios").style.display = "none";
        document.getElementById("secciones").style.display = "";
        document.getElementById("usu1").innerHTML = "<div id='nick'> Usuario 1: " + usuario1.nick + " </div> <img src='" + usuario1.img1 + "'> <div class='puntajesUsuarios'><h3>Puntajes </h3><div>TaTeTi: " + usuario1.puntajeTTT + "</div> <div>Memotest: " + usuario1.puntajeMMT + "</div> <div>Simon: " +usuario1.puntajeS + "</div></div>";
        document.getElementById("usu2").innerHTML = "<div id='nick'> Usuario 2: " + usuario2.nick + " </div> <img src='" + usuario2.img2 + "'> <div class='puntajesUsuarios'><h3>Puntajes </h3><div>TaTeTi: " + usuario2.puntajeTTT + "</div> <div>Memotest: " + usuario2.puntajeMMT + "</div> <div>Simon: " +usuario2.puntajeS + "</div></div>";
        document.getElementById("juegos").style.display = "";
        document.getElementById("irUsuarios").className = "seccionesEstilos";
        document.getElementById("irJuegos").className = "seccionesEstilosSelect";
        document.getElementById("edit").style.display = "none";
    } else {
        document.getElementById("edit").style.display = "none";
        document.getElementById("cerrarSesion").style.display = "none";
    }
}

function loadInputs() {
    document.getElementById("ingreso").style.display = "block";
    document.getElementById("cargarDatos").disabled = false;
    var btnImagen1 = document.getElementById("btnImagen1");
    btnImagen1.disabled = false;

    document.getElementById("nombretxt").disabled = false;
    document.getElementById("nicktxt").disabled = false;
    var btnImagen2 = document.getElementById("btnImagen2");
    btnImagen2.disabled = false;
   
    document.getElementById("nombretxt2").disabled = false;
    document.getElementById("nicktxt2").disabled = false;


}


function editarPerfiles() {
    document.getElementById("sonidoClick").play();
    loadInputs();

    //Trae los datos del objeto que esta en local storage y los convierte de string a objeto
    var obj1 = localStorage.getItem("usuario1");
    obj1 = JSON.parse(obj1); //Convertir en obj
    document.getElementById("nombretxt").value = obj1.nombre;
    document.getElementById("nicktxt").value = obj1.nick;

    var obj2 = localStorage.getItem("usuario2");
    obj2 = JSON.parse(obj2);
    document.getElementById("nombretxt2").value = obj2.nombre;
    document.getElementById("nicktxt2").value = obj2.nick;
    document.getElementById("juegos").style.display = "none";
    document.getElementById("edit").style.display = "none";
    document.getElementById("usuarios").style.display = "none";
    document.getElementById("secciones").style.display = "none";
    document.getElementById("irUsuarios").className = "seccionesEstilos";
    document.getElementById("irJuegos").className = "seccionesEstilosSelect";

   
}

function cerrarSesion() {
    document.getElementById("sonidoClick").play();
        document.getElementById("sonidoClick").onended = function () {
            location.reload();
            localStorage.clear();
        }
}

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

function irUsuarios(){
    document.getElementById("sonidoClick").play();
    document.getElementById("usuarios").style.display = "";
    document.getElementById("juegos").style.display = "none";
    document.getElementById("edit").style.display = "";
    document.getElementById("irUsuarios").className = "seccionesEstilosSelect";
    document.getElementById("irJuegos").className = "seccionesEstilos";
}

function irJuegos(){
    document.getElementById("sonidoClick").play();
    document.getElementById("usuarios").style.display = "none";
    document.getElementById("juegos").style.display = "block";
    document.getElementById("edit").style.display = "none";
    document.getElementById("irUsuarios").className = "seccionesEstilos";
    document.getElementById("irJuegos").className = "seccionesEstilosSelect";
}

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
 */
        console.log('Received Event: ' + id);

        document.getElementById('ingreso2').style.display = "none";
        document.getElementById('cargarDatos').style.display = "none";
        var btnImagen1 = document.getElementById("btnImagen1");
        btnImagen1.disabled = false;
        btnImagen1.onclick = function() { takePicture(1) }
        var btnImagen2 = document.getElementById("btnImagen2");
        btnImagen2.disabled = false;
        btnImagen2.onclick = function() { takePicture(2) }
        document.getElementById('usuarios').style.display = "none";
        document.getElementById("edit").style.display = "none";
        


    }


   


};

app.initialize();