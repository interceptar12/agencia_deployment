const Viaje = require('../models/Viajes');

// Con Promises

// exports.mostrarViajes = (req, res) => {
//     // Realizando consulta y enviandola a la vista
//     Viaje.findAll()
//         .then(viajes => res.render('viajes', {
//             pagina: 'Próximos Viajes',
//             // viajes: viajes Gracias a la propiedad de object literal, como los dos se llaman igual, esto y lo de abajo es lo mismo
//             viajes
//         }))
//         .catch(error => console.log(error));
// }

// exports.mostrarViaje = (req, res) => {
//     Viaje.findByPk(req.params.id)
//         .then(viaje => res.render('viaje', {
//             viaje
//         }))
//         .catch(error => console.log(error));
// }

// Con Async Await

exports.mostrarViajes = async (req, res) => {
    // Realizando consulta y enviandola a la vista
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

exports.mostrarViaje = async (req, res) => {
    const viaje = await Viaje.findByPk(req.params.id)
    res.render('viaje', {
        viaje
    });
}