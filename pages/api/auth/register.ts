import nc from "next-connect";
import bcrypt from "bcryptjs";
import { registerUser, findUserByEmail } from "db/index";
import { all } from "middlewares/index";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();
handler.use(all);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
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
  });

  res.status(200).json({ user });
});

export default handler;
