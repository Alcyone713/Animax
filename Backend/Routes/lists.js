const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const requireLogin = require('../requireLoginMiddleware.js')
let {PythonShell} = require('python-shell')


router.put('/add_to_completedlist', requireLogin, async (req, res) => {
    await User.findOneAndUpdate({ email: req.user.email }, {
        $push: {
            completedlist:
            {
                mal_id: req.body.mal_id,
                score: req.body.score
            }
        },
    })
    .then( function (error, success) {
        if (error) {
            console.log(error);
        } else {
            res.json({ message: "successfully send" })
            console.log(success);
        }
    })
})

router.get('/userdetails',requireLogin, async (req, res) => {
    await User.find({email: req.user.email})
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

router.put('/add_to_watchlist', requireLogin, async (req, res) => {
    await User.findOneAndUpdate({ email: req.user.email }, {
        $push: {
            watchlist:
            {
                mal_id: req.body.mal_id
            }
        },
    })
    .then( function (error, success) {
        if (error) {
            console.log(error);
        } else {
            res.json({ message: "successfully send" })
            console.log(success);
        }
    })
})

router.get('/recommendations', requireLogin, async (req, res) => {
    const CompletedList = await User.find({email : req.user.email })
    let completedArray = [[]];
    let i=0;
    CompletedList[0].completedlist.forEach(e => {
        let mal = e.mal_id;
        let sc = e.score;
        let temp = [
            mal, sc
        ]
        completedArray[i] = temp;
        i++;
    });
    res.send(completedArray)
})


module.exports = router




