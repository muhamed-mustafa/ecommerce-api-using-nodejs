import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbConnection } from './config/database.js';
import { ProductRoute } from './routes/productRoute.js';
import { CategoryRoute } from './routes/categoryRoute.js';
import { subCategoryRoute } from './routes/subCategoryRoute.js';
import { BrandRoute } from './routes/brandRoute.js';
import { AuthRoute } from '../src/routes/authRoute.js';
import { UserRoute } from '../src/routes/userRoute.js';
import { ApiError } from './utils/apiError.js';
import { globalError } from './middlewares/globalErrorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: 'config.env' });

// express app
const app = express();

// Connect with db
dbConnection();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, './uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount Routes
app.use('/api/v1/products', ProductRoute);
app.use('/api/v1/categories', CategoryRoute);
app.use('/api/v1/subCategories', subCategoryRoute);
app.use('/api/v1/brands', BrandRoute);
app.use('/api/v1/users', UserRoute);
app.use('/api/v1/auth', AuthRoute);

app.all('*', (req, _res, next) => {
  next(new ApiError(`Can't find this route : ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT | 8000;
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
