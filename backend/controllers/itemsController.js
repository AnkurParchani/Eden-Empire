import multer from "multer";

import Item from "../models/itemsModel.js";
import Color from "./../models/colorModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import { badRequestError } from "./../utils/apiErrors.js";

// Configuring the multerstorage
const multerStorage = multer.diskStorage({
  // File destination
  destination: (req, file, cb) => {
    cb(null, "public/items-images");
  },

  // Each file (pic) of item
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const imgName = `item-${req.user._id}-${
      file.originalname
    }-${Date.now()}.${ext}`;

    cb(null, imgName);
  },
});

// Checking if the provided file is an img or not
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "uploaded file is not an image"), false);
  }
};

// Assigning storage and filter to multer
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// Creating multer according to different fields
export const uploadItemImages = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "itemColorImages", maxCount: 10 },
  { name: "mainItemExtraImages", maxCount: 5 },
]);

// HTTP Methods
export const getAllItems = async (req, res, next) => {
  try {
    // API FEATURES
    const features = new ApiFeatures(
      Item.find().select(
        "name details mainImageFilename priceBeforeDiscount extraImagesFilename discount gender category inStock priceAfterDiscount",
      ),
      req.query,
    )
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const items = await features.query;

    res.status(200).json({
      status: "success",
      result: items.length,
      items,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) return next(new AppError(404, "No Item found with this ID"));

    res.status(200).json({
      status: "success",
      item,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

export const postItem = async (req, res, next) => {
  try {
    // Convertinig details and description objects back to object from string
    let details, description;
    if (req.body.details) {
      details = JSON.parse(req.body.details);
    }

    if (req.body.description) {
      description = JSON.parse(req.body.description);
    }

    // If there is front image of an item
    if (req.files.mainImage) {
      req.body.mainImageFilename = req.files.mainImage[0].filename;
    }

    // If there are item images
    if (req.files.mainItemExtraImages) {
      req.body.extraImagesFilename = req.files.mainItemExtraImages.map(
        (img) => img.filename,
      );
    }

    // Crearing the item
    const item = await Item.create({
      ...req.body,
      details,
      description,
    });

    res.status(200).json({
      status: "success",
      item,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

export const updateOne = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.itemId, req.body, {
      new: true,
    });

    if (!item) return next(new AppError(404, "No item found with this ID"));

    res.status(200).json({
      status: "success",
      item,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.itemId });

    if (!item) return next(new AppError(404, "No Item found with this ID"));

    res.status(200).json({
      status: "success",
      item,
    });
  } catch (err) {
    return badRequestError(res, err, next);
  }
};

// For colors model
export const createNewColorItem = async (req, res, next) => {
  try {
    const { color, item } = req.body;
    if (!color || !item)
      return next(new AppError(400, "Please provide all the details"));

    if (!req.files.itemColorImages)
      return next(new AppError(400, "Please provide item images"));

    req.body.images = req.files.itemColorImages.map((img) => img.filename);

    const colorItem = await Color.create(req.body);

    res.status(200).json({
      status: "success",
      colorItem,
    });
  } catch (err) {
    return badRequestError(res, err);
  }
};
