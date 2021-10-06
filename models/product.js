const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        min:0
    },
    img:{
        type:String,
        trim:true,
        default:'abc'
        //default:'/images/product.jpg'
    },
    desc:{
        type:String,
        trim:true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;