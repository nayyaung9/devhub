import nc from "next-connect";
import { all } from "middlewares/index";
import passport from "middlewares/passport";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();

handler.use(all);

interface ExtendedRequest {
  req: NextApiRequest;
  user: ResponseUser;
  logOut: () => void;
}

handler.post(
  passport.authenticate("local"),
  (req: ExtendedRequest, res: NextApiResponse) => {
    return res.json({ user: req.user });
  }
);

handler.delete((req: ExtendedRequest, res: NextApiResponse) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
