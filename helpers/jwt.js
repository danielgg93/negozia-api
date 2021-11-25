const jwt = require('jsonwebtoken');

const generateJWT = ( uid,name ) => {

    return new Promise ( (resolve,reject) => {

        const payload = { uid, name };

        //firma del token
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        },(err,token) =>{

            if(err){
                console.log(err);
                reject('No se pude generar el token')
            }

            resolve( token );
        })


    })

} 

module.exports = {

    generateJWT
}