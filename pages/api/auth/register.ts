import nc from "next-connect";
import bcrypt from "bcryptjs";
import { registerUser, findUserByEmail } from "db/index";
import { all } from "middlewares/index";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(all);

interface ExtendedRequest {
  req: NextApiRequest;
  body: RequestUser;
  logIn: any;
  user: ResponseUser;
  session:  any;
}

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  const { email, fullName, username, password } = req.body;

  if (!password || !fullName || !username || !email) {
    res.status(400).send("Missing field(s)");
    return;
  }
  if (await findUserByEmail(email)) {
    res.status(403).send("The email has already been used.");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await registerUser({
    email,
    password: hashedPassword,
    fullName,
    username,
  });
  req.logIn(user, (err: any) => {
    if (err) res.status(500).json({ user: null });
    res.status(201).json({ user: req.user });
  });
});

export default handler;
