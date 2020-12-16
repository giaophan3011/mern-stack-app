const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const TodoSchema = new Schema({
  action: {
    type: String,
    required: [true, "The todo text field is required"],
  },
});

//create model for todo
const Todo = mongoose.model("todo_2", TodoSchema);

module.exports = Todo;
