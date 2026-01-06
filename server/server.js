const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
const User = require('./schemas/userSchema')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('REQUEST:', req.method, req.url);
  next();
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
  title: String,
  done: Boolean,
});

const Task = mongoose.model('Task', TaskSchema);

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.post('/signup', async (req, res) => {
  try {
    console.log('SIGNUP BODY:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/login', async (req, res) => {
  try {
    console.log('REQ BODY:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const user = await User.findOne({ email });
    console.log('USER FOUND:', user);

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({
      success: true,
      userId: user._id,
      email: user.email,
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

//get todos
app.get('/todos/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.json(user.todos);
});

//add todo
app.post('/todos/:userId', async (req, res) => {
    const { userId } = req.params;
    const { todo } = req.body;
    const user = await User.findById(userId);
    user.todos.push({text: todo, completed: false});
    await user.save();
    res.json(user.todos);
});

app.listen(3000, () => console.log('Server running on port 3000'));
