import { Response, Request, NextFunction } from "express";
import TokenService from "../services/TokenService.js";
import ApiError from "../utils/ApiError.js";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string,
        email: string,
        roles: string[];
      };
    }
  }
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const authToken = req.headers.authorization;

  if (!authToken) {
    throw ApiError.UnauthorizedError("Unauthorized");
  }
  const token = authToken.split(' ')[1]; 

  const decodedPayload = TokenService.validateAccessToken(token);

  if (!decodedPayload) {
    throw ApiError.UnauthorizedError("Invalid Bearer token");
  }

  req.user = decodedPayload;

  next();
}


function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    authMiddleware(req, res, () => {
      const user = req.user;
      if (user.roles.includes("64fd872c0d7b594f26bd9592")) {
        next();
      } else {
        next(ApiError.ForbiddenError("Access denied. User is not an admin."));
      }
    });
  } catch (error) {
    next(ApiError.UnauthorizedError("Invalid Bearer token"));
  }
}

export { authMiddleware, isAdmin  };