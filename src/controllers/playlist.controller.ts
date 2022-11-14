import { buildSchema } from "@typegoose/typegoose";
import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";
import { CreatePlaylistInput } from "../schema/playlist.schema";
import { createPlaylist, findAllPlaylists, updatePlayList } from "../services/playlist.service";

export const playlistHandler = async (
    req: Request<{}, {}, CreatePlaylistInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playlist = await createPlaylist({
        name: req.body.name,
        creator: req.body.creator,
        playtime: req.body.playtime,
        // trackList:  {type: buildSchema("Track").childSchemas, ref: "Track"},
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          playlist,
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

  export const getAllPlaylistsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playlist = await findAllPlaylists();
      res.status(200).json({
        status: 'success',
        result: playlist.length,
        data: {
          playlist,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }
  
  export const getPlaylistHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playlist = res.locals.playlist;
      res.status(200).json({
        status: 'success',
        data: {
          playlist,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }
  
  export const updatePlaylistHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playlist = res.locals.playlist; // await updatePlayList();
      res.status(200).json({
        status: 'success',
        data: {
          playlist,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }

  export const deletePlaylistHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playlist = res.locals.playlist;
      res.status(200).json({
        status: 'success',
        data: {
          playlist,
        },
      });
    } catch (err: any) {
      next(err);
    }
  }