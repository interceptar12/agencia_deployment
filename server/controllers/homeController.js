const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

// Código con Async Await

exports.consultasHomepage = async (req, res) => {
    // Para ejecutar multiples consultas con Async Await
    const viajes = await Viaje.findAll({limit: 3});
    const testimoniales = await Testimonial.findAll({ limit: 3});

    // Ejecutarlo
    res.render('index', {
        pagina: 'Próximos Viajes',
        clase: 'home',
        viajes,
        testimoniales
    })
}

// Código con Promises.all

// exports.consultasHomepage = (req, res) => {
//     // Para ejecutar multiples consultas
//     const promises = [];
//     promises.push(
//         Viaje.findAll({
//             limit: 3
//         }));
//     promises.push(
//         Testimonial.findAll({
//             limit: 3
//         }));

//     // Pasar el promise y ejecutarlo
//     const resultado = Promise.all(promises);

//     resultado.then(resultado => res.render('index', {
//         pagina: 'Próximos Viajes',
//         clase: 'home',
//         // En el orden que agregamos los promises al arreglo, es la posición del resultado
//         viajes: resultado[0],
//         testimoniales: resultado[1]
//     }))
//     .catch(error => console.log(error));
// }