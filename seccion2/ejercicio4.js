console.log(
    "Intentando llamar a 'funcionDeclarada' antes de su declaración:"
);
try {
    console.log(funcionDeclarada());
} catch (error) {
    console.log("Error:", error.message);
}

console.log(
    "Intentando llamar a 'funcionExpresada' antes de su declaración:"
);
try {
    console.log(funcionExpresada());
} catch (error) {
    console.log("Error:", error.message);
}

// Declaración de una función declarada
function funcionDeclarada() {
    return "Función declarada ha sido llamada.";
}

// Declaración de una función expresada
const funcionExpresada = function () {
    return "Función expresada ha sido llamada.";
};

console.log("Llamando a 'funcionDeclarada' después de su declaración:");
console.log(funcionDeclarada());

console.log("Llamando a 'funcionExpresada' después de su declaración:");
console.log(funcionExpresada());


// Cuando intenté llamar a las funciones antes de su declaración, obtuve los siguientes resultados:

// Para la función declarada, no se produjo ningún error y se imprimió el mensaje "Función declarada ha sido llamada." en la consola después de la declaración.
// Para la función expresada, se produjo un error y se imprimió el mensaje "ReferenceError: funcionExpresada is not defined" en la consola antes de la declaración.
// Estos resultados indican que JavaScript maneja las dos diferentes declaraciones de funciones de manera distinta. Las funciones declaradas son "levantadas" o "hoisted" al inicio del ámbito en el que se declaran, lo que significa que pueden ser llamadas antes de su declaración sin producir un error. Por otro lado, las funciones expresadas no son "levantadas", lo que significa que no pueden ser llamadas antes de su declaración.

// En resumen, la diferencia en el manejo de las funciones declaradas y las funciones expresadas se debe a que las funciones declaradas son parte del ámbito léxico de JavaScript, mientras que las funciones expresadas son tratadas como variables que solo son inicializadas cuando se ejecuta la línea de código que las declara.