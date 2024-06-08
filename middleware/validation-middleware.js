const { body, param, validationResult } = require("express-validator");
const { BadRequestError, NotFoundError } = require("../errors");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no availability")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(
          errors
            .array()
            .map((error) => error.msg)
            .join(", ")
        );
      }
      next();
    },
  ];
};

const validateIdParam = withValidationErrors([
  param("id").custom(async (value, req) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) {
      throw new BadRequestError("Invalid id");
    }
    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError("Job not found");
    }
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin || !isOwner) {
      throw new UnauthorizedError("Not authorized to access this route");
    }
  }),
]);

const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("email already exists");
      }
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
]);

const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
]);

const validateUserUpdateInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      //making sure user exists and the user is not the current user
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
]);

module.exports = {
  validateIdParam,
  validateRegisterInput,
  validateLoginInput,
  validateUserUpdateInput,
};
