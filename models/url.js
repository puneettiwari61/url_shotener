var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var urlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      unique: true,
      max: 6,
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", function (next) {
//   if (this.password && this.isModified("password")) {
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
//   }
// });

module.exports = mongoose.model("Url", urlSchema);
