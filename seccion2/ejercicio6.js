console.log('Mensaje 1: Inmediatamente.');
setTimeout(() => {
    console.log('Mensaje 2: Con timeout de 0 segundos.');
}, 0);

setTimeout(() => {
    console.log('Mensaje 3: Con timeout de 0 segundos.');
}, 1000);


// PREGUNTAS

// 1
// Porque el setTimeout crea un timer por debajo usando las
// WepAPIs. La WebAPI se encarga de comunicarse con el sistema
// operativo y eso toma cierto tiempo (algunos milisegundos).
// El sistema opertivo crea el timer este se termina
// inmediatamente haciendo que la WebAPI encole un macrotarea
// la cual será añadida al Callstack en el caso de que esté
// vacio y no haya más microtareas.

// 2
// Nos dice que es importante que tener en cuenta que algunas
// tareas que podemos programar en JavaScript toman cierto
// tiempo y que dependiendo del tipo de tarea subsecuente que
// se cree, debemos saber que herramienta usar para que la
// lógica siguiente y dependiente de lo anterior, se ejecute en
// el orden que esperamos.