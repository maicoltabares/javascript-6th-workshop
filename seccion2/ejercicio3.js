
function askForNumber(promptMessage, options = {}) {
    const { allowedNullish } = options;
    let rawInput;

    while (true) {
        rawInput = readlineSync.question(promptMessage);

        if (allowedNullish && !rawInput) return rawInput;

        const castedInput = parseInt(rawInput, 10);

        if (!Number.isNaN(castedInput)) return castedInput;

        console.log('El valor ingresado no es número');
    }
}

const askForAnIndexFrom = ({
    optionsArray,
    promptMessage,
    invalidMessage = 'Opción inválida. Intenta de nuevo',
}) => {
    let formattedListString = optionsArray
        .map((element, index) => `${index + 1}. ${element}`)
        .join('\n');

    while (true) {
        const option = askForNumber(`${promptMessage}\n` + formattedListString);
        const isValidOption = option > 0 && option <= optionsArray.length;

        if (isValidOption) return option - 1;

        console.log(invalidMessage);
    }
};

const createCounter = (initialCounter) => {
    return (numToIncrease) => {
        return (initialCounter += numToIncrease);
    };
};

function main() {
    const addFive = createCounter(5);
    console.log(addFive(3));

    const addEight = createCounter(8);
    console.group('8');
    console.log(addEight(3));
    console.log(addEight(3));
    console.log(addEight(3));
    console.groupEnd();

    const addTwo = createCounter(2);
    console.log(addTwo(3));
}

main();



// PREGUNTAS

// 1
// Funciones en JavaScript pueden mantener el acceso a variables externas (variables definidas en el ámbito padre) gracias a los closures. Un closure es la combinación de una función y el entorno léxico en el que fue definida. Este entorno léxico incluye referencias a todas las variables externas accesibles en el momento de la definición de la función.

// 2
// Las implicaciones de memoria de mantener closures, especialmente si se crean muchas instancias de funciones con closures, pueden ser significativas. Cada instancia de función con closure mantiene una referencia al entorno léxico original, lo que puede provocar fugas de memoria o un uso excesivo de memoria si no se gestionan adecuadamente.

// Cuando una función con closure se devuelve o se asigna a una variable, el closure mantiene vivo el entorno léxico original, incluso después de que la función externa haya terminado de ejecutarse. Esto significa que todas las variables definidas en el ámbito externo siguen ocupando espacio en memoria, aunque la función externa ya no se esté ejecutando.

// Si se crean muchas instancias de funciones con closures, cada una mantendrá su propio entorno léxico, lo que puede llevar a un uso excesivo de memoria. Además, si las funciones con closures contienen referencias circulares o no se eliminan explícitamente de la memoria, pueden producirse fugas de memoria.

// Sin embargo, en la mayoría de los casos, el recolector de basura de JavaScript manage automáticamente la memoria y elimina los closures que ya no son necesarios. Para minimizar el uso de memoria y prevenir fugas de memoria, se pueden adoptar algunas prácticas recomendadas, como:

// Desreferenciar explícitamente las variables que ya no son necesarias.
// Evitar crear closures innecesarios o redundantes.
// Utilizar patrones de diseño que minimicen la necesidad de utilizar closures, como el uso de clases o módulos en lugar de funciones anidadas.
// Asegurarse de que las funciones con closures se eliminen correctamente una vez que ya no se necesiten, por ejemplo, al asignarlas a null o eliminándolas de los objetos a los que pertenecen.
// Utilizar herramientas de desarrollo como Chrome DevTools para inspeccionar el uso de memoria y depurar fugas de memoria.