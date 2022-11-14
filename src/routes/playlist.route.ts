import express from "express";
import { playlistHandler } from "../controllers/playlist.controller";
import { validate } from "../middleware/validate";
import { createPlaylistSchema } from "../schema/playlist.schema";

const router = express.Router();

router.post('/playlists', validate(createPlaylistSchema), playlistHandler);

export default router;