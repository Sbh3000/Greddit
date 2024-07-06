const { request } = require('express')
const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel') 

// GET
// route : /api/goals
// access: private
const getGoals = asyncHandler(async (req,res)=> {
    const goals = await Goal.find()

    res.json(goals)
})
// POST
// route : /api/goals
// access: private

const setGoals =asyncHandler( async (req,res)=> {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')

    }
    const goal = await Goal.create({
        text: req.body.text,
    })
    res.json(goal)
})

// PUT
// route : /api/goals/id
// access: private

const putGoals =asyncHandler( async (req,res)=> {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new: true})

    res.json(updatedGoal)
})

// DELETE 
// route : /api/goals/id
// access: private
const deleteGoals =asyncHandler( async (req,res)=> {
    const goals = await Goal.findById(req.params.id,req.body,{new: true})
    if(!goals)
    {
        res.status(400)
        throw new Error('Goal not Found');
    }
    await goals.remove()
    res.json(goals)
})



module.exports = {
    getGoals,setGoals,putGoals,deleteGoals
} 