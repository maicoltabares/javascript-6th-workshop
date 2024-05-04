const handleAsynchronicity = async (callback, promise) => {
    try {
        await promise;
        callback();
    } catch (error) {
        console.log("Error:", error.message);
    }
};

const main = async () => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
    handleAsynchronicity(() => {
        console.log("¡Promesa cumplida y callback ejecutado!");
    }, promise);
};

main();