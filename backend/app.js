const express = require('express'); 
const app = express();
const cors = require('cors'); 
const methodOverride = require('method-override'); 

 
// Import route handlers
const authRoutes = require('./routes/authRoutes'); 
const studentRoutes = require('./routes/studentRoutes');  
const teacherRoutes = require('./routes/teacherRoutes');  
const examRoutes = require('./routes/examRoutes');  
const resultRoutes = require('./routes/resultsRoutes'); 
const snapshotRoutes = require('./routes/snapshotRoutes');
// const errorHandler = require('./middleware/errorHandler'); 

// Middleware
app.use(express.json()); // Parse incoming JSON payloads
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(methodOverride('_method')); // Allow HTTP method overrides

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');  
});

// app.get('/ping', (req, res) => {
//   res.send('for');  
// });

// Routes for different functionalities 
app.use('/', authRoutes); // Routes for user authentication
app.use('/', studentRoutes); // Routes for managing students
app.use('/', teacherRoutes); // Routes for managing questions
app.use('/', examRoutes); // Routes for managing exams
app.use('/', resultRoutes); // Routes for managing results
app.use('/', snapshotRoutes); // Routes for managing snapshots

// Fallback route for undefined API endpoints
// app.all('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });
  
// Error handling middleware


// app.use(errorHandler); // Global error handler

// Export the app instance
module.exports = app;