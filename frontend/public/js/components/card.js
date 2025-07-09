//Exportamos una función asincronica(asyn) llamada loadCards que acepta:
//-containerSelector: un sekectir CSS que indica el contenedor donde se cargarán las tarjetas.
//-cardIds: una array opcional con los IDS de las cards que se quieren mostrar. 

export async function loadCards(containerSelector, cardIds = []) {

    //Obtenemos el contenedor donde se cargarán las tarjetas (DOM)
    const container = document.querySelector(containerSelector);

    //Si el contenedor no existe, lanzamos un return para devolver
    if (!container)return;//Si no existe el contenedor nos salimos

    try {

        //Cargamos la plantilla de la tarjeta y los datos de las tarjetas
        const[templateRes, dataRes] = await Promise.all([
            //Hacer dos fetch a la vez
            fetch("/frontend/public/views/components/card.html"), //Cargamos la plantilla de la tarjeta
            fetch("/frontend/public/data/cards.json") //Cargamos los datos de las tarjetas
        ]);

        //Convertimos la respuesta de la plantilla a texto
        const template = await templateRes.text();
        //Convertimos la respuesta de los datos a JSON
        const cards = await dataRes.json(); 

        //Filtramos las tarjetas si se proporcionan  los IDs específicos
        const filtredCards = cardIds.length //length es un conteo de los elementos de un array
            ? cards.filter(card => cardIds.includes(card.id)) //Si hay IDs filtramos las tarjetas
            : cards; //Si no hay IDs usamos todas las tarjetas

        //Recorremos las tarjetas filtradas y creamos el HTML para cada una
        filtredCards.forEach(card => {

            //Reemplazamos los placeholders{{...}} del template con los datos de cada tarjeta
            let html = template //Iniciamos con la plantilla
            .replace("{{title}}", card.title) //Reemplazamos el título
            .replace("{{icon1}}", card.icon1) //Reemplazamos el primer icono
            .replace("{{icon2}}", card.icon2) //Reemplazamos el segundo icono
            .replace("{{description}}", card.description) //Reemplazamos la descripción

            container.innerHTML += html; //Agregamos el HTML generado al contenedor
        });

    }   catch (error) {
        console.error("Error al cargar las cards:", error);
    }
}