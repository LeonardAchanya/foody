const Like = require("../models/like");
const User = require("../models/users");
const Receipe = require("../models/reciepe");


exports.getLikes = (req, res, next) => {
    Like.findAll()
        .then(
            (likes) => {
                res.json(likes)
            })
        .catch(err => res.json({ success: false }))
}

exports.postLike = (req, res, next) => {
    // Like.findAll({
    //     where: {
    //         UserId: 1,
    //         ReceipeId: 1
    //     }
    // })
    //     .then((result) => {

    //         // conditional statement to check if the user has not already liked the receipe 

    //         if (result.length < 1) {
    //             // if he/she has not, it post it to the like db
                Like.create({
                    UserId: 1,
                    ReceipeId: 1
                })
                    .then((like => {
                        res.json({ like, success: true });
                    }))
                    .catch((err) => res.json({ message: "Failed", Error: err }));
        //     } else {

        //         //if the user has already liked, he has the option of unliking

        //         Like.findByPk(result[0].id)
        //             .then((like) => {
        //                 like.destroy()
        //                     .then(() => {
        //                         res.json({ success: true })
        //                     })
        //                     .catch(err => res.json({ success: false }))
        //             })
        //             .catch((err) => res.json({ success: false, message: "Like doesnt exist" }))

        //     }
        // })
        // .catch((err) => console.log(err));
}