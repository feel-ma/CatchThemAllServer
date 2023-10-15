const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const Jsons = require("../models/Jsons.model");



const getUser = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log("im at least trying")

 user = await User.findById(decoded._id)
  
  res.json(user);
}); 

const setLimitAlert = asyncHandler(async (req, res) => {

  const {howMany} = req.body

    try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findByIdAndUpdate(decoded._id, { $inc: { actionsWeek: howMany ,actionsDay: howMany, actionsMonth: howMany}, lastActionsCount:howMany, removedLimitAlert: true}).select("-password");

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
})


const resetLimitAlert = asyncHandler(async (req, res) => {

  try{
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  req.user = await User.findByIdAndUpdate(decoded._id, {removedLimitAlert: false}).select("-password");

  }catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
})



 const removedCounter = asyncHandler(async (req, res) => {

    const {howMany} = req.body

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decoded._id).select("-password");

      const newCount = user.removedCount + howMany;

      console.log(newCount)

      await User.findByIdAndUpdate(decoded._id,{removedCount:howMany} )

  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
 
module.exports = {setLimitAlert,getUser, resetLimitAlert, removedCounter }