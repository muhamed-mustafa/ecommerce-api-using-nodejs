// Nested Route
// GET /api/v1/categories/:categoryId/subCategories

const createFilterObj = (req, _res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  req.filterObj = filterObject;
  next();
};

export { createFilterObj };
