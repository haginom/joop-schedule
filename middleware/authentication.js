const { StatusCodes } = require("http-status-codes");
const UnauthenticatedError = require("../errors/unauthenticated");
const { verifyJWT } = require("../utils/tokensUtils");

const authenticationMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const user = verifyJWT(token);

    req.user = { ...user };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "not authorized to access this page" });
    } else {
      next();
    }
  };
};

module.exports = { authenticationMiddleware, authorizePermissions };
