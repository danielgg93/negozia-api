/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {loginUser,revalidateToken, get} = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');



router.post('/',
[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
    validateFields
],
loginUser);

router.get('/renew',validateJWT,revalidateToken);


module.exports = router;