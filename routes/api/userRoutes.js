const router = require('express').Router();
const {Users, Thoughts} = require('../../models');

router.get('/', async (req,res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});

router.get('/:userId', async (req,res) => {
    try {
        const user = await Users.findOne()
        console.log(req.params.userId)
        // .populate('thoughtText')
        // .populate('friends')
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});

router.post('/', async (req,res) => {
    try {
        const newUser = await Users.create(req.body);
        res.status(200).json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});

router.put('/:_id', async (req,res) => {
    try {
    const updatedUser = await Users.findOneAndUpdate(
        {_id: req.params._id},
        {$set: req.body},
        {runValidators: true, new: true}
        );
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});

router.delete('/:_id', async (req,res) => {
    try {
        const users = await Users.findOneAndDelete();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});


router.post('/:_id/friends/:_id', async (req,res) => {
    try {
        const newFriend = await Users.findOneAndUpdate(
            {_id: req.params._id},
            {$addToSet: {friends: req.params._id}},
            {new:true}
        );
        res.status(200).json(newFriend);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});

router.delete('/:_id/friends/:_id', async (req,res) => {
    try {
        const delFriend = await Users.findOneAndUpdate(
            {_id: req.params._id},
            {$pull: {friends: req.params._id}},
            {new:true}
        );
        res.status(200).json(delFriend);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({msg: error});
    }
});


module.exports = router;