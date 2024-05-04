const createCounter = () => {
    let count = 0;

    const incrementCounter = () => {
        count++;
    };

    const getCount = () => {
        return count;
    };

    return {
        incrementCounter,
        getCount,
    };
};

const counter = createCounter();

while (true) {
    const action = prompt(
        "Ingrese 'i' para incrementar el contador o 's' para salir: "
    );

    if (action === "s") {
        break;
    } else if (action === "i") {
        counter.incrementCounter();
    } else {
        alert("Acción inválida.");
    }
}

alert(`El valor final del contador es: ${counter.getCount()}`);