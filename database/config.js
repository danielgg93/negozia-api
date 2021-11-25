const mongoose = require('mongoose');

const dbConection = async () => {

    try{

        await mongoose.connect('mongodb://DbAdmin:PZmceAroWHztQp9J@cluster0-shard-00-00.sw25a.mongodb.net:27017,cluster0-shard-00-01.sw25a.mongodb.net:27017,cluster0-shard-00-02.sw25a.mongodb.net:27017/mern_negozia?ssl=true&replicaSet=atlas-2rhnlq-shard-0&authSource=admin&retryWrites=true&w=majority',{
            useNewUrlParser: true,
            UseUnifiedTopology:true,
        });

        console.log('DB online')


    }catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la BD');
    }

}

module.exports={
    dbConection
}
