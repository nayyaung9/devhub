import nc from "next-connect";
import { createBlog } from "db/index";
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
  try {
    /**
     * Here we added authenticated user id from session
     */
    const blog = await createBlog({ ...req.body, user: req.user._id });

    return res.status(201).json({ blog });
  } catch (error) {
    throw error;
  }
});

export default handler;
