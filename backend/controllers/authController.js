import jwt from "jsonwebtoken";

import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import { badRequestError } from "../utils/apiErrors.js";

export const checkAdminKey = async (req, res, next) => {
  const providedAdminKey = req.body.adminKey;

  // If there's no admin key
  if (!providedAdminKey) {
    req.role = "user";
    return next();
  }

  // If there's admin key but is wrong one.
  if (providedAdminKey && providedAdminKey !== process.env.VITE_ADMIN_KEY)
    return next(new AppError(401, "Invalid admin key"));

  // If there is admin key and is correct
  req.role = "admin";
  next();
};

export const signup = async (req, res, next) => {
  try {
    // Gathering all user's data
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.role,
    };

    const user = await User.create(userData);

    // Creating the token for the user
    const token = jwt.sign(
      { userId: user._id },
      process.env.VITE_JWT_SECRET_KEY,
      {
        expiresIn: process.env.VITE_JWT_EXPIRES_IN,
      },
    );

    res.status(200).json({
      status: "success",
      token,
      user: user._id,
      role: user.role,
    });
  } catch (err) {
    // Handling for duplicate email
    if (err.code === 11000) {
      return next(new AppError(400, "Email already exists"));
    } else {
      return badRequestError(res, err);
    }
  }
};

export const login = async (req, res, next) => {
  // If there's no email or password provided
  if (!req.body.email || !req.body.password)
    return next(new AppError(400, "Please provide both email and password"));

  // Finding the user with the provided credentials
  const user = await User.findOne({
    email: req.body.email,
  }).select("+password");

  // Checking password
  const correct =
    user && (await user.checkCredentials(req.body.password, user.password));

  //   If user is not found OR password does not match
  if (!correct) return next(new AppError(401, "Incorrect email or password"));

  //   If the user is found then making token for the logged in user
  const token = jwt.sign(
    { userId: user._id },
    process.env.VITE_JWT_SECRET_KEY,
    {
      expiresIn: process.env.VITE_JWT_EXPIRES_IN,
    },
  );

  res
    .status(200)
    .json({
      status: "success",
      token,
      user: user._id,
      role: user.role,
      isLoggedIn: true,
    });
};

export const protect = async (req, res, next) => {
  // Getting the token
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // if (!token) return next(new AppError(401, "User unauthorized"));
    if (!token)
      return res.status(200).json({
        status: "success",
        isLoggedIn: false,
        message: "Login to unlock this functionality",
      });

    //   Decoding the jwt token
    const decode = jwt.verify(token, process.env.VITE_JWT_SECRET_KEY);

    //   Getting the user from the decoded Id
    req.user = await User.findOne({ _id: decode.userId });

    if (!req.user)
      return next(
        new AppError(500, "We don't have your account on our database."),
      );

    req.role = req.user.role;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError(401, "Token expired, login again"));
    } else {
      return badRequestError(res, err);
    }
  }
};

// Checking if the request for any mutation is made by the same user only or not
export const checkSameUser = async (req, res, next) => {
  if (req.role !== "admin") {
    if (!req.user._id.equals(req.params.userId)) {
      return next(new AppError(400, "Invalid request"));
    }
  }

  next();
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, password, passwordConfirm } = req.body;
    if (!currentPassword || !password || !passwordConfirm)
      return next(new AppError(400, "Please provide all the credentials"));

    // Getting the user according to the tokem
    const user = await User.findById(req.user._id).select("+password");

    // If provided old password and database's password don't match
    if (!(await user.checkCredentials(currentPassword, user.password)))
      return next(new AppError(401, "Incorrect Current password"));

    // If new and confirm does not match
    if (password !== passwordConfirm)
      return next(
        new AppError(400, "New password and confirm password do not match"),
      );

    // If new password and old password are same
    if (password === currentPassword)
      return next(
        new AppError(400, "New password cannot be equal to old password"),
      );

    // Saving the new password
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    await user.save();

    res.status(200).json({
      status: "success",
      data: { message: "Your password has successfully been changed" },
    });
  } catch (err) {
    console.log(err);
  }
};

export const checkIsAdmin = async (req, res, next) => {
  if (req.role !== "admin")
    return next(
      new AppError(401, "You're unauthorized to perform this action"),
    );

  next();
};

export const changeRoleRequest = async (req, res, next) => {
  try {
    // If role or admin key is not provided
    if (!req.body.role || !req.body.adminKey)
      return next(new AppError(400, "Please provide both role and admin key"));

    // If both are provided but admin key is wrong
    if (req.body.adminKey !== process.env.VITE_ADMIN_KEY)
      return next(new AppError(401, "Invalid Admin key"));

    // If both provided and admin key is right
    await User.findByIdAndUpdate(req.user._id, { role: req.body.role });

    // The response
    res
      .status(200)
      .json({ status: "success", message: "Role changed successfully" });
  } catch (err) {
    console.log(err);
    badRequestError(res, err);
  }
};
