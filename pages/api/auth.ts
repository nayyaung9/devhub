import prisma from "config/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const auth = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ status: "Works" });
};

export default auth;
