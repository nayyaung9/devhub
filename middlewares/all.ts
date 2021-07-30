import nc from "next-connect";
import passport from "./passport";
import database from "./database";
import session from "./session";

import { NextApiRequest, NextApiResponse } from "next";

const all = nc<NextApiRequest, NextApiResponse>();

all
  .use(database)
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default all;
