const Category = require("../models/category");

exports.getCategories = (req, res, next) => {
    Category.findAll()
        .then(
            (categories) => {
                res.json(categories)
            })
        .catch(err => res.json({
            success: false
        }))
}

exports.postCategory = (req, res, next) => {
    const{title} = req.body;
    Category.create({
        title
    })
        .then((category => {
            res.json({
                category,
                success: true
            });
        }))
        .catch((err) => res.json({
            message: "Failed",
            Error: err
        }));

}