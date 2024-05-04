const seconds = parseInt(prompt("Ingrese el número de segundos para el intervalo:"));
const delay = (n) => new Promise((resolve) => setTimeout(resolve, n * 1000));
const showMessage = async () => {
    console.log("Intervalo terminado.");
};
const executeDelay = async (n) => {
    await delay(n);
    await showMessage();
};
executeDelay(seconds);

fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error al cargar los datos:", error));