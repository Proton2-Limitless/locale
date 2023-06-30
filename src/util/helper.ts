import { Response } from "express";
import { NotFoundError } from "@habeebllahmmj/common";
import { State } from "../models/state";
import { Lg } from "../models/lg";

export const response = async (
  cache: any,
  res: Response,
  nameStr: string,
  tag: string
) => {
  let name = tag == "state" ? nameStr.split(" ")[0] : nameStr;
  let state: string;
  let searchname = tag == "region" ? "region" : "name";
  let statelg: any;
  let result: any = await State.find({ [searchname]: name });
  if (tag == "state") {
    state = nameStr.includes("State") ? nameStr : nameStr.concat(" State");
    statelg = await Lg.find({ state });
    if (result.length == 0) {
      throw new NotFoundError("not found");
    }
    const data = [
      {
        name: result[0].name,
        created: result[0].created,
        region: result[0].region,
        history: result[0].history,
        lg: statelg,
      },
    ];
    result = data;
  }
  if (tag == "lg") {
    result = await Lg.find({ name });
  }
  if (result.length == 0) {
    throw new NotFoundError("not found");
  }
  cache.set(nameStr, result, 3600);
  return res.json({ data: result });
};
