const { response } = require('express');
const { validationResult } = require('express-validator')
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const create = async (req, res = response) => {

    const { email, password, isActive } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }
        user = new User(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //generar JWT
        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            msg: "El usuario es administrador",
            uid: user.id,
            name: user.name,
            role: user.role,
            token,
            isActive,

        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const get = async (req, res = response) => {
    const user = await User.find({});
    res.json({
        ok: true,
        user
    })
}

const update = async (req, res = response) => {

    const userId = req.params.id;
    const uid = req.uid;


    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: ' Usuario no existe por ese id'
            })
        }

        const newUser = {
            ...req.body,
            user: uid
        }

        const userUpdate = await User.findByIdAndUpdate(userId, newUser, { new: true });

        return res.json({
            ok: true,
            msg: userUpdate
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


    res.json({
        ok: true,
        msg: 'actualizar usuarios',
        userId

    })

}

module.exports = {
    create,
    get,
    update
}
