const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctor = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    experience: {
      type: String,
    },
    education: {
      type: String,
    },
    introduce: {
      type: String,
    },
    imgs: {
      type: String,
    },

    specialty: {
      type: String,
    },
  },
  {
    collection: "doctor",
  }
);

module.exports = mongoose.model("doctor", doctor);
