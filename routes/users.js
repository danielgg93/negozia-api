//CRUD
/* 
/api/users
 */

const { Router } = require('express');
const { check } = require('express-validator');

const {create,update,get} = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
    '/',
    [//middlerwares
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
        validateFields
    ] ,
    create);
//validaciones que tienen que pasar por el JWT
    router.use( validateJWT );

    router.get('/',get);

    router.patch('/:id',update);


module.exports = router;