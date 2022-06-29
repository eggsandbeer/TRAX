import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "hello");

        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("shit is fucked up dawg");
        }
      } catch (e) {
        console.error(e);

        res.status(401);
        res.json({ error: "eat shit" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "eat shit" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "hello");
  return user;
};
