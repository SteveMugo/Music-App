import { omit } from "lodash";
import playlistModel, { Playlist } from "../models/playlist.model";

export const createPlaylist = async (input: Partial<Playlist>) => {
    const playlist = await playlistModel.create(input);
    return omit(playlist.toJSON());
};