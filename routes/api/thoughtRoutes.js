const router = require("express").Router()
const {Thoughts, Users} = require('../../models');

router.get('/', async (req,res) => {
    try {
        const thoughts = await Thoughts.find();
        res.status(200).json(thoughts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});

router.get('/:_id', async (req,res) => {
    try {
        const thoughts = await Thoughts.findOne();
        res.status(200).json(thoughts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});

router.post('/', async (req,res) => {
    try {
        const newThought = await Thoughts.create(req.body);
        const updatedUser = await Users.findOneAndUpdate(
            {username: req.body.username},
            {$addToSet: {thoughts: thoughtText._id}},
            {new: true}
        )
        res.status(200).json(newThought, updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});

router.put('/:_id', async (req,res) => {
    try {
        const thoughts = await Thoughts.findOneAndUpdate(
            {_id: req.params._id},
            {$set: req.body},
            {runValidators: true, new: true}
            );
            res.status(200).json(thoughts);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({msg: error});
        }
});

router.delete('/:_id', async (req,res) => {
    try {
        const thoughts = await Thoughts.findOneAndDelete();
        res.status(200).json(thoughts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});



module.exports  = router