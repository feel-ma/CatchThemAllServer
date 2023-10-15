const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    removedLimitAlert:{
      type: Boolean,
      default: false 
    },
    removedCount:{
      type: Number,
      default: 0,
    },
    lastDayOnline:{
      type: String,
    },
    weekStart:{
      type: String,
    },
    lastActionsCount:{
      type: Number,
    },
    actionsDay:{
      type: Number,
    },
    actionsWeek:{
      type: Number,
    },
    month:{
      type: String,
    },
    actionsMonth:{
      type: Number,
    },
    monthlyResults:{
      type: Array,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
