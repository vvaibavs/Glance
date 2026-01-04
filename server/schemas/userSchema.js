const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  todos: [
    {
      text: String,
      completed: { type: Boolean, default: false },
    }
  ],

  calendar: [
    {
      title: String,
      date: Date,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
