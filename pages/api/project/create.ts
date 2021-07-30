import nc from "next-connect";
import { createProject } from "db/index";
import { all } from "middlewares/index";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(all);

interface ExtendedRequest {
  req: NextApiRequest;
  body: RequestUser;
  user: ResponseUser;
}

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  /**
   * Here we added authenticated user id from session
   */
  const project = await createProject({ ...req.body, user: req.user._id });

  return res.status(201).json({ project });
});

export default handler;
