const asyncHandler = require('express-async-handler')


const getGoals = asyncHandler( async (req, res) => {
      console.log("This is the body: ",req.body)
      res.status(200).json({message:'Get goals hai'})
})

module.exports = {
   getGoals
}