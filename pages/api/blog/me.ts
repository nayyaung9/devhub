import nc from "next-connect";
import { fetchAuthUserBlogs } from "db/index";
import { all } from "middlewares/index";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(all);

interface ExtendedRequest {
  req: NextApiRequest;
  user?: any;
}

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const blogs = await fetchAuthUserBlogs(req.user?._id);

    return res.status(201).json({ blogs });
  } catch (error) {
    throw error;
  }
});

export default handler;
