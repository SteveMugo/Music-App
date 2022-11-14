import express from "express";
import { createTrackHandler, getTrackHandler } from "../controllers/track.controller";
import { restrictTo } from "../middleware/restrictTo";
import { validate } from "../middleware/validate";
import { createTrackSchema } from "../schema/track.schema";
import { deletePlaylistById } from "../services/playlist.service";

const router = express.Router();

router.post('/tracks', validate(createTrackSchema), createTrackHandler);
router.get('/:trackId', restrictTo('admin'), getTrackHandler);
router.delete('/:trackId', restrictTo('admin'), deletePlaylistById)

export default router;