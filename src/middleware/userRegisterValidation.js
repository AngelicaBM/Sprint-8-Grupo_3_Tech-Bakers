const {body} = require('express-validator');
const path= require('path')

const userRegisterValidation = [
    
    body('fullname').notEmpty().withMessage('Por favor ingrese su nombre.').bail()
        .isLength({ min: 2 }).withMessage("El nombre debe contener al menos 2 caracteres"),
    body('lastname').notEmpty().withMessage('Por favor ingrese su apellido.').bail()
        .isLength({ min: 2 }).withMessage("El nombre debe contener al menos 2 caracteres"),
    body('email').notEmpty().withMessage('Por favor introduzca un correo electrónico.').bail()
        .isEmail().withMessage("El formato de correo no es válido"),
    body('phonenumber').notEmpty().withMessage('Por favor introduzca un telefono de contacto.'),
    body('address').notEmpty().withMessage('Indique su direccion'),
    body('city').notEmpty().withMessage('Indique su ciudad'),
    body('password').notEmpty().withMessage('Repita su contraseña').bail()
        .isLength({ min: 4 }).withMessage("La contraseña debe contener al menos 4 caracteres"),
    body('repetirpassword').notEmpty().withMessage('Escriba una contraseña').bail()
        .isLength({ min: 4 }).withMessage("La contraseña debe contener al menos 4 caracteres").bail()
            .custom((value, { req }) => {
                if(value != req.body.password){
                    throw new Error('Las contraseñas no coinciden');
                }
                        return true;
    }),  

    body('image').custom((value, { req }) => {
        const { file } = req;

        if(file){
            const acceptedExtensions = [".png", ".jpg", ".jpeg"];

            const fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Los formatos de imagen validos son ${acceptedExtensions.join(', ')}`);
            }
        }   
        
        return true; 
    })

]

module.exports = userRegisterValidation;