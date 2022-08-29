import { ProductRoute } from './productRoute.js';
import { CategoryRoute } from './categoryRoute.js';
import { subCategoryRoute } from './subCategoryRoute.js';
import { BrandRoute } from './brandRoute.js';
import { AuthRoute } from './authRoute.js';
import { UserRoute } from './userRoute.js';
import { AdderessRoute } from './addressRoute.js';
import { ReviewRoute } from './reviewRoute.js';
import { WishListRoute } from './wishlistRoute.js';
import { CouponRoute } from './couponRoute.js';
import { CartRoute } from './cartRoute.js';
import { OrderRoute } from './orderRoute.js';

const mountRoutes = (app) => {
  app.use('/api/v1/products', ProductRoute);
  app.use('/api/v1/categories', CategoryRoute);
  app.use('/api/v1/subCategories', subCategoryRoute);
  app.use('/api/v1/brands', BrandRoute);
  app.use('/api/v1/users', UserRoute);
  app.use('/api/v1/auth', AuthRoute);
  app.use('/api/v1/reviews', ReviewRoute);
  app.use('/api/v1/wishlist', WishListRoute);
  app.use('/api/v1/addresses', AdderessRoute);
  app.use('/api/v1/coupons', CouponRoute);
  app.use('/api/v1/cart', CartRoute);
  app.use('/api/v1/order', OrderRoute);
};

export { mountRoutes };
