const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const requireLogin = require('../requireLoginMiddleware.js')


router.put('/add_to_completedlist', async (req, res) => {
    let { uid, score, email } = req.query
    uid=parseInt(uid,10)
    score=parseInt(score,10)
    if (!uid || !score) {
        res.status(422).json({ error: "Please add something to completed list" })
    }

    res.json({ message: "successfully send" })
    await User.findOneAndUpdate({ email: email }, {
        $push: {
            completedlist:
            {
                mal_id: uid,
                score: score
            }
        },
    }, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })
})

router.get('/userdetails', async (req, res) => {
    const { email } = req.query
    console.log(email)
    await User.find({email: email})
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
})


router.put('/add_to_watchlist/:uid', (req, res) => {
    const email = req.body.email
    const uid = parseInt(req.params.uid,10)

    console.log(uid)
    if (!uid) {
        return res.status(422).json({ error: "Please add something to watchlist" })
    }
    res.json({ message: "successfully send" })
    User.findOneAndUpdate({ email: email }, {
        $push: { watchlist: uid },
    }, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })
})

module.exports = router




