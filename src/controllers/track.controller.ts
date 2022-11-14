import { NextFunction, Request, Response } from "express";
import { CreateTrackInput } from "../schema/track.schema";
import { createTrack, findAllTracks } from "../services/track.service";

export const createTrackHandler = async (
    req: Request<{}, {}, CreateTrackInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const track = await createTrack({
        name: req.body.name,
        album: req.body.album,
        artist: req.body.artist,
        // TODO: include other fields
      });
  
      res.status(201).json({
        status: 'success',
        data: {
            track,
        },
      });
    } catch (err: any) {
      if (err.code === 11000) {
        return res.status(409).json({
          status: 'fail',
          message: 'Track already exists',
        });
      }
      next(err);
    }
  };

export const getAllTracksHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tracks = await findAllTracks();
        res.status(200).json({
            status: 'success',
            result: tracks.length,
            data: {
                tracks,
            },
        });
    } catch (err: any) {
        next(err);
    }
}