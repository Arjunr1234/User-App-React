const express = require('express');
const router = express.Router();
const countroller = require('../Controllers/controller');



router.get('/' ,countroller.getGoals);

router.put('/:id', (req, res) => {
  res.status(200).json({message:`put you goals : ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
  res.status(200).json({message:`Delete goal:  ${req.params.id}`})
})

module.exports = router