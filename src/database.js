const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect( 'mongodb+srv://woler:woler@cluster0.upqim.mongodb.net/<dbname>?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');
        

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }
    // try {
    //     await mongoose.connect( 'mongodb://localhost:27017/myappfur', {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useCreateIndex: true
    //     });

    //     console.log('DB Online');
        

    // } catch (error) {
    //     console.log(error);
    //     throw new Error('Error en la base de datos - Hable con el admin');
    // }

}

module.exports = {
    dbConnection
}