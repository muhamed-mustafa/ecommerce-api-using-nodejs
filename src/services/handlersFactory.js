import { ApiError } from '../utils/apiError.js';
import asyncHandler from 'express-async-handler';
import { ApiFeatures } from '../utils/apiFeatures.js';

const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ status: 201, data: newDoc, success: true });
  });

const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findById(id);

    if (!document) {
      return next(new ApiError(`No document found for this id : ${id}`, 404));
    }

    res.status(200).json({ status: 200, data: document, success: true });
  });

const getAll = (Model, modelName = '') =>
  asyncHandler(async (req, res) => {
    // 1) Build Query
    const documetsCounts = await Model.countDocuments();

    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .paginate(documetsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // 2) Execute Query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res.status(200).json({
      status: 200,
      results: documents.length,
      paginationResult,
      data: documents,
      success: true,
    });
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`No document found for this id : ${id}`, 404));
    }

    res.status(200).json({ status: 200, data: document, success: true });
  });

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No document found for this id : ${id}`, 404));
    }

    res.status(204).json();
  });

const deleteAll = (Model) =>
  asyncHandler(async (_req, res, next) => {
    const document = await Model.deleteMany();
    if (!document) {
      return next(new ApiError(`No document found for this id : ${id}`, 404));
    }

    res.status(204).json();
  });

export { createOne, getOne, getAll, updateOne, deleteOne, deleteAll };
