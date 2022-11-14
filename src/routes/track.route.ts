import express from "express";
import { createTrackHandler } from "../controllers/track.controller";
import { validate } from "../middleware/validate";
import { createTrackSchema } from "../schema/track.schema";

const router = express.Router();

router.post('/tracks', validate(createTrackSchema), createTrackHandler);

export default router;