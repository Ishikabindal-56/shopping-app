const express = require('express');
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
const {isLoggedIn} = require("../middleware");

router.get('/products',async(req,res)=>{
    try{
        const products = await Product.find({});
        res.render('products/index',{products});
    } catch(e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error');
    }
});

router.get('/products/new', (req, res) => {
    res.render('products/new')
});

router.post('/products', isLoggedIn, async(req, res) => {
    try{
        const newProduct = {
            ...req.body
        }
        await Product.create(newProduct);
        req.flash('success','Product successfully created');
        res.redirect('/products');
    } catch(e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error');
    }
});

router.get('/products/:id', isLoggedIn, async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id).populate('reviews');
        res.render('products/show',{product});
    } catch(e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error');
    }
});

router.get('/products/:id/edit', isLoggedIn, async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('products/edit', { product });
    } catch(e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error');
    }
});

router.patch('/products/:id', isLoggedIn, async (req, res) => {
    try{
        const updatedProduct = req.body;
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, updatedProduct);
        res.redirect(`/products/${id}`);
    } catch(e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error');
    }
});

router.delete('/products/:id', isLoggedIn, async (req, res) => {
    try{
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    } catch(e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error');
    }
})

router.post('/products/:id/review', isLoggedIn, async(req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        const { rating, comment } = req.body;
        const review = new Review({ rating, comment, user:req.user.username });
        product.reviews.push(review);
        await product.save();
        await review.save();
        req.flash('success','Review successfully created');
        res.redirect(`/products/${id}`);
    } catch(e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error');
    }
    
})

module.exports = router;