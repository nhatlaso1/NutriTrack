import express from 'express';
import cors from 'cors';
import allRouter from './allRouter.js';
import dotenv from 'dotenv';
import options from './swagger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const specs = swaggerJSDoc(options);
const app = express();
const PORT = process.env.PORT || 5000;

// swagger section (place it before other routes and middleware)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Nutri_Tracking_Capstone');
});

app.use(allRouter);

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// "Not Found" handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Run app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
