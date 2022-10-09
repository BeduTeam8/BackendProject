const { Sequelize } = require('sequelize');
const Category = require('../models/category');
const Book = require('../models/book')

function createCategory(req, res){
    const body = req.body;
    Category.create(body).then(cat =>{
        return res.status(201).json(cat);
    });
}

async function getCategory(req, res){
    const genre = req.params.genre;
    const cat = await Category.findByPk(genre,
        {
            include: Book
        });
    res.status(200).json(cat);
}

async function getCategories(req, res){
    try{
    const categories = await Category.findAll({
        include: Book
    });
    res.status(200).json(categories);
    }
    catch (err){
        res.status(400).json({error : "Intenta refrescar la página"})
    }
}

async function updateCategory(req, res){
    try{
        const genre = req.params.genre;
        const cat = req.body;
        const update = await Category.update(cat,{where: {genre}});
        const newCat = await Category.findByPk(update[0]);
        res.status(200).json(newCat);
    } catch(error){
        res.status(400).json(error);
    }
}

async function deleteCategory(req, res){
    const genre = req.params.genre;
    
    const destruido = Category.destroy({where: {genre}});
    res.status(200).json({destruido});
}

module.exports = {
    createCategory,
    updateCategory,
    getCategories,
    getCategory,
    deleteCategory
}