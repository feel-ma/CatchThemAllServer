const { Schema, model } = require("mongoose");

const jsonSchema = new Schema(
  {
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
      type: String,
      },
    file: {
      type: Array,
      timestamps: true
    },
    peopleAdded: {
      type: Array,
      timestamps: true
    },
    count:{
      type: Number,
      timestamps: true

    },
    notes: {
      type: Array,
      },
  },
  {
    timestamps: true,
  }
);

const Jsons = model("Jsons", jsonSchema);

module.exports = Jsons;