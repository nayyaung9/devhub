import nc from "next-connect";
import { fetchBlogDetail } from "db/index";
import { all } from "middlewares/index";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(all);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const blog = await fetchBlogDetail(id as string);

  return res.status(201).json({ blog });
});

export default handler;
