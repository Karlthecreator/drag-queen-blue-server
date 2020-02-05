const router = require('express').Router();
const Profile = require('../db').import('../models/profile');
const ValidateSession = require('../middleware/validate-session');


router.get('/', (req, res)=> {
    Profile.findAll()
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json({error: err}))

})

router.get('/myprofile', ValidateSession, (req, res) => {
    Profile.findOne({ where: {userEmail: req.user.email}})
    .then(profile => res.status(200).json(profile))
    .catch(err=> res.status(500).json(req.errors))
})

router.post('/create', ValidateSession, (req, res)=> {
    const profileInfo = {
        queenName: req.body.queenName,
        birthName: req.body.birthName,
        homeTown: req.body.homeTown,
        currentTown: req.body.currentTown,
        about: req.body.about,
        accolades: req.body.accolades,
        upcomingShows: req.body.upcomingShows,
        userEmail: req.user.email,
        image: req.body.image,
        
    }
    Profile.create(profileInfo)
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json(req.errors))

})

router.put('/myprofile', ValidateSession, (req, res)=> {
    Profile.update(req.body, {where: {userEmail: req.user.email}})
    
    .then(profile => res.status(200).json(profile))
    .catch(err => res.json({error:err}))
})

router.delete('/myprofile', ValidateSession, (req, res) => {
    Profile.destroy({ where: {userEmail: req.user.email}})
    .then(profile => res.status(200).json(profile))
    .catch(err => res.json({error: err}))
})



module.exports = router;