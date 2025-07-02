// const { error } = require("console");
// const { response } = require("express");

document.addEventListener('DOMContentLoaded', function() { 
    // para trabajar con clases se utiliza '.querySelector'
    const navbarElement = document.querySelector(".navbar-container");

    if(navbarElement) {
        // ruta
        fetch("/frontend/public/views/components/navbar.html")
            // then (entonces) trae los datos
            .then(response => response.text())
            .then(data => {
                navbarElement.innerHTML = data;
            })
            .catch(error => console.error("Error al cargar el navbar", error));
    }
});