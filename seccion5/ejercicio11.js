const url = 'data.json';
const bookings = [
];
function askForNumber(promptMessage, options = {}) {
    while (true) {
        const rawInput = prompt(promptMessage);
        if (options?.allowedNullish && !rawInput) return rawInput;
        const castedInput = parseInt(rawInput);
        if (!Number.isNaN(castedInput)) return castedInput;
        alert('El valor ingresado no es número');
    }
}

function askForAnIndexFrom({
    optionsArray,
    promptMessage,
    invalidMessage = 'Opción inválida. Intenta de nuevo',
}) {
    const formattedListString = optionsArray
        .map((element, index) => `${index + 1}. ${element}`)
        .join('\n');

    while (true) {
        const option = askForNumber(`${promptMessage}\n` + formattedListString);
        const isValidOption =
            option && option > 0 && option <= optionsArray.length;
        if (isValidOption) return option - 1;
        alert(invalidMessage);
    }
}

function askForDate({ promptMessage, timeString }) {
    const dateFormat = 'YYYY-MM-DD';
    while (true) {
        const dateInput =
            prompt(`${promptMessage} Formato: ${dateFormat}`) + timeString;
        const isValidDate = !Number.isNaN(Date.parse(dateInput));
        if (isValidDate) return new Date(dateInput);
        alert(
            `La fecha ingresada no cumple con el formato: ${dateFormat}. Inténtalo de nuevo.`
        );
    }
}

function idGenerator(initialId) {
    return function () {
        return initialId++;
    };
}
const generateId = idGenerator(1);
function askForBookingDates() {
    const startingDate = askForDate({
        promptMessage: 'Ingresa la fecha de INICIO de la reserva.',
        timeString: 'T13:00:00',
    });
    let endingDate;
    while (true) {
        endingDate = askForDate({
            promptMessage:
                `La fecha de Inicio es: ${startingDate.toLocaleDateString(
                    'es-CO'
                )}\n` + 'Ingresa la fecha de FIN de la reserva.',
            timeString: 'T16:00:00',
        });
        if (endingDate > startingDate) break;
        alert('Fecha de FIN inválida. Debe ser mayor a la fecha de inicio.');
    }
    return { startingDate, endingDate };
}

function createBooking(roomNumber, roomNumber, guestCount) {
    const hostFullname = prompt(
        'Ingresa tu nombre completo para crear la reserva'
    );
    const { startingDate, endingDate } = askForBookingDates();
    bookings.push({
        id: generateId(),
        roomNumber,
        startingDate,
        endingDate,
        hostFullname,
        guestCount,
    });
    alert(
        `¡Reserva para habitación '${roomNumber}' a nombre de '${hostFullname}' creada con exito!`
    );
}

function askForRoomToBook(rooms, roomTypes) {
    const guestCount = askForNumber(
        'Ingresa la cantidad de huespedes que desean hospedarse'
    );
    const roomTypesMatchingGuestsNumber = roomTypes.filter(
        (roomType) => roomType.capacity >= guestCount
    );

    const availableRooms = rooms.filter((room) => {
        const hasAllowedCapacity = roomTypesMatchingGuestsNumber.some(
            (roomType) => roomType.id === room.roomTypeId
        );
        return hasAllowedCapacity && room.availability;
    });

    if (!availableRooms.length) {
        alert(
            'No habitaciones disponibles para esa cantidad de huespedes en el momento.'
        );
        return { room: null, guestCount };
    }
    const chosenRoomIndex = askForAnIndexFrom({
        promptMessage:
            'Ingrese el numero de la lista habitaciones que quiere reservar: ',
        optionsArray: availableRooms.map((room) => {
            return `Habitación ${room.number} (${
                roomTypes.find((roomType) => roomType.id === room.roomTypeId)
                    .name
            })`;
        }),
    });

    return { room: availableRooms[chosenRoomIndex], guestCount };
}

function bookRoom(rooms, roomTypes) {
    const { room, guestCount } = askForRoomToBook(rooms, roomTypes);
    if (!room) return;
    createBooking(room.number, room.number, guestCount);
    room.availability = false;
}

async function checkRoomAvailability(rooms) {
    let roomToCheck, roomNumber;
    while (true) {
        roomNumber = askForNumber(
            'Ingresa el número de la habitación para verificar su disponibilidad'
        );
        roomToCheck = rooms.find((room) => room.number === roomNumber);
        if (roomToCheck) break;
        alert('Numero de habitación inválido. Intenta de nuevo');
    }

    let isAvailable = false;
    console.log('Checking room availability...');
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                roomToCheck.availability ? resolve() : reject();
            }, 1500);
        });
        isAvailable = true;
    } catch (error) {
        isAvailable = false;
    }

    alert(
        `La habítación ${roomNumber} ${
            !isAvailable ? 'no' : ''
        } se encuentra disponible`
    );
}

function showBookingsByHost(rooms, roomTypes) {
    const hostFullname = prompt('Ingresa el nombre del huesped');
    const hostBookings = bookings.filter(
        (booking) => booking.hostFullname === hostFullname
    );

    if (!hostBookings.length)
        return alert(
            `El huesped ${hostFullname} no tiene reservas a su nombre en el momento`
        );

    console.log({ hostBookings });

    const bookedRooms = rooms.filter((room) => {
        const isRoomBooked = hostBookings.some(
            (booking) => booking.roomNumber === room.number
        );
        return isRoomBooked;
    });

    console.log({ bookedRooms });

    alert(
        'Revisa la consola para ver las reservas del huesped... Presiona ENTER'
    );

    console.log('RESERVAS');
    bookedRooms.forEach((room, index) => {
        const roomType = roomTypes.find(
            (roomType) => room.roomTypeId === roomType.id
        );
        const correspondingBooking = hostBookings.find(
            (booking) => booking.roomNumber === room.number
        );
        console.log(
            `Habitación ${room.number} (${roomType.name}) reservada a nombre de '${hostFullname}'\n` +
                `Desde '${correspondingBooking.startingDate.toLocaleDateString(
                    'es-CO'
                )}' hasta '${correspondingBooking.endingDate.toLocaleDateString(
                    'es-CO'
                )}'`
        );
        const isNotLastRoom = bookedRooms.length - 1 !== index;
        if (isNotLastRoom) console.log('-*********************-');
    });
}

function cancelBooking(rooms) {
    const hostFullname = prompt('Ingresa el nombre del huesped');
    const hostBookings = bookings.filter(
        (booking) => booking.hostFullname === hostFullname
    );

    if (!hostBookings.length)
        return alert(
            `El huesped ${hostFullname} no tiene reservas a su nombre en el momento`
        );

    const bookingIndexToCancel = askForAnIndexFrom({
        promptMessage: 'Ingresa el numero de la reserva a cancelar.',
        optionsArray: hostBookings.map(
            (booking) =>
                `Reserva: Habitación ${
                    booking.roomNumber
                }. Desde '${booking.startingDate.toLocaleDateString(
                    'es-CO'
                )}' hasta '${booking.endingDate.toLocaleDateString('es-CO')}'`
        ),
    });
    const booking = hostBookings[bookingIndexToCancel];

    for (const room of rooms) {
        if (room.number === booking.roomNumber) {
            room.availability = true;
            break;
        }
    }

    bookings.splice(bookingIndexToCancel, 1);
    alert(
        `¡Reserva de la habitación '${booking.roomNumber}' cancelada con exito!`
    );
}

function editBooking() {
    const hostFullname = prompt('Ingresa el nombre del huesped');
    const hostBookings = bookings.filter(
        (booking) => booking.hostFullname === hostFullname
    );

    if (!hostBookings.length)
        return alert(
            `El huesped ${hostFullname} no tiene reservas a su nombre en el momento`
        );

    const bookingIndexToEdit = askForAnIndexFrom({
        promptMessage: 'Ingresa el numero de la reserva a editar.',
        optionsArray: hostBookings.map(
            (booking) =>
                `Reserva: Habitación ${
                    booking.roomNumber
                }. Desde '${booking.startingDate.toLocaleDateString(
                    'es-CO'
                )}' hasta '${booking.endingDate.toLocaleDateString('es-CO')}'`
        ),
    });
    const booking = hostBookings[bookingIndexToEdit];

    const { startingDate, endingDate } = askForBookingDates();
    booking.startingDate = startingDate;
    booking.endingDate = endingDate;
    alert(
        `¡Reserva de la habitación '${booking.roomNumber}' modificada con exito!\n` +
            `Nuevas fechas: Desde ${booking.startingDate.toLocaleDateString(
                'es-CO'
            )} hasta ${booking.endingDate.toLocaleDateString('es-CO')}`
    );
}

async function showMenu(rooms, roomTypes) {
    let isMenuOpened = true;
    while (isMenuOpened) {
        const option = askForAnIndexFrom({
            promptMessage: 'Bienvenido al sistema de reservas de Hotel',
            optionsArray: [
                'Reservar habitación.',
                'Verificar disponibilidad de habitación.',
                'Ver reservas actuales por cliente.',
                'Cancelar reserva.',
                'Editar reserva',
                'Salir',
            ],
        });
        switch (option) {
            case 0: {
                bookRoom(rooms, roomTypes);
                break;
            }
            case 1: {
                await checkRoomAvailability(rooms);
                break;
            }
            case 2: {
                showBookingsByHost(rooms, roomTypes);
                break;
            }
            case 3: {
                cancelBooking(rooms);
                break;
            }
            case 4: {
                editBooking();
                break;
            }
            default: {
                isMenuOpened = false;
                break;
            }
        }
    }
}

function cargarYMostrarData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al cargar los datos.');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Habitaciones:', data.rooms);
                    console.log('Tipos de Habitaciones:', data.roomTypes);
                    resolve(data); 
                })
                .catch((error) => {
                    console.error(error);
                    reject(error); 
                });
        }, 1000);
    });
}

function main() {
    cargarYMostrarData()
        .then(({ rooms, roomTypes }) => {
            showMenu(rooms, roomTypes);
        })
        .catch((error) => {
            console.error('Error al manejar la promesa:', error);
        });
}

main();