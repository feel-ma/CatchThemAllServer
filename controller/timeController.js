const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const Jsons = require("../models/Jsons.model");



const setDay = asyncHandler(async (req, res) => {
    const { owner, dayOfMonth} = req.body;
    const zero = 0

      req.user = await User.findByIdAndUpdate(owner, {lastDayOnline:dayOfMonth, actionsDay:zero})
  });

  const setMonth = asyncHandler(async (req, res) => {
    const { owner, month, lastMonthTotal, year} = req.body;
    const count = 0

    const saveLastMonthData = {
        month: month,
        total: lastMonthTotal,
        year: year
    }

    console.log(month)

      req.user = await User.findByIdAndUpdate(owner, { $push: { monthlyResults: saveLastMonthData },month:month, actionsMonth:count})
  });

  const setStartWeek = asyncHandler(async (req, res) => {
    const { owner, dayOfMonth, month, day} = req.body;
    const count = 0

    console.log(dayOfMonth)

      req.user = await User.findByIdAndUpdate(owner, {weekStart:dayOfMonth, actionsWeek:count })
  });



module.exports = {setDay,setMonth,setStartWeek}