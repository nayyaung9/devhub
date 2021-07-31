import nc from "next-connect";
import { fetchAllBlogs } from "db/index";
import { all } from "middlewares/index";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(all);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * Here we added authenticated user id from session
   */
  const blogs = await fetchAllBlogs();

  return res.status(201).json({ blogs });
});

export default handler;
