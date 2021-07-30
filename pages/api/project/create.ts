import nc from "next-connect";
import { createProject } from "db/index";
import { all } from "middlewares/index";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(all);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const project = await createProject(req.body);

  return res.status(201).json({ project });
});

export default handler;
