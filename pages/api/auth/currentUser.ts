import nc from "next-connect";
import { all } from "middlewares/index";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(all);

interface ExtendedRequest {
  req: NextApiRequest;
  user: ResponseUser;
}

handler.get(async (req: ExtendedRequest, res: NextApiResponse) => {
  if (!req.user) return res.json({ user: null });

  res.json({ user: req.user });
});

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default handler;
