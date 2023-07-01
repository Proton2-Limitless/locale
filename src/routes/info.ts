import { requireAuth } from "@habeebllahmmj/common";
import express from "express";
import { searchedPlace } from "../controllers/info";

const router = express.Router();

router.get("/query", requireAuth, searchedPlace);

export { router as searchRouter };
