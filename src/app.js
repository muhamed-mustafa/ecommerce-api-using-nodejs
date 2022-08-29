import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbConnection } from './config/database.js';
import { mountRoutes } from './routes/index.js';
import { ApiError } from './utils/apiError.js';
import { globalError } from './middlewares/globalErrorMiddleware.js';
import cors from 'cors';
import compression from 'compression';
import { webhookCheckout } from './services/orderService.js';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: 'config.env' });

// express app
const app = express();

// Connect with db
dbConnection();

// // Enable other domains to access your application
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());

// Checkout webhook
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  webhookCheckout
);

// Middlewares
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, './uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Limit each IP to 100 requests per `window` (here, per 1 hour)
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

app.use('/api', limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
  hpp({
    whitelist: [
      'price',
      'sold',
      'quantity',
      'ratingsAverage',
      'ratingsQuantity',
    ],
  })
);

// Mount Routes
mountRoutes(app);

app.all('*', (req, _res, next) => {
  next(new ApiError(`Can't find this route : ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(`App Running On Port ${PORT}`)
);

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors : ${err.name} || ${err.message}`);
  server.close(() => {
    console.log('Shutting down....');
    process.exit(1);
  });
});
