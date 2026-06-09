const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

// ── MIDDLEWARE ──
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── MONGOOSE SCHEMAS ──
const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  tags:        [String],
  emoji:       { type: String, default: '🚀' },
  link:        { type: String, default: '' },
  createdAt:   { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
const Contact = mongoose.model('Contact', contactSchema);

// ── ROUTES ──

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST a new project
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, tags, emoji, link } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const project = new Project({ title, description, tags, emoji, link });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// DELETE a project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// POST contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// GET all contact messages (admin)
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── SEED SAMPLE PROJECTS ──
async function seedProjects() {
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany([
      {
        title: 'Full Stack Development Internship',
        description: 'Internship at Thiranex — working on full-stack web development tasks, building and integrating frontend and backend features as part of a real-world development team.',
        tags: ['Internship', 'Full Stack', 'Node.js', 'HTML/CSS'],
        emoji: '💼',
        link: ''
      },
      {
        title: 'Supply Chain & Inventory Optimization Dashboard',
        description: 'An interactive Power BI dashboard that visualizes and optimizes supply chain operations and inventory management, enabling data-driven decisions through real-time analytics.',
        tags: ['Power BI', 'Data Analytics', 'Dashboard'],
        emoji: '📊',
        link: ''
      },
      {
        title: 'Density of States Research',
        description: 'Co-authored physics research on electron–hole symmetry in organic semiconductors (DSDTT-1 & DSDTT-2) using the DOSP entropy-ruled charge transport method, supervised by Dr. K. Navamani at KPRIET.',
        tags: ['Research', 'Physics', 'Python'],
        emoji: '🔬',
        link: ''
      },
      {
        title: 'Portfolio Website',
        description: 'A full-stack personal portfolio built with HTML, CSS, and JavaScript on the frontend and Node.js + MongoDB on the backend.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
        emoji: '🌐',
        link: ''
      }
    ]);
    console.log('✓ Seeded sample projects');
  }
}

// ── CONNECT & START ──
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✓ Connected to MongoDB');
    await seedProjects();
    app.listen(PORT, () => {
      console.log(`✓ Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    console.log('  Starting server without DB (projects endpoint will error)');
    app.listen(PORT, () => {
      console.log(`✓ Server running at http://localhost:${PORT}`);
    });
  });
