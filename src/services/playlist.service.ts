import { omit } from "lodash";
import { FilterQuery, QueryOptions } from "mongoose";
import playlistModel, { Playlist } from "../models/playlist.model";

export const createPlaylist = async (input: Partial<Playlist>) => {
    const playlist = await playlistModel.create(input);
    return omit(playlist.toJSON());
};

export const findPlaylist = async (
    query: FilterQuery<Playlist>,
    options: QueryOptions = {}
) => {
    return await playlistModel.findOne(query, {}, options).select('+name');
};

export const findAllPlaylists = async () => {
    return await playlistModel.find();
};

export const deletePlaylistById = async (id:string) => {
    const playlist = await playlistModel.remove(id).lean();
    return omit(playlist);
}