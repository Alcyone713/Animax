const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../requireLoginMiddleware.js')
const Watch_List =  mongoose.model("Watch_List")
const Completed_List =  mongoose.model("Completed_List")

router.post('/add_to_completedlist',requireLogin,(req,res)=>{
    const {mal_id, score} = req.body 
    if(!mal_id|| !score){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const completed_list = new Completed_List({
        mal_id,
        score,
        added_by:req.user
    })
    completed_list.save().then(result=>{
        res.json({completed_list:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/add_to_watchlist',requireLogin,(req,res)=>{
    const {mal_id} = req.body 
    if(!mal_id){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const watch_list = new Watch_List({
        mal_id,
        added_by:req.user
    })
    watch_list.save().then(result=>{
        res.json({completed_list:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mywatchlist',requireLogin,(req,res)=>{
    Watch_List.find({added_by:req.user._id})
    .populate("added_by","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mycompletedlist',requireLogin,(req,res)=>{
    Completed_List.find({added_by:req.user._id})
    .populate("added_by","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router




