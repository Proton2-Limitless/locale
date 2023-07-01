import { Request, Response } from "express";
import { BadRequestError } from "@habeebllahmmj/common";
import { InternalCache } from "../util/database-cahe";
const cache = new InternalCache();
import { response } from "../util/helper";

export const searchedPlace = async (req: Request, res: Response) => {
  cache.clear();
  const { tag, name } = req.query;
  if (!name || !tag) {
    throw new BadRequestError(
      "Please provide a description of where you are searching"
    );
  }
  const nameStr = name.toString();
  let tagStr = tag.toString();
  const getdatafromtepdb = await cache.get(nameStr);
  if (getdatafromtepdb) return res.json({ data: getdatafromtepdb });
  return response(cache, res, nameStr, tagStr);
};
