import { omit } from "lodash";
import { FilterQuery, QueryOptions } from "mongoose";
import trackModel, { Track } from "../models/track.model";

export const createTrack = async (input: Partial<Track>) => {
    const track = await trackModel.create(input);
    return omit(track.toJSON());
};

export const findAllTracks = async () => {
    return await trackModel.find();
}

export const findTrack = async (
    query: FilterQuery<Track>,
    options: QueryOptions = {}
) => {
    return await trackModel.findOne(query, {}, options).select('+name');
}

export const findTrackById = async (id:string) => {
    const track = await trackModel.findById(id).lean();
    return omit(track);
}

export const deleteTrackById = async (id:string) => {
    const track = await trackModel.remove(id).lean();
    return omit(track);
}