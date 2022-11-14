import { NextFunction, Request, Response } from "express";
import { model } from "mongoose";
import trackModel, { Track } from "../models/track.model";
import { CreatePlaylistInput } from "../schema/playlist.schema";
import { createPlaylist } from "../services/playlist.service";

export const playlistHandler = async (
    req: Request<{}, {}, CreatePlaylistInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playList = await createPlaylist({
        name: req.body.name,
        creator: req.body.creator,
        playtime: req.body.playtime,
        trackList: new Track('Track', trackModel),
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          playList,
        },
      });
    } catch (err: any) {
      if (err.code === 11000) {
        return res.status(409).json({
          status: 'fail',
          message: 'Playlist already exists',
        });
      }
      next(err);
    }
  };