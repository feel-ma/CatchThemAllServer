const express = require("express");
const router = express.Router();
const { createJson, getAllJsons, handleTen, handleTenRemove, resetPeopleAdded, resetCounter} = require("../controller/jsonsController.js");
const { getUser,setLimitAlert, resetLimitAlert, removedCounter} = require("../controller/userController.js");
const { setDay, setMonth , setStartWeek} = require("../controller/timeController.js");



router.get("/", (req, res, next) => {
  res.json("All good in here");
});



router.route("/jsons").get(getAllJsons);
console.log('Request reached /dashboard endpoint');
router.route("/jsons").post( createJson);
console.log('Request reached /dashboard endpoint');
router.route("/jsonspeopleadded/").put(handleTen);
console.log('Request reached /dashboard endpoint');
router.route("/jsonspeopleremoved/").put(handleTenRemove);
console.log('Request reached /dashboard endpoint');
router.route("/jsons/removed").put(resetPeopleAdded);
console.log('Request reached /dashboard endpoint');
/* router.route("/jsons/removedcount").put(removedCounter);
console.log('Request reached /dashboard endpoint'); */
router.route("/jsons/resetcounter").put(resetCounter);
console.log('Request reached /dashboard endpoint');


router.route("/user").get(getUser);
console.log('Request reached /dashboard endpoint');
router.route("/user/limitreached").put(setLimitAlert);
console.log('Request reached /dashboard endpoint');
router.route("/user/resetlimit").put(resetLimitAlert);
console.log('Request reached /dashboard endpoint');
router.route("/user/removedcount").put(removedCounter);
console.log('Request reached /dashboard endpoint');


router.route("/time").get();
router.route("/time/day").put(setDay);
router.route("/time/month").put(setMonth);
router.route("/time/weekstart").put(setStartWeek);





module.exports = router;
