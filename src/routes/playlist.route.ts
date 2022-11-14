import express from "express";
import { getPlaylistHandler, playlistHandler } from "../controllers/playlist.controller";
import { restrictTo } from "../middleware/restrictTo";
import { validate } from "../middleware/validate";
import { createPlaylistSchema } from "../schema/playlist.schema";
import { deletePlaylistById } from "../services/playlist.service";

const router = express.Router();

router.post('/playlists', validate(createPlaylistSchema), playlistHandler);

router.get('/:playlistID', restrictTo('admin'), getPlaylistHandler);
router.delete('/:playlistId', restrictTo('admin'), deletePlaylistById)

export default router;