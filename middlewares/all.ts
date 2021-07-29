import nc from "next-connect";
// import passport from "./passport";
import database from "./database";
import { NextApiRequest, NextApiResponse } from "next";

const all = nc<NextApiRequest, NextApiResponse>();

// all.use(database).use(passport.initialize());

all.use(database);

export default all;
