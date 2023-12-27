
const mongoose = require("mongoose");

const userEditHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  editedFields: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  editedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const UserEditHistory = mongoose.model(
  "UserEditHistory",
  userEditHistorySchema
);

module.exports = UserEditHistory;
