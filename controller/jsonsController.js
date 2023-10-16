const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const Jsons = require("../models/Jsons.model");

const getAllJsons = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log("im at least trying");

  req.user = await User.findById(decoded._id).select("-password");
  const jsons = await Jsons.find({ owner: req.user._id });
  res.json(jsons);
});

const createJson = asyncHandler(async (req, res) => {
  const { owner, name, data } = req.body;
  const count = 0;

  if (!name || !data) {
    res.status(400);
    throw new Error("Name or file Missing");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(decoded._id).select("-password");

    const json = new Jsons({ owner: req.user._id, name, file: data, count });

    const createdNote = await json.save();

    res.status(201).json(createdNote);
  }
});

const handleTen = asyncHandler(async (req, res) => {
  const { owner, howMany, pID } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  req.user = await User.findById(decoded._id).select("-password");
  const project = await Jsons.findById(pID);

   if (project) {
    console.log(project.count);

    const processed = project.file.splice(0, 10);
    const oldCount = parseInt(project.count, 10);
    const newCount = oldCount + parseInt(howMany, 10);

    project.peopleAdded.push(...processed);
    project.count = newCount;

    const updatedJson = await project.save();
    res.json(updatedJson);
  }
});

const handleTenRemove = asyncHandler(async (req, res) => {
  console.log("im at least trying to update");
  const { owner, howMany, pID } = req.body;
  console.log(" data from frontend", owner, howMany, pID);
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  req.user = await User.findById(decoded._id).select("-password");
  const project = await Jsons.findById(pID);

  if (project.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }
  if (project) {
    if (!project.count) {
      project.count = 0;
    }

    const processed = project.peopleAdded.splice(0, 10);
    const oldCount = parseInt(project.count, 10);
    const newCount = oldCount + parseInt(howMany, 10);

    project.count = newCount;

    const updatedJson = await project.save();
    res.json(updatedJson);
  }
});

const deleteJson = asyncHandler(async (req, res) => {
  const { pID } = req.body;
  console.log('pID:', pID);
  
  const json = await Jsons.findByIdAndDelete(pID);
  console.log("I have delated Project",json);

/*   if (json.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    console.log("im at least erroring there");
    throw new Error("You can't perform this action");
  }
  if (json) {
    console.log("im at least almost there");
    await json.deleteOne();
    res.json({ message: "Note Removed" });
  } */
});

const resetPeopleAdded = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded._id).select("-password");

    // Find all documents owned by the user
    const userOwnedJsons = await Jsons.find({ owner: req.user._id });

    // Update the peopleAdded field for all documents
    await Jsons.updateMany(
      { _id: { $in: userOwnedJsons.map((json) => json._id) } }, // Find all owned documents
      { $set: { peopleAdded: [] } } // Reset the peopleAdded field to an empty array
    );

    res.json({ message: "PeopleAdded field reset for all owned JSONs." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const resetCounter = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    //await User.findByIdAndUpdate(decoded._id,{removedCount:0})

    // Find all documents owned by the user
    const userOwnedJsons = await Jsons.find({ owner: req.user._id });

    // Update the peopleAdded field for all documents
    await Jsons.updateMany(
      { _id: { $in: userOwnedJsons.map((json) => json._id) } }, // Find all owned documents
      { $set: { count: 0 } } // Reset the peopleAdded field to an empty array
    );

    res.json({ message: "PeopleAdded field reset for all owned JSONs." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  createJson,
  getAllJsons,
  handleTen,
  resetPeopleAdded,
  resetCounter,
  handleTenRemove,
  deleteJson
};
