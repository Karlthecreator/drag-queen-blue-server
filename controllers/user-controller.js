let router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// SIGNUP
router.post('/signup', (req, res) => {
    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password,13)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'You Created a User!',
                sessionToken: token
            })
        },
        
        
        )
        .catch(err => res.send(500, err))
})


// SIGNIN

router.post('/signin', (req, res) => {
    User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        if (user){
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if(matches){
                    let token = jwt.sign({ id: user.id, email: user.email},
                        process.env.JWT_SECRET, {expiresIn: 60*60*24})

                        res.json({
                            user: user,
                            message: 'Successfully Authenticated User',
                            sessionToken: token
                        })
                } else {
                    res.status(502).send({ error: "bad gateway. passwords don't match"})
                }
            })
        } else {
            res.status(501).send({error: "Failed to Authenticate. No such user"})
        }
    }, err => res.send(500).send({error: "Failed to process."}))
    
})

module.exports = router;