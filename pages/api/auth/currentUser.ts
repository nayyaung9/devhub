import nc from "next-connect";

const handler = nc();

handler.get(async (req: any, res: any) => {
  // Filter out password
  if (!req.user) return res.json({ user: null });
  const { password, ...u } = req.user;
  res.json({ user: u });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
