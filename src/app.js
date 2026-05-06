require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const errorMiddleware = require('./middlewares/errorMiddleware');

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const documentRoutes = require('./routes/documentRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Register routes
app.use('/users', userRoutes);
app.use('/authentications', authRoutes);
app.use('/companies', companyRoutes);
app.use('/categories', categoryRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/', bookmarkRoutes);
app.use('/documents', documentRoutes);
app.use('/profile', profileRoutes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}`);
});

module.exports = app;
