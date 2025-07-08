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

            //------Lógica para resaltar el enlace activo------
            
            // Obtener la URL (ruta) actual
            // Si no hay archivo en especifico se asume que es el index
            //  
            const currentPage = window.location.pathname.split("/").pop() || "index.html";

            //Seleccionar todos los enlaces del navbar que usaran la clase personalizada
            const navLinks = navbarElement.querySelectorAll(".navbar__link");

            // Recorrer cada enlace del navbar
            navLinks.forEach(link => {

                //------ Verificar si el href del enlace incluye el nombre de la pagina actual------

                // Si link obtiene el atributo de href "(link.getAtrribute("href")" entonces, incluyalo en la pagina actual ".includes(currentPage)"
                if (link.getAttribute("href").includes(currentPage)) {
                    // Si es la pagina actual se le asigna la clase {"active"} para destacar visualmente
                    link.classList.add("active");
                }
                
            });
        })
    .catch(error => console.error("Error al cargar el navbar", error));
    }
});