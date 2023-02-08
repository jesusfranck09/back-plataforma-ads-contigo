const nodemailer = require("nodemailer");




    const sendEmail = (name, email, message, file) => {
        console.log("name",name)
        console.log("email",email)
        console.log("email",file)

        console.log("message",message)

        var smtpTransport = nodemailer.createTransport({  
            secure: true,
            host: 'adscontigo.com',
            port: 465,
            auth: {
                    user: 'ventas@adscontigo.com',
                    pass: 'Nu07b_s38',                       
            },
            
            tls: {rejectUnauthorized: false},
            });
            const mailOptions = {
                from: 'ventas@adscontigo.com',  // sender address
                to: ` jesus.francisco@ads.com.mx`, // list of receivers
                // subject: 'Cotizacion de producto o servicio' + " " + fecha, // Subject line
                subject: 'Gracias por su interés en Alfa Diseño de Sistemas', // Subject line
                text: 'Archivo de cotización PDF',
                html: `<p>
                    Basado en su solicitud de cotización, adjunto en este email nuestra propuesta comercial.
                    <br/>
                    <br/>
                    <br/>
                    Notificar si tiene alguna pregunta respondiendo a este correo electrónico o llamando
                    <br/>
                    <br/>
                    <strong>Alfa Diseño de Sistemas, es un Distribuidor Asociado Master de CONTPAQi®
                    que ha recibido el reconocimiento como el Primer Lugar en Ventas por 17 Años consecutivos en la
                    Ciudad de México.</strong>
                    <br/>
                    <br/>
                    Saludos cordiales, 
                Ejecutivo de ventas <br/>
                ALFA DISEÑO DE SISTEMAS, S.A. DE C.V.<br/>
                </p>`,
                attachments: [{
                    filename: 'Archivo de cotizacion.pdf',
                    content:file,
                    contentType: 'application/pdf'
                }]
                };

        smtpTransport.sendMail(mailOptions, function(error, response) {
            if(error) {
                console.log(error)
            } else {
                console.log( "Thank you! We will be in touch shortly!")
            }
            smtpTransport.close();
        })


    }

    module.exports = { sendEmail }