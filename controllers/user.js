const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.postAddUser = (req, res, next) => {
    const { firstname, lastname, email, username, password, confirmPassword, imageUrl } = req.body;
    if (!firstname || !lastname || !email || !username || !password) {
        res.status(400).json({ msg: "All Field are required" })
    } else {
        User.findOne({
            where: {
                email
            }
        })
            .then((user) => {
                if (user) {
                    return res.status(400).json({ msg: "User exists" })
                } else {

                    // if (password !== confirmPassword) {
                        // return res.status(400).json({ msg: "Password's don't match" })
                    // } else {
                        let hashedPassword;
                        try {
                            const salt = bcrypt.genSaltSync(10);
                            hashedPassword = bcrypt.hashSync(password, salt);
                        } catch (error) {
                            throw error;
                        }
                        User.create({
                            firstname,
                            lastname,
                            email,
                            username,
                            password: hashedPassword,
                            imageUrl
                        }).then((user) => {
                            jwt.sign(
                                { id: user.id },
                                process.env.AUTH_SECRET_KEY,
                                (err, token) => {
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.firstname + " " + user.lastname,
                                            email: user.email
                                        }
                                    })
                                });
                        }).catch((err) => res.status(500).json({ msg: "error occured" }))
                    // }

                }
            })
            .catch((err) => res.status(500).json({ msg: err }))
    }
}

exports.getUsers = (req, res, next) => {
    User.findAll()
        .then((users) => {
            res.json(users)
        }).catch((err) => res.json(err))
}
