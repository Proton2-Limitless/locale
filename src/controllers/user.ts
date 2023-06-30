import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { BadRequestError } from "@habeebllahmmj/common";
import { Password } from "../services/password";
import { User } from "../models/user";

declare module "express-session" {
  interface SessionData {
    jwt?: string | null;
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );

  if (!passwordsMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  // Generate JWT and store it on the session object
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!
  );

  req.session.jwt = userJwt;
  res.status(201).send(existingUser);
};

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email in use");
  }
  const user = User.build({ email, password });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  req.session.jwt = userJwt;

  res.status(201).json({
    email: user.email,
    id: user.id,
    token: userJwt,
  });
};

export const logoutUser = (req: Request, res: Response) => {
  req.session.jwt = null;
  res.send({});
};
