const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    });
}

exports.agregarTestimonial = async (req, res) => {
    // Gracias al bodyparser, se puede usar la siguiente linea, para hacer un destructuring para leer lo que enviamos
    // console.log(req.body);
    // Validar que todos los campos este llenos
    let { nombre, correo, mensaje } = req.body;
    // EL request.body, lee los datos que tienes en name (como en php)

    let errores = [];
    if (!nombre) {
        errores.push({ 'mensaje': 'Agrega tu Nombre' });
    }
    if (!correo) {
        errores.push({ 'mensaje': 'Agrega tu Correo' });
    }
    if (!mensaje) {
        errores.push({ 'mensaje': 'Agrega tu Mensaje' });
    }

    // Revisar por errores
    if (errores.length > 0) {
        // Muestra la vista con errores
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        });
    } else {
        // Almacenarlo en la BD
        await Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        res.redirect('/testimoniales')
    }
}