const { Schema, model } = require('mongoose');

const productoSchema = Schema({

    

imagen:{
    type: String,
},

    nombre: {
        type: String,
  
    }

}, {
    timestamps: true
});

productoSchema.method('toJSON', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
    // const { __v, _id, ...object } = this.toObject();
    // return object;
})



module.exports = model('producto', productoSchema );