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

var usuario1;

var usuario2;


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
    if (!usuario1){
        usuario1 = {};
        usuario1.puntajeTTT = 0;
        usuario1.puntajeMMT = 0;
        usuario1.puntajeS = 0;
    } 

    usuario1.nombre = document.getElementById("nombretxt").value.trim();
    usuario1.nick = document.getElementById("nicktxt").value.trim();
    console.log(document.getElementById("myImage1").src);
    usuario1.img = document.getElementById("myImage1").src;
   

    if (!usuario2){
        usuario2 = {};
        usuario2.puntajeTTT = 0;
        usuario2.puntajeMMT = 0;
        usuario2.puntajeS = 0;
    } 

    usuario2.nombre = document.getElementById("nombretxt2").value.trim();
    usuario2.nick = document.getElementById("nicktxt2").value.trim();
    usuario2.img = document.getElementById("myImage2").src;
    
    localStorage.setItem("usuario1", JSON.stringify(usuario1));
    localStorage.setItem("usuario2", JSON.stringify(usuario2));
    document.getElementById("ingreso").style.display = "none";
    document.getElementById("edit").style.display = "none";
    document.getElementById("cerrarSesion").style.display = "";
    document.querySelector("#usu1 .nick").innerHTML = usuario1.nick;
    document.querySelector("#usu1 img").src = usuario1.img;
    document.querySelector("#usu1 .puntajesUsuarios div:nth-of-type(1) span").innerHTML = usuario1.puntajeTTT;
    document.querySelector("#usu1 .puntajesUsuarios div:nth-of-type(2) span").innerHTML = usuario1.puntajeMMT;
    document.querySelector("#usu1 .puntajesUsuarios div:nth-of-type(3) span").innerHTML = usuario1.puntajeS;

    document.querySelector("#usu2 .nick").innerHTML = usuario2.nick;
    document.querySelector("#usu2 img").src = usuario2.img;
    document.querySelector("#usu2 .puntajesUsuarios div:nth-of-type(1) span").innerHTML = usuario2.puntajeTTT;
    document.querySelector("#usu2 .puntajesUsuarios div:nth-of-type(2) span").innerHTML = usuario2.puntajeMMT;
    document.querySelector("#usu2 .puntajesUsuarios div:nth-of-type(3) span").innerHTML = usuario2.puntajeS;
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
    usuario1 = localStorage.getItem("usuario1");
    usuario2 = localStorage.getItem("usuario2");
    if (usuario1 && usuario2) {
        usuario1 = JSON.parse(usuario1);
        usuario2 = JSON.parse(usuario2);
        document.getElementById("ingreso").style.display = "none";
        document.getElementById("usuarios").style.display = "none";
        document.getElementById("secciones").style.display = "";
        document.querySelector("#usu1 .nick").innerHTML = usuario1.nick;
        document.querySelector("#usu1 .puntajesUsuarios div:nth-of-type(1) span").innerHTML = usuario1.puntajeTTT;
        document.querySelector("#usu1 .puntajesUsuarios div:nth-of-type(2) span").innerHTML = usuario1.puntajeMMT;
        document.querySelector("#usu1 .puntajesUsuarios div:nth-of-type(3) span").innerHTML = usuario1.puntajeS;

        document.querySelector("#usu2 .nick").innerHTML = usuario2.nick;
        document.querySelector("#usu2 .puntajesUsuarios div:nth-of-type(1) span").innerHTML = usuario2.puntajeTTT;
        document.querySelector("#usu2 .puntajesUsuarios div:nth-of-type(2) span").innerHTML = usuario2.puntajeMMT;
        document.querySelector("#usu2 .puntajesUsuarios div:nth-of-type(3) span").innerHTML = usuario2.puntajeS;
       
        document.getElementById("juegos").style.display = "";
        document.getElementById("irUsuarios").className = "seccionesEstilos";
        document.getElementById("irJuegos").className = "seccionesEstilosSelect";
        document.getElementById("edit").style.display = "none";
    } else {
        document.getElementById("edit").style.display = "none";
        document.getElementById("cerrarSesion").style.display = "none";
        document.getElementById("ingreso").style.display = "block";
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
    document.getElementById("myImage1").value = obj1.img;

    var obj2 = localStorage.getItem("usuario2");
    obj2 = JSON.parse(obj2);
    document.getElementById("nombretxt2").value = obj2.nombre;
    document.getElementById("nicktxt2").value = obj2.nick;
    document.getElementById("myImage2").value = obj2.img;

    document.getElementById("ingreso1").style.display = "block";
    document.getElementById("ingreso2").style.display = "none";

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