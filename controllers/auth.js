const { response } = require('express');
const { validationResult } = require('express-validator')
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt');




const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        console.log(user)

        if (!user) {
            return res.status(200).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        //confirmar los passwords

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(200).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar el JWT
        const token = await generateJWT( user.id, user.name);


        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,


        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }


}

const revalidateToken = async(req, res = response) => {

    const {uid,name} =req;
    

    //generar un nuevo JWT  y retornalo en esta peticion
    const token = await generateJWT( uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
        
        
    })
}



module.exports = {
    loginUser,
    revalidateToken,
}