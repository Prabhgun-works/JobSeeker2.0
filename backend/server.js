// server.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`JobSeeker backend running → http://localhost:${PORT}`));
