const bcryptjs = require('bcryptjs');
const Users = require('../model/user-model');
const jwt = require('jsonwebtoken');

function userController() {
    return {
        async login(req, res) {
            const { email, password } = req.body;

            if(!email, !password) {
                res.json({ message: 'All fields are mandatory' });
                return;
            }

            Users.findOne({ email: email }, (err, user) => {
                if(err) {
                    res.json({message: err});
                }

                if(user) {
                    bcryptjs.compare(password, user.password, (err, status) => {
                        if(status === true) { // Correct password
                             jwt.sign(password, "secretkey", (err, token) => {
                                 if(err === null) {
                                    // localStorage.setItem("user", user.id);
                                    // sessionStorage.setItem("user", token);
                                    // res.cookie("usertoken", token, {
                                    //     maxAge: 1000 * 60 * 60 * 24 * 30, 
                                    //     httpOnly: true,
                                    // })
                                    res.send({ message: "Welcome User", token: token });
                                 }
                             })
                        } else {
                         res.send({message: "Wrong Password"})
                        }
                    })

                    // Creating cookies
                    // res.cookie("user", user, { 
                    //     maxAge: 1000 * 60 * 60 * 24 * 30, 
                    //     httpOnly: true,
                    // })

                } else {
                    res.json({message: "User not found , Please register yourself!!!"})
                }
            })
        },

        async register(req, res) {
            let { name, gender, email, phone, dob, address, password } = req.body; 

            if(!name || !gender || !email || !phone || !dob || !address || !password) {
                res.json({ message: 'All fields are mandatory' });
                return;
            }

            Users.findOne({ email: email }, (err, user) => {
                if(err) {
                    res.json({message: err});
                }

                if(!user) {
                    bcryptjs.genSalt(10, (err, salt) => {
                        if(err === null) {
                            bcryptjs.hash(password, salt, (err, newpassword) => {
                                // password = newpassword;

                                let userObj = new Users({
                                    name: name,
                                    gender: gender,
                                    email: email,
                                    phone: phone,
                                    dob: dob,
                                    address: address,
                                    password: newpassword
                                });
                                
                                userObj.save()
                                .then(() => {
                                    res.send({message: "User Registered"});
                                }).catch((err) => {
                                    console.log(err);
                                    res.send({message: "Problem creating the user!!"});
                                })
                            })
                        } else {
                            console.log(err);
                        }
                    })
                } else {
                    res.json({message: "User already registered, Please login!!!"});
                }
            })
        },

        async logout(req, res) {
            req.logout();
            req.session.destroy();
            return res.redirect('/login');
        },

    }
}

module.exports = userController;